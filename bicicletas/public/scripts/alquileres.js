import { getAlquileres, getEstaciones } from "./app.js";

(function (){
    document.addEventListener("DOMContentLoaded", async () => {
        cargarEstaciones();
        cargarHistorial(await getAlquileres());
        document.getElementById("form-filtro").addEventListener("submit", filtrar);
    });
})();



function cargarHistorial(alquileres){
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

async function cargarEstaciones(){
    const select = document.getElementById("select-estacion");
    select.innerHTML = "<option value=\"0\">Todas</option>";
    const estaciones = await getEstaciones();
    estaciones.forEach((estacion, i) => {
        select.innerHTML += `<option value="${i + 1}">${estacion.nombre}</option>`
    })
}

async function filtrar(event){
    event.preventDefault();
    const alquileres = await getAlquileres();
    const estaciones = await getEstaciones();

    const estacion = document.getElementById("select-estacion").value;
    const fecha = document.getElementById("input-fecha").value;
    const devueltos = document.getElementById("check-devueltos").checked;

    const filtro = alquileres.filter((prestamo) => {
        if (estacion > 0 && prestamo.estacionRetiro !== estaciones[estacion - 1].nombre && prestamo.estacionDevolucion !== estaciones[estacion - 1].nombre){
            return false;
        }
        if (fecha !== "" && prestamo.fecha.split(" ")[0] !== fecha && prestamo.FechaDevolucion.split(" ")[0] !== fecha){
            return false;
        }
        if (!devueltos && prestamo.fechaDevolucion !== ""){
            return false;
        }
        return true;
    });
    cargarHistorial(filtro);
}