
# 🛠️ Paso 5 - Backend - Modelos y Endpoints Básicos

## 📚 Tecnologías utilizadas

- **Node.js** (entorno de ejecución backend)
- **Express.js** (framework web)
- **Sequelize ORM** (mapeo objeto-relacional)
- **SQLite** (motor de base de datos liviano)

---

## 🏗️ Estructura inicial del backend

```bash
src/
  data/
    db.sqlite             # Base de datos
  models/
    barrio.js             # Modelo Sequelize para Barrios
    estacion.js           # Modelo Sequelize para Estaciones
  app.js                  # Configuración principal de la app Express
  db.js                   # Configuración de conexión a SQLite con Sequelize
```

---

## 🧠 Conceptos introducidos

- Configuración de un **servidor básico Express**.
- **Conexión a una base de datos SQLite** utilizando Sequelize.
- Creación de **modelos de datos**:
  - `Barrio`: tabla de barrios de la ciudad.
  - `Estacion`: tabla de estaciones de bicicletas, con relación a Barrio (`idBarrio`).
- Definición de **rutas básicas** para exponer información de la base:
  - `/api/barrios`
  - `/api/estaciones`

---

## 🔥 Endpoints disponibles en este paso

- `[GET] /api/barrios` → Devuelve la lista de todos los barrios.
- `[GET] /api/estaciones` → Devuelve la lista de todas las estaciones.

Ambos endpoints obtienen los datos usando `findAll()` sobre sus respectivos modelos.

---

## 🛠️ Ejemplo de respuesta de `/api/barrios`

```json
[
  { "idBarrio": 1, "nombre": "Centro" },
  { "idBarrio": 2, "nombre": "Nueva Córdoba" }
]
```

---

## ⚡ Detalles técnicos destacados

- **Express** maneja las rutas y las respuestas HTTP.
- **Sequelize** realiza las operaciones ORM hacia la base SQLite.
- **Sin middlewares personalizados** todavía (solo el mínimo necesario de Express).
- **Sin filtros**: devolvemos todos los registros sin condiciones.
- **Sin modularización avanzada** aún: todas las rutas en `app.js`.

---

## 🚀 Siguiente objetivo

En el próximo paso comenzaremos a:

- Aplicar **filtros de búsqueda** en los endpoints.
- Hacer uso de operadores avanzados de Sequelize (`LIKE`, `OR`).
- Preparar el backend para **interactuar dinámicamente** con el frontend.

---
