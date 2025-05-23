// Crear un título motivador
const titulo = document.createElement("h1");
titulo.innerText = "🚀 Bienvenidos al mundo de la programación web";

// Crear un párrafo
const parrafo = document.createElement("p");
parrafo.innerText = "Con JavaScript podemos construir interfaces desde cero... aunque no siempre es la forma más cómoda 😅";

// Crear una lista de emojis motivadores
const lista = document.createElement("ul");
["💻 Código", "🔥 Pasión", "🧠 Lógica", "🎯 Objetivos"].forEach(item => {
  const li = document.createElement("li");
  li.innerText = item;
  lista.appendChild(li);
});

// Insertar el contenido en el div#root
const contenedor = document.getElementById("root");
contenedor.appendChild(titulo);
contenedor.appendChild(parrafo);
contenedor.appendChild(lista);
