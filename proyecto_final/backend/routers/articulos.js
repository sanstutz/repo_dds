import express from "express";
import Articulo from "../models/articulosModel.js";
import { Op, where } from "sequelize";

const router = express.Router();

router.get("/", async (req, res) => {
    const nombre = req.query.nombre || "";
    const activo = req.query.activo || "";

    const where = {};

    if (nombre.trim() !== "") {
        where.nombre = { [Op.like]: `%${nombre}%` }
    }
    if (["true", "false"].includes(activo)) {
        where.activo = activo === "true";
    }

    const pagina = Number(req.query.pagina) || 1; // el 0 no es valido, por eso uso || en vez de ??
    const size = 10;
    try {
        const { count: cantidad, rows: articulos } = await Articulo.findAndCountAll({
            where: where,
            limit: size,
            offset: (pagina - 1) * size,
            order: [["nombre", "ASC"]]
        });
        return res.status(200).json({ items: articulos, registrosTotal: cantidad });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al buscar los articulos" });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const articulo = await Articulo.findByPk(id);
        if (articulo)
            res.status(200).json(articulo);
        else
            res.status(404).json({ message: "No se encontro el articulo" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al buscar el articulo" });
    }
});

router.post("/", async (req, res) => {
    try {
        let item = await articulos.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            codigoDeBarra: req.body.codigoDeBarra,
            idCategoria: req.body.idCategoria,
            stock: req.body.stock,
            fechaAlta: req.body.fechaAlta,
            activo: req.body.activo,
        });
        res.status(200).json(item.dataValues); // devuelve el registro agregado
    } catch (error) {
        if (error instanceof ValidationError) {
            // si son errores de validación, los devolvemos
            let messages = '';
            error.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw error;
        }
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.body.id;
        const data = await Articulo.update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            codigoDeBarra: req.body.codigoDeBarra,
            idCategoria: req.body.idCategoria,
            stock: req.body.stock,
            fechaAlta: req.body.fechaAlta,
            activo: req.body.activo,
        }, { where: { id: id } });

        if (data[0] === 1) { // modifico 1 fila
            res.sendStatus(204); // deberia mandarle un mensajito de que esta bien para mantener consistencia?
        }
        else
            res.status(404).json({ message: "No se encontro el articulo" });
    }
    catch (error) {
        if (error instanceof ValidationError) {
            // si son errores de validación, los devolvemos
            let messages = '';
            error.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw error;
        }
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let bajaFisica = false;
        if (bajaFisica) {
            const filasBorradas = await Articulo.destroy({ where: { id: req.params.id } });
            if (filasBorradas == 1)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        }
        else {
            // segun el paso a paso hay que invertirlo, no desactivarlo siempre, capaz esto es importante mas adelante
            const data = await Articulo.update({
                activo: false
            }, { where: { id: req.params.id } });
            if (data[0] == 1)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        }
    }
    catch (error) {
        if (err instanceof ValidationError) {
            // si son errores de validación, los devolvemos
            const messages = err.errors.map((x) => x.message);
            res.status(400).json(messages);
          } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw err;
          }
        }    
    }
);

export default router;