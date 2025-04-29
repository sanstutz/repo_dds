// este es un script general que va a incorporar el comportamiento de todos los demas
// los eventos se cargan en los html

// const host = "http://127.0.0.1:3000";
const host = "http://localhost:3000";

async function getAlquileres(){
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

async function getEstaciones(sortBy = "nombre") {
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

async function cargarEstaciones(event) {
    if (event){
        event.preventDefault();
        const filtro = filtrarEstaciones();
    }
    else {
        const filtro = "";
    }
    estaciones = await getEstaciones();
    mostrarEstaciones(estaciones);
}

function mostrarEstaciones(estaciones){
    const tabla = document.getElementById("cuerpo-estaciones");
    tabla.innerHTML = "";
    estaciones.forEach(estacion => {
        tabla.innerHTML += `<tr>
                            <td>${estacion.idEstacion}</td>
                            <td>${estacion.nombre}</td>
                            <td>${estacion.direccion}</td>
                            <td>${estacion.barrio.nombre}</td>
                            <td>${estacion.activa ? "Sí" : "No"}</td>
                            </tr>`
    });
}

function filtrarEstaciones(){
    const filtro = new URLSearchParams();
    return filtro;
}