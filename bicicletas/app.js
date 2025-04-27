import express from "express";
import sequelize from "./db.js";
import Barrio from "./models/barrio.js";
import Estacion from "./models/estacion.js";

const server = express();
const PORT = 3000;

server.get("/", (req, res) => {
    res.redirect("/index.html");
    console.log("Nueva conexion");
});

server.get("/api/barrios", async (req, res) => {
    const barrios = await Barrio.findAll({
        order: [["nombre", "ASC"]]
    })
    if (barrios.length === 0)
        return res.status(404).json({error: "No se encontraron barrios"});
    const barriosLimpio = barrios.map((barrio) => { // el findAll trae muchos datos extra empaquetados
        return {
            idBarrio: barrio.idBarrio,
            nombre: barrio.nombre
        }
    });
    res.status(200).json(barriosLimpio);
});

server.get("/api/estaciones", async (req, res) => {
    const sortBy = req.query.sortby === "id" ? "idEstacion" : "nombre"; // por defecto ordeno por nombre
    const estaciones = await Estacion.findAll({
        order: [[sortBy, "ASC"]],
        include: Barrio
    });
    if (estaciones.length === 0)
        return res.status(404).json({error: "No se encontraron estaciones"});
    const estacionesLimpio = estaciones.map((estacion) => ({
        idEstacion: estacion.idEstacion,
        nombre: estacion.nombre,
        direccion: estacion.direccion,
        barrio: estacion.Barrio,
        activa: estacion.activa == true
    }));
    res.status(200).json(estacionesLimpio);
})

server.get("/echo", (req, res) => {
    let msg = req.query.msg || "No hay mensaje";
    if (msg !== "No hay mensaje")
        msg += ` ${msg}`;
    res.status(200).send(msg);
});

server.use(express.static("./public")); // todo lo que esta en la carpeta public es accesible por el cliente y no hace falta poner un get individual para cada cosa

server.use((req, res) => {
    res.status(404).json({error: "Recurso no encontrado"});
});

(async function start(){
    sequelize.authenticate()
        .then(() => {
            console.log("Conexión establecida con la base de datos");
            sequelize.sync().then(() => console.log("Datos sincronizados")); // copilot dice que esto se saca en el despliegue
        })
        .catch((error) => {
            console.error("Error al conectar con la base de datos:", error);
            process.exit(1); // Salir del proceso si no se puede conectar
        });

    server.listen(PORT, () => {console.log(`Escuchando en el puerto ${PORT}...`)});
}());