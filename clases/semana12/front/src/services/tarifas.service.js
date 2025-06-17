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

async function editarTarifa(data) {
    const res = await axios.put("http://localhost:3000/api/tarifas/" + data.idTarifa, data);
    return res.status === 200;
}

async function crearTarifa(data) {
    console.log(data);
    const res = await axios.post("http://localhost:3000/api/tarifas", data);
    return res.status === 201;
}

export const tarifasService = { obtenerTarifas, buscarPorSemana, buscarPorFecha, editarTarifa, crearTarifa };