import express from 'express';
import sequelize from './db.js';
import cors from "cors";

import Cine from './models/cine.js';
import Funcion from './models/funcion.js';
import funcionesRouter from "./routes/funciones.routes.js"

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
          <h1>🚀 Servidor Express Activo</h1>
          <p>API corriendo en <strong>http://localhost:3000</strong></p>
        </div>
      </body>
    </html>
  `);
});

// Agregar endpoints aquí
app.use("/api/funciones", funcionesRouter);


(async function start() {
    // Validar conexión a la base de datos.
    await sequelize.authenticate();

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
})();
