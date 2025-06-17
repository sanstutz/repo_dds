import { alquileresService } from "./front.js";

let estaciones = [
    "Plaza San Martín",
    "Parque Sarmiento",
    "Plaza Italia",
    "Parque Las Heras",
    "Estación Central"
];

(function () {
    document.addEventListener("DOMContentLoaded", async () => {
        cargarEstaciones();
        cargarHistorial();
        document.getElementById("form-filtro").addEventListener("submit", filtrar);
    });
})();

function cargarEstaciones() {
    const select = document.getElementById("select-estacion");
    select.innerHTML = "<option value=\"-1\">Todas</option>";
    estaciones.forEach((estacion, i) => {
        select.innerHTML += `<option value="${i}">${estacion}</option>`
    })
}

async function cargarHistorial() {
    const alquileres = await alquileresService.getAlquileres();
    mostrarHistorial(alquileres);
}

function mostrarHistorial(alquileres) {
    const tabla = document.getElementById("cuerpo-historial");
    tabla.innerHTML = "";
    alquileres.forEach((prestamo) => {
        tabla.innerHTML += `<tr>
                            <td>${prestamo.fecha}</td>
                            <td>${prestamo.estacionRetiro}</td>
                            <td>${prestamo.estacionDevolucion}</td>
                            <td>${prestamo.FechaDevolucion}</td>
                            <td>${prestamo.monto}</td>
                            </tr>`;
    });
}

// filtro en el cliente
async function filtrar(event) {
    event.preventDefault();

    const estacion = Number(document.getElementById("select-estacion").value);
    const fecha = document.getElementById("input-fecha").value;
    const devueltos = document.getElementById("check-devueltos").checked;

    const alquileres = await alquileresService.getAlquileres();
    console.log(alquileres[0])
    const filtrados = alquileres.filter((alquiler) => {
        if (estacion >= 0){
            const estacionSeleccionada = estaciones[estacion];
            if (alquiler.estacionRetiro !== estacionSeleccionada && alquiler.estacionDevolucion !== estacionSeleccionada)
                return false;
        }
        if (fecha !== "") {
            const fechaAlquiler = alquiler.fecha.split(" ")[0];
            const fechaDevolucion = alquiler.FechaDevolucion.split(" ")[0];
            if (fechaAlquiler !== fecha && fechaDevolucion !== fecha)
                return false;
        }
        if (!devueltos) {
            if (alquiler.FechaDevolucion === "")
                return false;
        }
        return true;
    });

    mostrarHistorial(filtrados);
}