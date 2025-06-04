import express from "express";
import TarifaService from "../services/tarifaService.js";

const router = express.Router();

// Obtener todas las tarifas (paginado)
router.get("/", async (req, res) => {
  console.log("index");
  try {
    const pagina = parseInt(req.query.pagina, 10) || 1;
    const limite = parseInt(req.query.limite, 10) || 10;
    console.log(TarifaService);
    const tarifas = await TarifaService.listar({ pagina, limite });
    return res.status(200).json(tarifas);
  }
  catch (error) {
    console.error("Error recuperando tarifas:", error);
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

// Obtener tarifas por fecha específica
router.get("/fecha", async (req, res) => {
  console.log("fecha");
  try {
    const desc = req.query.descripcion || "";
    const dia = parseInt(req.query.dia, 10);
    const mes = parseInt(req.query.mes, 10);
    const anio = parseInt(req.query.anio, 10);
    const tipoTarifa = parseInt(req.query.tipoTarifa || "-1", 10);
    const tarifas = await TarifaService.buscarPorFecha(desc, dia, mes, anio, tipoTarifa);
    return res.status(200).json(tarifas);
  }
  catch (error) {
    console.error("Error recuperando tarifas por fecha:", error);
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

// Obtener tarifa por clave primaria
router.get("/:id", async (req, res) => {
  console.log("id");
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Parámetro incorrecto..." });
    }
    const tarifa = await TarifaService.obtenerPorId(id);
    return res.status(200).json(tarifa);
  }
  catch (error) {
    console.error("Error recuperando tarifa:", error);
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

// Obtener tarifas por día de la semana
router.get("/semana/:diaSemana", async (req, res) => {
  console.log("semana");
  try {
    const desc = req.query.descripcion || "";
    const diaSemana = parseInt(req.params.diaSemana, 10);
    const tipoTarifa = parseInt(req.query.tipoTarifa || "-1", 10);
    const tarifas = await TarifaService.buscarPorSemana(desc, diaSemana, tipoTarifa);
    return res.status(200).json(tarifas);
  }
  catch (error) {
    console.error("Error recuperando tarifas por semana:", error);
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const tarifa = req.body;
    const nuevo = await TarifaService.crear({
      descripcion: tarifa.descripcion,
      tipoTarifa: tarifa.tipoTarifa,
      definicion: tarifa.definicion,
      diaSemana: tarifa.diaSemana,
      diaMes: tarifa.diaMes,
      mes: tarifa.mes,
      anio: tarifa.anio,
      montoFijoAlquiler: tarifa.montoFijoAlquiler,
      montoMinutoFraccion: tarifa.montoMinutoFraccion,
      montoKm: tarifa.montoKm,
      montoHora: tarifa.montoHora
    });
    res.status(201).json(nuevo);
  }
  catch (error) {
    console.error("Error creando estación:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Parámetro incorrecto..." });
    }
    const tarifa = req.body;
    const actualizada = await TarifaService.actualizar(id, {
      descripcion: tarifa.descripcion,
      tipoTarifa: tarifa.tipoTarifa,
      definicion: tarifa.definicion,
      diaSemana: tarifa.diaSemana,
      diaMes: tarifa.diaMes,
      mes: tarifa.mes,
      anio: tarifa.anio,
      montoFijoAlquiler: tarifa.montoFijoAlquiler,
      montoMinutoFraccion: tarifa.montoMinutoFraccion,
      montoKm: tarifa.montoKm,
      montoHora: tarifa.montoHora
    });
    res.status(200).json(actualizada);
  }
  catch (error) {
    console.error("Error actualizando tarifa:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Parámetro incorrecto..." });
    }
    await TarifaService.eliminar(id);
    return res.status(204).send();
  }
  catch (error) {
    console.error("Error eliminando tarifa:", error);
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

export default router;
