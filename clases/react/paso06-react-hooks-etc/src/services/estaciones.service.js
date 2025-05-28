import axios from "axios";

const crearEstacion = async (estacion) => {
    try {
        const response = await axios.post("http://localhost:3000/api/estaciones", estacion);
    }
    catch (error) {
        console.log(error);
    }
}

export const estacionesService = {
    crearEstacion
}