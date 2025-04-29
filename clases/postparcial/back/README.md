
# 🛠️ Arquitectura del Proyecto Backend - BiciAlquileres

## 📚 Tecnologías utilizadas

- **Node.js** (entorno de ejecución backend)
- **Express.js** (framework web)
- **Sequelize ORM** (mapeo objeto-relacional)
- **SQLite** (motor de base de datos liviano)
- **Bootstrap 5** (framework CSS para frontend)
- **JavaScript ES6+**

---

## 🏗️ Estructura hasta el momento del backend

``` bash
api/
├── data/
│   └── db.sqlite               # Base de datos SQLite
├── models/
│   ├── barrio.js                # Modelo Sequelize de Barrio
│   └── estacion.js              # Modelo Sequelize de Estacion
├── middlewares/
│   └── logger.js                # Middleware propio de logging
├── repositories/
│   ├── repositorioBase.js       # Repositorio genérico para operaciones CRUD
│   ├── barrioRepository.js      # Repositorio especializado de Barrio
│   └── estacionRepository.js    # Repositorio especializado de Estacion
├── routes/
│   ├── servidor.routes.js       # Rutas de servidor (home, health-check, echo)
│   ├── barrios.routes.js        # Rutas de la API de barrios
│   └── estaciones.routes.js     # Rutas de la API de estaciones
├── app.js                       # Configuración principal de la app
└── db.js                        # Configuración de conexión a la base de datos
```

---

## 🔥 Flujo de una Request

Frontend (index.html, estaciones.html, etc.)
   ⇅ (fetch)
Backend (Express Routers)
   ↳ Middlewares (cors, logger)
   ↳ Repositorios (Barrio, Estacion)
   ↳ Modelos (Sequelize)
Base de Datos (db.sqlite)

---

## ⚡ Componentes destacados

### 🔹 Middlewares

- `cors` → Permite solicitudes Cross-Origin desde el frontend separado.
- `logger` → Registra en consola cada request con método, URL, status y tiempo de respuesta.

### 🔹 Modelos

- **Barrio**: representa un barrio de la ciudad.
- **Estacion**: representa una estación de bicicletas, asociada a un barrio.

### 🔹 Repositorios

- **RepositorioBase**: operaciones CRUD genéricas reutilizables (`findAll`, `findByPk`, `create`, `update`, `destroy`, `count`).
- **BarrioRepository**: especialización para obtener barrios ordenados alfabéticamente.
- **EstacionRepository**: especialización para buscar estaciones con filtros dinámicos.

### 🔹 Routers

- **ServidorRouter**: rutas de presentación del servidor (`/api`, `/api/health-check`, `/api/echo`).
- **BarriosRouter**: rutas para operaciones sobre barrios.
- **EstacionesRouter**: rutas para operaciones sobre estaciones.

---

## 🚀 Estado actual de la API

- `[GET] /api` → Página de servidor activo.
- `[GET] /api/health-check` → Estado de salud de la API.
- `[GET] /api/echo?mensaje=Hola` → Echo de mensaje recibido.
- `[GET] /api/barrios` → Listado de barrios ordenados.
- `[GET] /api/barrios/:id` → Detalle de barrio por ID.
- `[GET] /api/estaciones` → Búsqueda de estaciones con filtros opcionales (`texto`, `barrio`, `incluyeInactivos`).
- `[GET] /api/estaciones/:id` → Detalle de estación por ID incluyendo barrio.

---

## 📈 Plan de evolución (próximos pasos sugeridos)

- Agregar métodos **POST/PUT/DELETE** para crear, actualizar y eliminar barrios y estaciones.
- Incorporar **servicios** intermedios para encapsular reglas de negocio más complejas.
- Validaciones de datos de entrada más robustas (`express-validator` o manuales).
- Documentar la API usando herramientas como **Swagger/OpenAPI**.
- Optimizar rendimiento usando paginación, compresión (gzip), etc.
- Desplegar en un entorno en la nube (ejemplo: Azure, Railway).

---

## 🧠 Notas finales

- El backend actual es **100% funcional y modular**.
- Está preparado para **crecer** de forma ordenada, segura y profesional.
- El código está diseñado para ser **didáctico**, **legible** y **extensible**.

---
