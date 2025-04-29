import http from "http";

const usuarios = [{ id: 1, nombre: "Usuario1" }, { id: 2, nombre: "Usuario2" }];
// Handler function para la ruta raíz
function handleRoot(req, res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("Servidor activo...");
//     res.end(`
//     <!DOCTYPE html>
//     <html lang="es">
//     <head>
//       <meta charset="UTF-8">
//       <title>Servidor Activo</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f6f9fc;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 100vh;
//           margin: 0;
//         }
//         .status-container {
//           text-align: center;
//           padding: 2rem;
//           border-radius: 12px;
//           background-color: #fff;
//           box-shadow: 0 0 15px rgba(0,0,0,0.1);
//         }
//         .status-container h1 {
//           margin-bottom: 0.5rem;
//           font-size: 2rem;
//           color: #333;
//         }
//         .status-container p {
//           margin: 0;
//           color: #555;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="status-container">
//         <h1>🚀 Servidor en ejecución</h1>
//         <p>Tu API está lista para recibir solicitudes</p>
//       </div>
//     </body>
//     </html>
//   `);
}

// Handler function para la ruta /usuarios
function handleUsuarios(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuarios));
}

// Handler function para la ruta /usuario/:id
function handleUsuario(req, res) {
    const { method } = req;
    if (method === "GET") {
        const userId = req.url.split("/")[2]; // Obtener el ID de la URL
        const usuario = usuarios.find((u) => u.id == userId); // Buscar el usuario por ID
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(usuario));
    }
    if (method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString(); // Convertir el Buffer a string
        });
        req.on("end", () => {
            const nuevoUsuario = JSON.parse(body);
            usuarios.push(nuevoUsuario); // Agregar el nuevo usuario al array
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(nuevoUsuario));
        });
    }
}

// Handler function para rutas no encontradas
function defaultHandler(req, res) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada\n");
}

// Diccionario de rutas y sus respectivos handlers
const routes = {
    "/": handleRoot,
    "/usuarios": handleUsuarios,
    "/usuario": handleUsuario // Esta ruta maneja '/usuario/:id'
    // la raíz debería ser la misma pero la cambiamos para simplificar la determinación del handler
};

(async function start() {
    // Crear un servidor HTTP
    // const server = http.createServer(handleRoot);

    const server = http.createServer((req, res) => {
        // Obtener la URL de la solicitud
        let { url } = req;

        console.log(url);
        if (url.indexOf("/", 1) > 0) { // hay una barra luego del primer caracter
            url = `/${url.split("/")[1]}`; // me quedo con el segundo directorio que me mandan
        }
        console.log(url);

        // Encontrar el handler correspondiente para la ruta
        const handler = routes[url] ?? defaultHandler; // si no lo encuentra usa el default

        // Ejecutar el handler con la solicitud y la respuesta
        handler(req, res);
    });

    // Escuchar en el puerto 3000
    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
    });
}());
