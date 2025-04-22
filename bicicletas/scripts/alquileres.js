(function (){
    document.addEventListener("DOMContentLoaded", buscarAlquileres);

})();

async function buscarAlquileres(){
    // await == espera a que resuelva la promesa y asigna el valor devuelto

    // fetch("https://api-bici-alquileres.vercel.app/api/alquileres").then(res => res.json()).then(d => {cargarHistorial(d)});

    // const promesa = fetch("https://api-bici-alquileres.vercel.app/api/alquileres").then(res => res.json());
    // const data = await promesa; // al resolver la promesa, va a recibir otra promesa (json), y va a seguir esperando hasta resolverla

    // const respuesta = await fetch("https://api-bici-alquileres.vercel.app/api/alquileres");
    // const data = await respuesta.json();

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
