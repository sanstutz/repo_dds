import axios from "axios";

async function obtenerBarrios() {
    return (await axios.get("http://localhost:3000/api/barrios")).data;
}

export const barriosService = {obtenerBarrios}