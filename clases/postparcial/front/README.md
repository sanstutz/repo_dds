
# 🚲 Frontend - BiciAlquileres

## 📚 Tecnologías utilizadas
- **HTML5** (estructura)
- **CSS3** (estilos, principalmente vía framework)
- **Bootstrap 5** (framework de maquetado responsivo)
- **JavaScript ES6+** (programación del cliente)
- **Fetch API** (comunicación asincrónica con el backend)

---

## 🏗️ Estructura del proyecto

```
frontend/
├── css/
│   └── bicialquileres.css           # Estilos personalizados
├── js/
│   └── bicialquileres.js             # Lógica JavaScript de consumo de API
├── index.html                        # Página de inicio
├── estaciones.html                   # Listado y filtro de estaciones
├── alquileres.html                   # Gestión de alquileres (a futuro)
├── datos.html                        # Página de datos personales
└── contacto.html                     # Página de contacto
```

---

## 🧠 Conceptos trabajados en este frontend

- Uso de **Bootstrap** para diseño y maquetado responsivo rápido.
- Construcción de páginas **modulares** y **navegables** entre sí.
- Consumo de la **API backend** de BiciAlquileres usando **fetch()**:
  - Listar barrios (`/api/barrios`)
  - Filtrar estaciones (`/api/estaciones?texto=&barrio=&incluyeInactivos=`)
  - Cargar datos dinámicamente en tablas HTML.
- Manipulación del DOM para mostrar resultados de forma interactiva.

---

## 🔥 Principales funcionalidades JavaScript

- **`cargarBarrios()`**: carga dinámica de barrios en el `<select>` del formulario de búsqueda.
- **`cargarEstaciones()`**: realiza peticiones a la API de estaciones aplicando filtros, y renderiza los resultados en la tabla de estaciones.
- **Control de eventos**: manejo del evento `submit` del formulario para evitar recarga de página y realizar búsquedas dinámicas.

---

## 🌐 Comunicación con Backend

Este frontend se conecta al backend de BiciAlquileres a través de solicitudes HTTP utilizando **Fetch API**.

Configuraciones relevantes:
- CORS habilitado en el backend (`http://localhost:5500` → `http://localhost:3000`).
- Todas las solicitudes utilizan `application/json` como tipo de contenido esperado.

---

## 🚀 Instrucciones para correr el frontend localmente

1. Asegurarse de tener el backend de BiciAlquileres corriendo en `http://localhost:3000`.
2. Abrir el archivo `index.html` en un navegador moderno (por ejemplo, Google Chrome o Edge).
3. Navegar entre las distintas secciones del sitio.
4. Utilizar el formulario de búsqueda en **Estaciones** para probar las peticiones dinámicas.

---

## 📈 Futuras mejoras

- Agregar formularios de alta y edición de alquileres.
- Mejorar validaciones de entrada en el lado cliente.
- Implementar paginación de resultados en el listado de estaciones.
- Refactorizar el JavaScript usando módulos ES6.
- Incorporar alertas dinámicas y mejoras de experiencia de usuario.

---

## 🧠 Notas finales

Este frontend es un proyecto educativo y práctico, diseñado para:
- Aplicar maquetado profesional con Bootstrap.
- Practicar consumo de APIs REST usando JavaScript puro.
- Servir como base para evoluciones posteriores del sistema BiciAlquileres.

---
