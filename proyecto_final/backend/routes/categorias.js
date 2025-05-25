import express from "express";
import Categoria from "../models/categoriasModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const categoria = await Categoria.findByPk(id);
        if (categoria)
            res.status(200).json(categoria);
        else
            res.status(404).json({message: "Categoria no encontrada"});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
});

router.post("/", async (req, res) => {
    try {
        const categoria = await Categoria.create({
            nombre: req.body.nombre
        });
        res.status(201).json(categoria);
    }
    catch (error) {
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

export default router;