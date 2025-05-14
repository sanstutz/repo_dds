/* eslint-disable consistent-return */
// routers/clientes.routes.js

import express from "express";
import ClienteRepository from "../repositories/clienteRepository.js";

const router = express.Router();

// Obtener lista de clientes (paginado)
router.get("/", async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina, 10) || 1;
    const limite = parseInt(req.query.limite, 10) || 10;
    const clientes = await ClienteRepository.obtenerTodos({ pagina, limite });
    res.status(200).json(clientes);
  }
  catch (error) {
    console.error("Error recuperando clientes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener un cliente por ID
router.get("/:id", async (req, res) => {
  try {
    const clienteId = parseInt(req.params.id, 10);
    if (Number.isNaN(clienteId)) {
      return res.status(400).json({ error: "Parámetro incorrecto..." });
    }
    const cliente = await ClienteRepository.obtenerPorId(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json(cliente);
  }
  catch (error) {
    console.error("Error recuperando cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener un cliente por mail
router.get("/mail/:mail", async (req, res) => {
  try {
    const cliente = await ClienteRepository.obtenerPorMail(req.params.mail);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json(cliente);
  }
  catch (error) {
    console.error("Error recuperando cliente por mail:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear un nuevo cliente
router.post("/", async (req, res) => {
  try {
    const datos = req.body;
    const nuevoCliente = await ClienteRepository.crear(datos);
    res.status(201).json(nuevoCliente);
  }
  catch (error) {
    console.error("Error creando cliente:", error);
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un cliente existente
router.patch("/:id", async (req, res) => {
  try {
    const clienteId = parseInt(req.params.id, 10);
    if (Number.isNaN(clienteId)) {
      return res.status(400).json({ error: "Parámetro incorrecto..." });
    }
    const datos = req.body;
    const clienteActualizado = await ClienteRepository.actualizar(clienteId, datos);
    res.status(200).json(clienteActualizado);
  }
  catch (error) {
    console.error("Error actualizando cliente:", error);
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un cliente
router.delete("/:id", async (req, res) => {
  try {
    const clienteId = parseInt(req.params.id, 10);
    if (Number.isNaN(clienteId)) {
      return res.status(400).json({ error: "Parámetro incorrecto..." });
    }
    await ClienteRepository.eliminar(clienteId);
    res.status(204).send();
  }
  catch (error) {
    console.error("Error eliminando cliente:", error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
