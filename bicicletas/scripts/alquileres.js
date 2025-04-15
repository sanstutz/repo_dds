(function (){
    document.addEventListener("DOMContentLoaded", cargarHistorial);
})();

function cargarHistorial(){
    let historial = [
        // {fh_retiro: "2024-4-14 12:00", estacion_retiro: "Salida", estacion_devolucion: "Descanso 2", fh_devolucion: "2024-4-14 18:00", monto: 15000}
        ["2024-4-14 12:00", "Salida", "Descanso 2", "2024-4-14 18:00", 15000]
    ];
    let tabla = document.getElementById("cuerpo-historial");
    tabla.innerHTML = "";
    historial.forEach((prestamo, i) => {
        let linea = "";
        prestamo.forEach((elem) => {
            linea += "<td>" + String(elem) + "</td>";
        });
        tabla.innerHTML += "<tr>" + linea + "</tr>";
    })
}