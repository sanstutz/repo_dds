const hemisferios = {
    "NE": "Noreste",
    "NO": "Noroeste",
    "SE": "Sureste",
    "SO": "Suroeste"
};

(function () {
    document.addEventListener("DOMContentLoaded", async () => {
        const filtro = document.getElementById("form-filtro");
        if (filtro)
            filtro.addEventListener("submit", filtrar);
        cargarTabla();
    });
})();

async function cargarTabla(){
    try {
        const res = await fetch("http://localhost:3000/api/locales");
        const locales = await res.json();
        mostrarTabla(locales);
    }
    catch (error) {
        console.log(error);
    }
}

async function mostrarTabla(locales) {
    const tabla = document.getElementById("bodyTablaLocales");
    if (!tabla){
        return;
    }
    const countries = await fetch("http://localhost:3000/api/countries").then(res => res.json());
    tabla.innerHTML = "";
    locales.forEach((local) => {
        const fila = document.createElement("tr");
        const h = calcularHemisferio(local.longitud, local.latitud);
        fila.innerHTML = `<td>${local.nombre}</td>
                            <td>${local.direccion}</td>
                            <td>${local.ciudad}</td>
                            <td>${countries[local.pais]}</td>
                            <td>${hemisferios[h] + " (" + h + ")"}</td>`;
        tabla.appendChild(fila);
    });
}

function calcularHemisferio (longitud, latitud) {
    let hem = "";
    hem += latitud >= 0 ? "N" : "S";
    hem += longitud >= 0 ? "E" : "O";
    return hem;
}

async function filtrar(event) {
    event.preventDefault();
    const texto = document.getElementById("texto").value;
    const hemisferio = document.getElementById("hemisferio").value;
    let query = "?";
    if (texto !== "")
        query += "texto=" + texto + "&";
    if (hemisferio !== "T")
        query += "hemisferio=" + hemisferio;
    try {
        const res = await fetch("http://localhost:3000/api/locales" + query);
        const locales = await res.json();
        mostrarTabla(locales);
    }
    catch (error) {
        console.log(error);
    }}
