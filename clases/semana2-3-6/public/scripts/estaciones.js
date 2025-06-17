import { estacionesService, barriosService } from "./front.js"

(function () {
    document.addEventListener("DOMContentLoaded", async () => {
        document.getElementById("form-busqueda").addEventListener("submit", filtrar);
        cargarBarrios();
        cargarEstaciones();
    });
})();

async function cargarBarrios() {
    const barrios = await barriosService.getBarrios();
    const selectBarrios = document.getElementById("select-barrio");
    selectBarrios.innerHTML = `<option value="0">Todos</option>`;
    barrios.forEach((barrio) => {
        selectBarrios.innerHTML += `<option value="${barrio.idBarrio}">${barrio.nombre}</option>`
    });
}

async function cargarEstaciones() {
    const estaciones = await estacionesService.getEstaciones();
    mostrarEstaciones(estaciones);
}

function mostrarEstaciones(estaciones) {
    const tabla = document.getElementById("cuerpo-estaciones");
    tabla.innerHTML = "";
    if (!estaciones)
        return;
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

async function filtrar(event) {
    event.preventDefault();

    const texto = document.getElementById("input-nombre-dir").value;
    const barrio = Number(document.getElementById("select-barrio").value);
    const inactivas = document.getElementById("checkbox-inactivas").checked;

    const filtradas = await estacionesService.getEstaciones({texto, barrio, inactivas});
    mostrarEstaciones(filtradas);
}