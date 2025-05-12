import sequelize from "./db.js"
import Modelo from "./models/modelo.js"
import { Op } from "sequelize"
import express from "express";
import diccionario from "./data/diccionario.js"

const app = express();
const port = 3000;

app.get("/api/algoconfiltro", async (req, res) => {
    const texto = req.query.texto || "";
    const dic = req.query.dic || "";

    const where = {}
    const limit = 20;

    if (texto.trim() !== "") {
        where.atr1 = {[Op.like]: `%${texto.trim()}%`}
    }
    if (dic in diccionario) {
        where.atr2 = dic; // toLowerCase()
    }

    try {
        const lista = await Modelo.findAll({
            where: where,
            limit: limite,
            //offset: 0,
            order: [["atr", "ASC"]]
        });
        const listaLimpia = lista.map(elem => ({
            atr1: elem.atr1,
            // etc
        }));
        res.status(200).json(listaLimpia);
    }
    catch (error){
        console.error("Error al hacer consulta a bd:\n", error);
        res.status(500).send("Error al hacer consulta a bd");
    }
});

app.use(express.static("public"));

(async function main () {
    try {
        await sequelize.authenticate();
        console.log("base de datos funcionando");
    }
    catch (error){
        console.error("error al iniciar:", error);
        process.exit(1);
    }

    app.listen(port, () => console.log("servidor escuchando..."));
})();