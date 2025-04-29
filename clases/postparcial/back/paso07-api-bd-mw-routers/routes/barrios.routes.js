import express from "express";
import Barrio from "../models/barrio.js";

const router = express.Router();

// Obtener todos los barrios
router.get("/", async (req, res) => {
  const filasBarrios = await Barrio.findAll({ order: [["nombre", "ASC"]] });

  const barriosResult = filasBarrios.map((barrio) => ({
    idBarrio: barrio.idBarrio,
    nombre: barrio.nombre
  }));

  res.status(200).json(barriosResult);
});

// Obtener un barrio por ID
router.get("/:id", async (req, res) => {
  const paramId = req.params.id || "Error";
  const barrioId = parseInt(paramId, 10);

  if (Number.isNaN(barrioId)) {
    res.status(400).json({ error: "Parámetro incorrecto..." });
    return;
  }

  const barrio = await Barrio.findByPk(barrioId);

  if (barrio === null) {
    res.status(204).json({ error: "Barrio no encontrado" });
    return;
  }

  res.status(200).json(barrio);
});

export default router;
