/* eslint-disable consistent-return */
// routers/tarifas.routes.js

import express from "express";
import TarifaRepository from "../repositories/tarifaRepository.js";

const router = express.Router();

// Obtener todas las tarifas (paginado)
router.get("/", async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina, 10) || 1;
    const limite = parseInt(req.query.limite, 10) || 10;
    const tarifas = await TarifaRepository.obtenerTodos({ pagina, limite });
    res.status(200).json(tarifas);
  }
  catch (error) {
    console.error("Error recuperando tarifas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener tarifa por clave primaria
router.get("/:id", async (req, res) => {
  try {
    console.log("Llega");
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Parámetro incorrecto..." });
    }
    const tarifa = await TarifaRepository.obtenerPorId(id);
    if (!tarifa) {
      return res.status(404).json({ error: "Tarifa no encontrada" });
    }
    res.status(200).json(tarifa);
  }
  catch (error) {
    console.error("Error recuperando tarifa:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener tarifas por día de la semana
router.get("/semana/:diaSemana", async (req, res) => {
  try {
    const diaSemana = parseInt(req.params.diaSemana, 10);
    const tipoTarifa = parseInt(req.query.tipoTarifa || "-1", 10);

    if (Number.isNaN(diaSemana) || diaSemana < 1 || diaSemana > 7) {
      return res.status(400).json({ error: "Día de la semana inválido" });
    }

    const tarifas = await TarifaRepository.buscarPorSemana({ diaSemana, tipoTarifa });
    res.status(200).json(tarifas);
  }
  catch (error) {
    console.error("Error recuperando tarifas por semana:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener tarifas por fecha específica
router.get("/fecha", async (req, res) => {
  try {
    const dia = parseInt(req.query.dia, 10);
    const mes = parseInt(req.query.mes, 10);
    const anio = parseInt(req.query.anio, 10);
    const tipoTarifa = parseInt(req.query.tipoTarifa || "-1", 10);

    if (
      Number.isNaN(dia) || dia < 1 || dia > 31
      || Number.isNaN(mes) || mes < 1 || mes > 12
      || Number.isNaN(anio)
    ) {
      return res.status(400).json({ error: "Fecha inválida" });
    }

    const tarifas = await TarifaRepository.buscarPorFecha({ dia, mes, anio, tipoTarifa });
    res.status(200).json(tarifas);
  }
  catch (error) {
    console.error("Error recuperando tarifas por fecha:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
