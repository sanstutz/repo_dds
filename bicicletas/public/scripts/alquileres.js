const estaciones = ["Estación Central", "Parque Sarmiento", "Plaza San Martín", "Plaza Italia", "Parque Las Heras"];

let alquileres;

(function (){
    document.addEventListener("DOMContentLoaded", async () => {
        buscarAlquileres();
        document.getElementById("boton-filtrar").addEventListener("click", filtrar);
    });
})();

async function buscarAlquileres(){
    // await == espera a que resuelva la promesa y asigna el valor devuelto

    const respuesta = await fetch("https://api-bici-alquileres.vercel.app/api/alquileres", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
        if(!respuesta.ok){
            throw Error("Error al buscar alquileres");
        }
        alquileres = await respuesta.json();
        cargarHistorial();
    } catch (error){
        console.log(error);
    }
}

function cargarHistorial(filtro = {estacion: 1, fecha: "", devueltos: true}){
    const tabla = document.getElementById("cuerpo-historial");
    tabla.innerHTML = "";
    alquileres.forEach((prestamo) => {
        if (filtro.estacion > 1 && prestamo.estacionRetiro !== estaciones[filtro.estacion - 2] && prestamo.estacionDevolucion !== estaciones[filtro.estacion - 2]){
            return;
        }
        if (filtro.fecha !== "" && prestamo.fecha.split(" ")[0] !== filtro.fecha && prestamo.FechaDevolucion.split(" ")[0] !== filtro.fecha){
            return;
        }
        if (!filtro.devueltos && prestamo.fechaDevolucion !== ""){
            return;
        }
        tabla.innerHTML += `<tr>
                            <td>${prestamo.fecha}</td>
                            <td>${prestamo.estacionRetiro}</td>
                            <td>${prestamo.estacionDevolucion}</td>
                            <td>${prestamo.FechaDevolucion}</td>
                            <td>${prestamo.monto}</td>
                            </tr>`;
    });
}

export function filtrar(event){
    event.preventDefault();
    const estacion = document.getElementById("select-estacion").value;
    const fecha = document.getElementById("input-fecha").value;
    const devueltos = document.getElementById("check-devueltos").checked;
    const filtro = {
        estacion: estacion,
        fecha: fecha,
        devueltos: devueltos
    }
    console.log(filtro);
    cargarHistorial(filtro);
}