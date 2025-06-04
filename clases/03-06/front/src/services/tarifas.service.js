import axios from "axios";

async function obtenerTarifas() {
    return (await axios.get("http://localhost:3000/api/tarifas")).data;
}

async function buscarPorSemana(descripcion, dia, tipo) {
    return (await axios.get("http://localhost:3000/api/tarifas/semana/" + dia, {params: {
        descripcion,
        tipoTarifa: tipo
    }})).data;
}

async function buscarPorFecha(descripcion, dia, mes, anio, tipo) {
    return (await axios.get("http://localhost:3000/api/tarifas/fecha", {params: {
        descripcion,
        dia,
        mes,
        anio,
        tipoTarifa: tipo
    }})).data;
}

export const tarifasService = { obtenerTarifas, buscarPorSemana, buscarPorFecha };