import express from "express";

const app = express();
const PORT = 3000; // Definido directamente, sin usar process.env

// Ruta principal con una vista "bonita" de servidor funcionando
app.get("/", (req, res) => {
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
app.get("/health-check", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Ruta de echo: repite el mensaje recibido como query param
app.get("/echo", (req, res) => {
    let mensaje = req.query.mensaje || "No se recibió ningún mensaje";
    if (mensaje !== "No se recibió ningún mensaje") mensaje += ` ${mensaje}`;
    res.status(200).json({ recibido: mensaje });
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
