// este es un script central al que se conectan los modulos de las paginas para hacer cosas

// const host = "http://127.0.0.1:3000";
const host = "http://localhost:3000";

export async function getAlquileres(){
    try{
        const respuesta = await fetch("https://api-bici-alquileres.vercel.app/api/alquileres", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        if(!respuesta.ok){
            throw Error(`No se recibió respuesta satisfactoria (${respuesta.status})`);
        }
        const alq = await respuesta.json();
        return alq;
    }
    catch (error) {
        console.log("Error al buscar los alquileres:", error)
    }
}

export async function getEstaciones(sortBy = "nombre") {
    try {
        const url = host + "/api/estaciones";
        const respuesta = await fetch(url);
        if(!respuesta.ok){
            throw Error(`No se recibió respuesta satisfactoria (${respuesta.status})`);
        }
        const est = await respuesta.json();
        return est;
    }
    catch (error) {
        console.log("Error al buscar las estaciones:", error)
    }
}