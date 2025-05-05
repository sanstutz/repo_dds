import sequelize from "./db.js";
import express from "express";
import StarbucksStore from "./models/store.js";
import { Op } from "sequelize";
import countries from "./data/countries.js";

const app = express();
const port = 3000;

app.get("/api/locales", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (Number.isNaN(limit))
        limit = 15;
    let offset = parseInt(req.query.offset);
    if (Number.isNaN(offset))
        offset = 0;
    let orderBy = req.query.orderBy || "numero";
    if (!camposLocal().includes(orderBy))
        orderBy = "numero";
    let orderDir = req.query.orderDir || "ASC";
    if (!["ASC", "DESC"].includes(orderDir))
        orderDir = "ASC";
    const texto = req.query.texto || "";
    const hemisferio = req.query.hemisferio || "";
    const pais = req.query.pais || "";

    const where = {}
    if (texto !== ""){
        where[Op.or] = [
            {nombre: {[Op.like]: `%${texto}%`}},
            {direccion: {[Op.like]: `%${texto}%`}},
            {ciudad: {[Op.like]: `%${texto}%`}}
        ]
    };

    if (hemisferio.length >= 2){
        if (hemisferio[0] === "N"){
            where.latitud = {
                [Op.gt]: 0
            }
        }
        else if (hemisferio[0] === "S") {
            where.latitud = {
                [Op.lte]: 0
            }
        }
        if (hemisferio[1] === "E"){
            where.longitud = {
                [Op.gt]: 0
            }
        }
        else if (hemisferio[1] === "O"){
            where.longitud = {
                [Op.lte]: 0
            }
        }
    }

    if (pais in countries){
        where.pais = pais;
    }

    try {
        const locales = await StarbucksStore.findAll(
            {
                where,
                order: [[orderBy, orderDir]],
                limit: limit,
                offset: offset
            });
        const localesLimpio = locales.map(local => ({
            nombre: local.nombre,
            direccion: local.direccion,
            ciudad: local.ciudad,
            provincia: local.provincia,
            pais: countries[local.pais],
            hemisferio: calcHemsiferio(local.longitud, local.latitud)
        }));
        res.status(200).json(localesLimpio);
    }
    catch (error) {
        console.error("error al acceder a la bd:", error);
        res.status(500).json({error: "error al acceder a la bd"});
    }
});

function calcHemsiferio(longitud, latitud){
    if (longitud > 0){
        if (latitud > 0)
            return "NE";
        else
            return "SE";
    }
    else {
        if (latitud > 0)
            return "NO";
        else
            return "SO";
    }
}

function camposLocal(){
    const array = [];
    for (let campo in StarbucksStore.getAttributes()){
        array.push(campo);
    }
    return array;
}

app.get("/api/paises", (req, res) => {
    res.status(200).json(countries);
});

app.get("/api/ordenacion", (req, res) => {
    res.status(200).json(camposLocal());
});

app.use(express.static("public"));

(function main () {
    try {
        sequelize.authenticate();
        console.log("base de datos funcionando");
        app.listen(port, () => console.log("servidor escuchando..."));
    }
    catch (error){
        console.error("error al iniciar:", error);
    }
})();