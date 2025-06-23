import express from "express";
import temporadasService from "../services/temporadas.service.js";
import HttpError from "../errors/HttpError.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const filtros = {
            titulo: req.query.titulo || "",
            plataforma: req.query.plataforma || "",
            genero: req.query.genero || ""
        }
        const temporadas = await temporadasService.buscar(filtros);
        const respuesta = temporadas.map(temporada => ({
            id: temporada.id,
            numero: temporada.numero,
            episodios: temporada.episodios,
            estreno: temporada.estreno,
            genero: temporada.genero,
            creador: temporada.creador,
            serie: temporada.serie
        }));
        res.status(200).json(respuesta);
    }
    catch (error) {
        console.log("Error al buscar temporadas: " + error.toString());
        res.status(500).send("Error interno del servidor");
    }
});

router.get("/ultimas", async (req, res) => {
    try {
        const temporadas = await temporadasService.buscarUltimas();
        const respuesta = temporadas.map(temporada => ({
            id: temporada.id,
            numero: temporada.numero,
            episodios: temporada.episodios,
            estreno: temporada.estreno,
            genero: temporada.genero,
            creador: temporada.creador,
            serie: temporada.serie
        }));
        res.status(200).json(respuesta);
    }
    catch (error) {
        console.log("Error al buscar temporadas: " + error.toString());
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/", async (req, res) => {
    try {
        const datos = {
            idSerie: Number(req.body.idSerie) || -1, // 0 no es id valido
            numero: Number(req.body.numero) || -1, // 0 no es numero valido
            episodios: Number(req.body.episodios) || -1, // 0 lo tenia que rechazar de todas formas
            estreno: Number(req.body.estreno) || -1, // 0 claramente no es valido
            genero: req.body.genero || "",
            creador: req.body.creador || ""
        };
        await temporadasService.crear(datos);
        res.sendStatus(201);
    }
    catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).send("Error: " + error.message);
        }
        else {
            console.log("Error al crear una temporada: " + error.toString());
            res.status(500).send("Error interno del servidor");
        }
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datos = {
            idSerie: Number(req.body.idSerie) || -1, // 0 no es id valido
            numero: Number(req.body.numero) || -1, // 0 no es numero valido
            episodios: Number(req.body.episodios) || -1, // 0 lo tenia que rechazar de todas formas
            estreno: Number(req.body.estreno) || -1, // 0 claramente no es valido
            genero: req.body.genero || "",
            creador: req.body.creador || ""
        };
        await temporadasService.editar(id, datos);
        res.sendStatus(200);
    }
    catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).send("Error: " + error.message);
        }
        else {
            console.log("Error al editar una temporada: " + error.toString());
            res.status(500).send("Error interno del servidor");
        }
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await temporadasService.borrar(id);
        res.sendStatus(200);
    }
    catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).send("Error: " + error.message);
        }
        else {
            console.log("Error al borrar una temporada: " + error.toString());
            res.status(500).send("Error interno del servidor");
        }
    }
});

export default router;