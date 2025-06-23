import axios from "./axios.config.js";
import { isAxiosError } from "axios";

async function buscarUltimasCargadas() {
    const temporadas = await axios.get("/temporadas/ultimas");
    return temporadas.data;
}

async function buscar(filtros) {
    const query = new URLSearchParams();

    if (filtros.titulo && filtros.titulo !== ""){
        query.append("titulo", filtros.titulo);
    }
    if (filtros.plataforma && filtros.plataforma !== ""){
        query.append("plataforma", filtros.plataforma);
    }
    if (filtros.genero && filtros.genero !== ""){
        query.append("genero", filtros.genero);
    }
    const temporadas = await axios.get("/temporadas?" + query.toString());
    return temporadas.data;
}

async function actualizar(id, data) {
    try {
        await axios.put("/temporadas/" + id, data);
        return "";
    }
    catch (error) {
        if (isAxiosError(error)){
            if (error.response){
                return error.response.data;
            }
            return "Error desconocido al hacer la petición";
        }
    }
}

async function crear(data) {
    try {
        await axios.post("/temporadas", data);
        return "";
    }
    catch (error) {
        if (isAxiosError(error)){
            if (error.response){
                return error.response.data;
            }
            return "Error desconocido al hacer la petición";
        }
    }
}

async function eliminar(id) {
    await axios.delete("/temporadas/" + id);
}

export default { buscarUltimasCargadas, buscar, actualizar, crear, eliminar };