import axios from "axios";

async function obtenerTarifas() {
    return (await axios.get("http://localhost:3000/api/tarifas")).data;
}

async function buscarPorSemana(descripcion, dia, tipo) {
    return (await axios.get("http://localhost:3000/api/tarifas/semana/" + dia, {
        params: {
            descripcion,
            tipoTarifa: tipo
        }
    })).data;
}

async function buscarPorFecha(descripcion, dia, mes, anio, tipo) {
    return (await axios.get("http://localhost:3000/api/tarifas/fecha", {
        params: {
            descripcion,
            dia,
            mes,
            anio,
            tipoTarifa: tipo
        }
    })).data;
}

async function editarTarifa(id, descripcion, tipo, definicion, diaSemana, diaMes, mes, anio, montoFijo, montoMinuto,
    montoHora, montoKm) {
    const res = await axios.put("http://localhost:3000/api/tarifas/" + id, {
        params: {
            descripcion: descripcion,
            tipoTarifa: tipo,
            definicion: definicion,
            diaSemana: diaSemana,
            diaMes: diaMes,
            mes: mes,
            anio: anio,
            montoFijoAlquiler: montoFijo,
            montoMinutoFraccion: montoMinuto,
            montoKm: montoKm,
            montoHora: montoHora
        }
    });
    if (res.status === 200)
        console.log("exito!");
}

export const tarifasService = { obtenerTarifas, buscarPorSemana, buscarPorFecha, editarTarifa };