(function main () {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("form-filtro").addEventListener("submit", filtrar);
        document.getElementById("ordenar").addEventListener("change", filtrar);
        document.getElementById("ascendente").addEventListener("change", filtrar);
        cargarLocales();
        cargarPaises();
        cargarCamposOrdenacion();
    });
})();

const host = "http://localhost:3000/api/"

async function cargarPaises() {
    const res = await fetch(host + "paises");
    if (!res.ok){
        console.log("no se recibieron los paises");
        return;
    }
    const paises = await res.json();

    const select = document.getElementById("pais");
    select.innerHTML = "<option value=\"All\">Todos</option>";
    for (let cod in paises) {
        const option = document.createElement("option");
        console.log(`Agregando ${paises[cod]} con la opcion ${cod}`);
        option.value = cod;
        option.innerHTML = paises[cod];
        select.appendChild(option);
    }
}

async function cargarLocales(query = "") {
    query.replaceAll("?", "");
    try {
        const res = await fetch(host + "locales?" + query);
        if (!res.ok) {
            console.log("respuesta no ok");
            return;
        }
        const locales = await res.json();
        mostrarLocales(locales);        
    }
    catch (error) {
        console.error("error al buscar locales:", error);
    }
}

async function cargarCamposOrdenacion() {
    const campos = await fetch(host + "ordenacion").then(res => res.json());
    const select = document.getElementById("ordenar");
    select.innerHTML = "";
    campos.forEach(campo => {
        const option = document.createElement("option");
        option.innerHTML = campo;
        option.value = campo;
        select.appendChild(option);
    });
}

function filtrar(event){
    event.preventDefault();

    const texto = document.getElementById("texto").value;
    const latitud = document.getElementById("latitud").value;
    const longitud = document.getElementById("longitud").value;
    const pais = document.getElementById("pais").value;
    const ordenar = document.getElementById("ordenar").value;
    const ordDir = document.getElementById("ascendente").checked ? "ASC" : "DESC";

    const filtro = new URLSearchParams();
    filtro.append("texto", texto);
    filtro.append("hemisferio", latitud + longitud);
    filtro.append("pais", pais);
    filtro.append("orderBy", ordenar);
    filtro.append("orderDir", ordDir);
    cargarLocales(filtro.toString());
}

function mostrarLocales(locales) {
    const tabla = document.getElementById("bodyTablaLocales");
    tabla.innerHTML = "";
    locales.forEach(local => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${local.nombre}</td>
                        <td>${local.direccion}</td>
                        <td>${local.ciudad}</td>
                        <td>${local.provincia}</td>
                        <td>${local.pais}</td>
                        <td>${local.hemisferio}</td>`;
        tabla.appendChild(fila);
    });
}