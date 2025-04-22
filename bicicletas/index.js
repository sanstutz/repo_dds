import express from "express";
const server = express();

server.get("/", (req, res) => {
    res.redirect("/index.html");
});

server.use(express.static("./public")); // todo lo que esta en la carpeta public es accesible por el cliente y no hace falta poner un get individual para cada cosa

server.use((req, res) => {
    res.send("Recurso no encontrado");
});

(async function start(){
    const PORT = 3000;
    server.listen(PORT, () => {console.log(`Escuchando en el puerto ${PORT}...`)});
}());