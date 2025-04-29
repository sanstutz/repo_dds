# Paso 02

## Integración de Backend + Frontend estático

En este paso se complementa el servidor Express con la capacidad de **servir contenido estático (HTML, CSS, JS)** y una API que provee datos desde un vector en memoria.

Esto permite mostrar por primera vez una **interacción real entre el frontend y el backend** usando `fetch`.

---

## 📁 Estructura del proyecto

```sh
paso02-back&front/
├── app.js                    # Backend con endpoint /api/barrios y contenido estático
├── package.json
├── test.rest                 # Pruebas del endpoint desde VS Code
└── public/                   # Contenido HTML/CSS/JS del sitio
    ├── index.html
    ├── estaciones.html       # HTML principal con filtro de barrios
    ├── js/bicialquileres.js  # Carga de barrios dinámicamente
    ├── css/bicialquileres.css
    └── images/...
```

---

## 🚀 ¿Qué incluye esta versión?

### ✅ 1. Servidor Express con `express.static`

```js
app.use(express.static('public'));
```

Esto permite servir todos los archivos dentro de la carpeta `public` directamente desde `http://localhost:3000`.

---

### ✅ 2. Endpoint `/api/barrios`

Este endpoint devuelve un array de objetos con los barrios disponibles, simulado con un vector en memoria.

```json
[
  { "idBarrio": 1, "nombre": "Nueva Córdoba" },
  { "idBarrio": 2, "nombre": "Centro" },
  ...
]
```

> Se puede probar desde el archivo `test.rest` en VS Code usando la extensión REST Client.

---

### ✅ 3. HTML que se conecta con el backend

El archivo `public/estaciones.html` incluye un `<select>` de barrios, que es poblado automáticamente con los datos del backend usando `fetch`.

Ejemplo:

```js
fetch('/api/barrios')
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById('barrio');
    // Limpiar y agregar opciones
    ...
  });
```

---

## 📦 Instrucciones

```bash
npm install
npm start
```

Luego abrí en el navegador:  
👉 `http://localhost:3000/estaciones.html`

---

## 🧠 ¿Qué aprendimos en este paso?

- Cómo servir archivos HTML, CSS y JS desde Express
- Cómo crear un endpoint API que devuelva datos simulados
- Cómo usar `fetch()` para traer datos desde un backend y renderizarlos
- Cómo sincronizar backend y frontend en un entorno unificado

---

✅ ¡Desde acá se viene la base de datos y los modelos reales!
