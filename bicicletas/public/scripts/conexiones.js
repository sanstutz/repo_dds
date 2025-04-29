export async function getAlquileres(){
    try{
        const respuesta = await fetch("https://api-bici-alquileres.vercel.app/api/alquileres", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        if(!respuesta.ok){
            throw Error(`No se recibió respuesta satisfactoria (${respuesta.statusText})`);
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
        const respuesta = await fetch("http://localhost:3000/api/estaciones?sortby=" + sortBy);
        if(!respuesta.ok){
            throw Error(`No se recibió respuesta satisfactoria (${respuesta.statusText})`);
        }
        const est = await respuesta.json();
        return est;
    }
    catch (error) {
        console.log("Error al buscar las estaciones:", error)
    }
}