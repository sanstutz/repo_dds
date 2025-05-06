import express from "express";
import cors from "cors";
import sequelize from "./db.js";
import logger from "./middlewares/logger.js";

import servidorRouter from "./routes/servidor.routes.js";
import barriosRouter from "./routes/barrios.routes.js";
import estacionesRouter from "./routes/estaciones.routes.js";

const app = express();
const PORT = 3000; // Definido directamente, sin usar process.env

// #region Middlewares
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
// #endregion

// #region Routers
app
  .use("/api", servidorRouter)
  .use("/api/barrios", barriosRouter)
  .use("/api/estaciones", estacionesRouter);
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
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}());
