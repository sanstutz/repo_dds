import express from "express";

const router = express.Router();

// Ruta principal de servidor
router.get("/", (req, res) => {
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

// Health-check
router.get("/health-check", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Echo
router.get("/echo", (req, res) => {
  const mensaje = req.query.mensaje || "No se recibió ningún mensaje";
  console.log(req.query);
  res.status(200).json({ recibido: mensaje !== "No se recibió ningún mensaje" ? `${mensaje} ${mensaje}` : mensaje });
});

export default router;
