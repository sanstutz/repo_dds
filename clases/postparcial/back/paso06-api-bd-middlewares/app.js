import express from "express";
import cors from "cors";
import { Op } from "sequelize";
import sequelize from "./db.js";
import logger from "./middlewares/logger.js";
import Barrio from "./models/barrio.js";
import Estacion from "./models/estacion.js";

const app = express();
const PORT = 3000; // Definido directamente, sin usar process.env

// Agregamos el middleware cors para configurar los permisos de acceso desde el frontend
// Esta línea configura cors para permitir cualquier tipo de tráfico desde cualquier origen
// app.use(cors);

// sin embargo, no es ideal abrir completamente la aplicación por lo que deberíamos configurar
//  solo para nuestro frontend
app.use(cors({
  origin: "http://localhost:5500",
  methods: ["GET"],
  credentials: true
}));

// 🚀 Nuestro middleware logger
app.use(logger);

// #region servidor
// Ruta principal con una vista "bonita" de servidor funcionando
// La ruta raíz queda anulado por el servidor estático de express
// Pasamos la raíz del servidor backend /api
app.get("/api", (req, res) => {
  res.send(`
      <html>
        <head>
          <title>Servidor Express</title>
          <style>
            body {
              background-color: #f2f2f2;
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .container {
              background: #fff;
              padding: 2rem;
              border-radius: 12px;
              box-shadow: 0 0 12px rgba(0,0,0,0.1);
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 Servidor Express Activo</h1>
            <p>API corriendo en <strong>http://localhost:${PORT}</strong></p>
          </div>
        </body>
      </html>
  `);
});

// Ruta de health-check
app.get("/api/health-check", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Ruta de echo: repite el mensaje recibido como query param
app.get("/api/echo", (req, res) => {
  let mensaje = req.query.mensaje || "No se recibió ningún mensaje";
  // mostramos el querystring de la url
  console.log(req.query);
  console.log(`Mensaje recibido: ${req.query.nombre}`);
  if (mensaje !== "No se recibió ningún mensaje") mensaje += ` ${mensaje}`;
  res.status(200).json({ recibido: mensaje });
});
// #endregion

// #region api/barrios
app.get("/api/barrios", async (req, res) => {
  const filasBarrios = await Barrio.findAll({
    order: [["nombre", "ASC"]]
  });

  const barriosResult = filasBarrios.map((barrio) => ({
    idBarrio: barrio.idBarrio,
    nombre: barrio.nombre
  }));

  // Pida los barrios a la base de datos
  res.status(200).json(barriosResult);
});

// Obtener un barrio específico por Id
app.get("/api/barrios/:id", async (req, res) => {
  // En primer lugar debemos recuperar el valor del Id, pero ahora no es parte del queryString
  //  sino que es parte de la URI. Vamos a usar `req.params`
  const paramId = req.params.id || "Error";

  // Convertimos el parámetro a Entero
  const barrioId = parseInt(paramId, 10);
  if (Number.isNaN(barrioId)) {
    // Si no logramos obtener el parámetro hay un error en el request
    // Bad Request
    res.status(400).json({ error: "Parámetros incorrecto..." });
    return;
  }
  // Con el parámetro vamos a solicitar a sequelize que materialice el modelo que corresponde
  //  con la fila que tiene Clave Primaria igual al parámetro recibido
  const barrio = await Barrio.findByPk(barrioId);
  // Si no encontramos un perfil respondemos que no existe el perfil con ese id
  if (barrio === null) {
    res.status(204).json({ error: "Perfil no encontrado" }); // No Content
    return;
  }

  // Si llegamos aquí todos felices y devolvemos el perfil encontrado.
  res
    .status(200)
    .json(barrio);
});
// #endregion

// #region api/estaciones
// Endpoint para obtener estaciones filtradas
app.get("/api/estaciones", async (req, res) => {
  // Recuperamos los parámetros del querystring
  const texto = req.query.texto || "";
  const barrioParam = req.query.barrio || "-1";
  const incluyeInactivos = req.query.incluyeInactivos === "true";

  // Armamos el objeto de filtros dinámicos
  const where = {};

  // Filtro de texto si viene
  if (texto.trim() !== "") {
    where[Op.or] = [
      { nombre: { [Op.like]: `%${texto}%` } },
      { direccion: { [Op.like]: `%${texto}%` } }
    ];
  }

  // Filtro de barrio si viene y no es -1
  const barrioId = parseInt(barrioParam, 10);
  if (!Number.isNaN(barrioId) && barrioId !== -1) {
    where.idBarrio = barrioId;
  }

  // Filtro de activos
  if (!incluyeInactivos) {
    where.activa = 1;
  }

  try {
    const estaciones = await Estacion.findAll({
      where,
      include: {
        model: Barrio,
        as: "barrio"
      }
    });

    res.status(200).json(estaciones);
  }
  catch (error) {
    console.error("Error recuperando estaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Agregamos un endpoint para obtener una estación específica en base a su clave primaria.
app.get("/api/estaciones/:id", async (req, res) => {
  // Recuperamos el id de la URI
  const paramId = req.params.id || "Error";

  // Convertimos el parámetro a Entero
  const estacionId = parseInt(paramId, 10);
  if (Number.isNaN(estacionId)) {
    // Parámetro incorrecto
    res.status(400).json({ error: "Parámetro incorrecto..." });
    return;
  }

  // Buscamos la estación incluyendo el barrio asociado
  const estacion = await Estacion.findByPk(estacionId, {
    include: {
      model: Barrio,
      as: "barrio"
    }
  });

  // Si no encontramos la estación
  if (estacion === null) {
    res.status(204).json({ error: "Estación no encontrada" });
    return;
  }

  // Si todo está bien, respondemos con la estación (incluido el barrio)
  res.status(200).json(estacion);
});
// #endregion

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Función start con todo lo relativo al inicio del servidor
(async function start() {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida...");
  }
  catch (error) {
    console.log("Error, Imposible conectar a la bd...\n", error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}());
