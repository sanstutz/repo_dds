import express from 'express';
import sequelize from './db.js';
import StarbucksStore from './models/store.js';
import {Op} from "sequelize";
import countries from './data/countries.js';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Programar endpoints aquí
app.get("/api/locales", async (req, res) => {
    const texto = req.query.texto || "";
    const hemisferio = req.query.hemisferio || "";

    const where = {};

    if (texto.trim() !== ""){
        where[Op.or] = [
            { nombre: { [Op.like]: `%${texto}%` } },
            { direccion: { [Op.like]: `%${texto}%` } }
        ];
    }

    if (hemisferio !== ""){
        if (hemisferio === "NE"){
            where[Op.and] = [
                {latitud: {[Op.gte]: 0}},
                {longitud: {[Op.gte]: 0}}
            ];
        }
        else if (hemisferio === "NO"){
            where[Op.and] = [
                {latitud: {[Op.gte]: 0}},
                {longitud: {[Op.lt]: 0}}
            ];
        }
        else if (hemisferio === "SE"){
            where[Op.and] = [
                {latitud: {[Op.lt]: 0}},
                {longitud: {[Op.gte]: 0}}
            ];
        }
        else if (hemisferio === "SO"){
            where[Op.and] = [
                {latitud: {[Op.lt]: 0}},
                {longitud: {[Op.lt]: 0}}
            ];
        }
    }

    try {
        const locales = await StarbucksStore.findAll({
            where,
            limit: 15,
        order: [["numero", "ASC"]]});
        const localesLimpio = locales.map(local => ({
            nombre: local.nombre,
            direccion: local.direccion,
            ciudad: local.ciudad,
            pais: local.pais,
            longitud: local.longitud,
            latitud: local.latitud
        }));
        res.status(200).json(localesLimpio);
    }
    catch (error){
        console.log(error);
        res.status(500).send(error);
    }
});

app.get("/api/countries", (req, res) => {
    res.status(200).json(countries);
});

(async function start() {
    // Validar conexión a la base de datos.

    try {
        sequelize.authenticate();
        console.log("Base de datos sincronizada");
    }
    catch (error) {
        console.log("Error al sincronizar:", error);
        process.exit(1);
    }

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
})();
