import { getEstaciones } from "./conexiones.js";

(function (){
    document.addEventListener("DOMContentLoaded", async () => {
        cargarEstaciones(await getEstaciones());
        document.getElementById("form-busqueda").addEventListener("submit", filtrar);
    });
})();

function cargarEstaciones(estaciones){
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

function filtrar(event){
    event.preventDefault();
    const estaciones = getEstaciones();
}