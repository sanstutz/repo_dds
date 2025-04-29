import express from "express";
import { Op } from "sequelize";
import Estacion from "../models/estacion.js";
import Barrio from "../models/barrio.js";

const router = express.Router();

// Obtener estaciones con filtros
router.get("/", async (req, res) => {
  const texto = req.query.texto || "";
  const barrioParam = req.query.barrio || "-1";
  const incluyeInactivos = req.query.incluyeInactivos === "true";

  const where = {};

  if (texto.trim() !== "") {
    where[Op.or] = [
      { nombre: { [Op.like]: `%${texto}%` } },
      { direccion: { [Op.like]: `%${texto}%` } }
    ];
  }

  const barrioId = parseInt(barrioParam, 10);
  if (!Number.isNaN(barrioId) && barrioId !== -1) {
    where.idBarrio = barrioId;
  }

  if (!incluyeInactivos) {
    where.activa = 1;
  }

  try {
    const estaciones = await Estacion.findAll({
      where,
      include: { model: Barrio, as: "barrio" }
    });

    res.status(200).json(estaciones);
  }
  catch (error) {
    console.error("Error recuperando estaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener una estación por ID
router.get("/:id", async (req, res) => {
  const paramId = req.params.id || "Error";
  const estacionId = parseInt(paramId, 10);

  if (Number.isNaN(estacionId)) {
    res.status(400).json({ error: "Parámetro incorrecto..." });
    return;
  }

  const estacion = await Estacion.findByPk(estacionId, {
    include: { model: Barrio, as: "barrio" }
  });

  if (estacion === null) {
    res.status(204).json({ error: "Estación no encontrada" });
    return;
  }

  res.status(200).json(estacion);
});

export default router;
