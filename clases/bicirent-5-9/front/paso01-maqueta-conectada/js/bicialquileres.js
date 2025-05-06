const host = "http://localhost:3000"

async function cargarBarrios() {
  const response = await fetch(`${host}/api/barrios`);
  console.log(response);

  if (!response.ok) throw new Error("No encontró API");

  const barrios = await response.json();
  console.log(barrios);

  const select = document.getElementById("barrio");

  select.innerHTML = "";

  const opcionTodos = document.createElement("option");
  opcionTodos.value = "-1";
  opcionTodos.textContent = "Todos";
  select.appendChild(opcionTodos);

  barrios.forEach((b) => {
    const option = document.createElement("option");
    option.value = b.idBarrio;
    option.textContent = b.nombre;
    select.appendChild(option);
  });
}

async function cargarEstaciones(event) {
  console.log("Ejecutó");
  if (event) {
    event.preventDefault();
  }

  const textoInput = document.getElementById("texto").value.trim();
  const barrioSelect = document.getElementById("barrio").value;
  const inactivosCheckbox = document.getElementById("inactivos").checked;

  const params = new URLSearchParams();

  if (textoInput !== "") {
    params.append("texto", textoInput);
  }

  if (barrioSelect !== "Todos") {
    params.append("barrio", barrioSelect);
  } else {
    params.append("barrio", "-1");
  }

  params.append("incluyeInactivos", inactivosCheckbox);

  const url = `${host}/api/estaciones?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const estaciones = await response.json();
    console.log(estaciones);
    renderizarEstaciones(estaciones);
  } catch (error) {
    console.error("Error cargando estaciones:", error);
  }
}

function renderizarEstaciones(estaciones) {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  estaciones.forEach(estacion => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${estacion.idEstacion}</td>
      <td>${estacion.nombre}</td>
      <td>${estacion.direccion}</td>
      <td>${estacion.barrio ? estacion.barrio.nombre : ""}</td>
      <td>${estacion.activa === 1 ? "Sí" : "No"}</td>
    `;

    tbody.appendChild(fila);
  });
}