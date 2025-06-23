import express from "express";
import seriesService from "../services/series.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const series = await seriesService.buscarTodas();
        res.status(200).send(series);
    }
    catch (error) {
        console.log("Error al buscar series: " + error.toString());
        res.status(500).send("Error interno del servidor");
    }
});

export default router;