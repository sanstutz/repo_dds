const host = "http://localhost:3000"

async function cargarSelect() {
    try {
        const res = await fetch(host + "/api/diccionario");
        if (!res.ok)
            throw Error("La respuesta no estuvo ok");
        const diccionario = await res.json();
            
        const select = document.getElementById("selectid");
        select.innerHTML = "<option value=\"all\">Todos</option>";
        for (let elem in diccionario) {
            select.innerHTML += `<option value=\"${elem}\">${diccionario[elem]}</option>`;
        }
    }
    catch (error) {
        console.error("Error al hacer fetch:\n", error);
    }
}

async function cargarTabla(url) {
    try {
        const res = await fetch(url);
        if (!res.ok)
            throw Error("La respuesta no estuvo ok");
        const reg = await res.json();
        mostrarPeliculas(reg);
    }
    catch (error) {
        console.error("Error al hacer fetch:\n", error);
    }
}

function mostrarTabla(registros) {
    const tabla = document.getElementById("tablaid");
    tabla.innerHTML = "";
    registros.forEach(elem => {
        const fila = document.createElement("tr");
        for(let atributo in elem){ // si los atributos estan en el orden de la tabla
            const celda = document.createElement("td");
            celda.innerHTML = elem[atributo].toString();
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    });
}

async function filtrarTabla(event){
    event.preventDefault();
    const texto = document.getElementById("textoid").value;
    const select = document.getElementById("selectid").value;
    const checkbox = document.getElementById("checkboxid").checked;

    let url = "";
    if ( texto !== "" || select !== "all" /*|| checkbox? */) { // por si piden no filtrar si hay valores por defecto
        const query = new URLSearchParams({texto: texto, select: select, checkbox: checkbox});
        url = host + "/api/ruta?" + query.toString();
    }
    else {
        url = host + "/api/rutapordefecto";
    }
    cargarPeliculas(url);
}

(function main() {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("formid").addEventListener("submit", filtrarTabla);
        cargarTabla(host + "/api/rutapordefecto");
        cargarSelect();
    });
})();