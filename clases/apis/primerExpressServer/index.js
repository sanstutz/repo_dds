import express from "express";

const app = express();

const usuarios = [{ id: 1, nombre: "Usuario1" }, { id: 2, nombre: "Usuario2" }];

// Handler function para la ruta raíz
app.get("/", (req, res) => {
    res.send("Servidor REST activo...");
});

// Handler function para la ruta /usuarios
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

// Handler function para la ruta /usuario/:id
app.get("/usuario/:id", (req, res) => {
    const userId = req.params.id;
    const usuario = usuarios.find((u) => u.id == userId);
    res.json(usuario);
});

// POST /usuario (parseo manual del body)
app.post("/usuario", (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString(); // Concatenamos el buffer recibido
    });

    req.on("end", () => {
        try {
            const nuevoUsuario = JSON.parse(body);
            usuarios.push(nuevoUsuario);
            res.status(201).json(nuevoUsuario);
        }
        catch (error) {
            res.status(400).json({ error: "Cuerpo de la solicitud no válido", exception: error });
        }
    });
});

// Handler function para rutas no encontradas
app.use((req, res) => {
    res.status(404).send("Ruta no encontrada");
});

(async function start() {
// Escuchar en el puerto 3000
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor REST escuchando en el puerto ${PORT}`);
    });
}());
