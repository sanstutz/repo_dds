import express from "express";
import funcionesService from "../services/funcionesService.js";
import HttpError from "../errors/HttpError.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const nombre = req.query.nombre || "";
        const sala = req.query.sala || "";
        const fecha = req.query.fecha || "";
    
        const funciones = await funcionesService.buscarActuales({nombre, sala, fecha});

        const respuesta = funciones.map(funcion => ({
            id: funcion.id,
            pelicula: funcion.pelicula,
            fechaDesde: funcion.fechaDesde,
            fechaHasta: funcion.fechaHasta,
            horario: funcion.horario,
            sala: funcion.sala,
            idCine: funcion.idCine,
            cine: funcion.cine.nombre
        }));

        res.status(200).json(respuesta);
    }
    catch(error) {
        console.log("Error al buscar funciones actuales:", error);
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/nueva-funcion", async (req, res) => {
    try {
        const nueva = {
            idCine: Number(req.body.idCine) || -1,
            pelicula: req.body.pelicula || "",
            fechaDesde: req.body.fechaDesde || "",
            fechaHasta: req.body.fechaHasta || "",
            horario: req.body.horario || "",
            sala: req.body.sala || ""
        };

        await funcionesService.crearFuncion(nueva);
        res.sendStatus(201);
    }
    catch(error) {
        if (error instanceof HttpError) {
            res.status(error.status).send("Error en la solicitud: " + error.message)
        }
        else {
            console.log("Error al crear una funcion:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
});

router.put("/editar-funcion/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const nueva = {
            idCine: Number(req.body.idCine) || -1,
            pelicula: req.body.pelicula || "",
            fechaDesde: req.body.fechaDesde || "",
            fechaHasta: req.body.fechaHasta || "",
            horario: req.body.horario || "",
            sala: req.body.sala || ""
        };

        await funcionesService.editarFuncion(id, nueva);
        res.sendStatus(200);
    }
    catch(error) {
        if (error instanceof HttpError) {
            res.status(error.status).send("Error en la solicitud: " + error.message)
        }
        else {
            console.log("Error al editar una funcion:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
});

router.delete("/eliminar-funcion/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await funcionesService.eliminarFuncion(id);
        res.sendStatus(200);
    }
    catch(error) {
        if (error instanceof HttpError) {
            res.status(error.status).send("Error en la solicitud: " + error.message)
        }
        else {
            console.log("Error al eliminar una funcion:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
});

export default router;