import axios from "./axios.config.js";

async function buscarFunciones(filtros = {nombre: "", sala: "", fecha: ""}) {
    const query = new URLSearchParams([["nombre", filtros.nombre], ["sala", filtros.sala], ["fecha", filtros.fecha]]);
    const res = await axios.get("/funciones?" + query.toString());
    return res.data;
}

export default { buscarFunciones };