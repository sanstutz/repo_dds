export async function getAlquileres(){
    // await == espera a que resuelva la promesa y asigna el valor devuelto
    const respuesta = await fetch("https://api-bici-alquileres.vercel.app/api/alquileres", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });

    if(!respuesta.ok){
        throw Error("Error al buscar alquileres");
    }
    const alq = await respuesta.json();
    return alq;
}

export async function getEstaciones(sortBy = "nombre") {
    const respuesta = await fetch("http://localhost:3000/api/estaciones?sortby=" + sortBy);

    if(!respuesta.ok){
        throw Error("Error al buscar estaciones");
    }
    const est = await respuesta.json();
    return est;
}