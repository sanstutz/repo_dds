(function (){
    document.addEventListener("DOMContentLoaded", buscarAlquileres);

})();

async function buscarAlquileres(){
    // method: "GET", headers: {"Content-Type": "application/json"}
    // await == espera a que resuelva la promesa y asigna el valor devuelto

    // const data = fetch("https://api-bici-alquileres.vercel.app/api/alquileres").then(res => res.json()).then(d => {cargarHistorial(d)});

    // const json = fetch("https://api-bici-alquileres.vercel.app/api/alquileres").then(res => res.json())
    // const data = await json;

    /*const res = await fetch("https://api-bici-alquileres.vercel.app/api/alquileres");
    const data = await res.json();*/

    const data = await fetch("https://api-bici-alquileres.vercel.app/api/alquileres").then(res => res.json());
    cargarHistorial(data);
}

function cargarHistorial(historial){
    const tabla = document.getElementById("cuerpo-historial");
    tabla.innerHTML = "";
    historial.forEach((prestamo) => {
        let linea = "";
        for (let elem in prestamo) {
            linea += "<td>" + String(prestamo[elem]) + "</td>";
        };
        tabla.innerHTML += "<tr>" + linea + "</tr>";
    });
}

function funcionAsync(time){
    setTimeout(()=>console.log("hola"), time);
    return 0;
}
