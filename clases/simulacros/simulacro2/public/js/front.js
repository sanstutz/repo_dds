(function main () {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("form-filtro").addEventListener("submit", filtrar);
        cargarLocales();
    });
})();

const host = "http://localhost:3000/api/"

async function cargarLocales(query = "") {
    console.log(query);
    try {
        const res = await fetch(host + "locales?" + query);
        if (!res.ok) {
            console.log("respuesta no ok");
            return;
        }
        const locales = await res.json();
        console.log(locales.length);
        mostrarLocales(locales);        
    }
    catch (error) {
        console.error("error al buscar locales:", error);
    }

}

function filtrar(event){
    event.preventDefault();
    const texto = document.getElementById("texto").value;
    const hemisferio = document.getElementById("hemisferio").value;
    const filtro = new URLSearchParams();
    filtro.append("texto", texto);
    filtro.append("hemisferio", hemisferio);
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
                        <td>${local.pais}</td>
                        <td>${local.hemisferio}</td>`;
        tabla.appendChild(fila);
    });
}