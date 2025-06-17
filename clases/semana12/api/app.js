import express from "express";
import cors from "cors";
import sequelize from "./db.js";
import logger from "./middlewares/logger.js";

import servidorRouter from "./routes/servidor.routes.js";
import barriosRouter from "./routes/barrios.routes.js";
import estacionesRouter from "./routes/estaciones.routes.js";
import tarifasRouter from "./routes/tarifas.routes.js";
import clientesRouter from "./routes/clientes.routes.js";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middlewares de parseo de Body
app.use(express.json()); // Para parsear JSON en el body
app.use(express.urlencoded({ extended: true })); // Para parsear bodies urlencoded (formularios HTML)

// Nuestro middleware logger
app.use(logger);

// Ruta principal de servidor
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Servidor Express</title>
        <style>
          body { background-color: #f2f2f2; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
          .container { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.1); text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Servidor Express Activo</h1>
          <p>API corriendo en <strong>http://localhost:3000</strong></p>
        </div>
      </body>
    </html>
  `);
});

// #region Routers
app
  .use("/api", servidorRouter)
  .use("/api/barrios", barriosRouter)
  .use("/api/estaciones", estacionesRouter)
  .use("/api/tarifas", tarifasRouter)
  .use("/api/clientes", clientesRouter);
// #endregion

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Función start con el código relativo al inicio del servidor
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
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}());
