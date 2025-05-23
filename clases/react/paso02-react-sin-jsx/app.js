const root = ReactDOM.createRoot(document.getElementById("root")); // la raiz del html donde voy a crear todo

// Crear título: <h1>🚀 Bienvenidos al mundo de la programación web</h1>
const titulo = React.createElement(
  "h1",
  null,
  "🚀 Bienvenidos al mundo de la programación web"
);

// Crear párrafo: <p>Con JavaScript podemos construir interfaces desde cero...</p>
const parrafo = React.createElement(
  "p",
  null,
  "Con JavaScript podemos construir interfaces desde cero... aunque no siempre es la forma más cómoda 😅"
);

// Crear lista de emojis motivadores
const lista = React.createElement(
  "ul",
  null,
  [
    React.createElement("li", null, "💻 Código"),
    React.createElement("li", null, "🔥 Pasión"),
    React.createElement("li", null, "🧠 Lógica"),
    React.createElement("li", null, "🎯 Objetivos")
  ]
);

// Crear contenedor general
const contenedor = React.createElement(
  "div",
  null,
  [titulo, parrafo, lista]
);

// Renderizar el contenido
root.render(contenedor);
