
# 🛠️ Paso 6 - Backend - Middlewares, CORS y Logger

## 📚 Tecnologías utilizadas

- **Node.js** (entorno de ejecución backend)
- **Express.js** (framework web)
- **Sequelize ORM** (mapeo objeto-relacional)
- **SQLite** (motor de base de datos liviano)
- **Cors** (middleware de Cross-Origin Resource Sharing)

---

## 🏗️ Estructura del backend en este paso

```bash
src/
  data/
    db.sqlite             # Base de Datos
  models/
    barrio.js             # Modelo Sequelize de Barrio
    estacion.js           # Modelo Sequelize de Estacion
  middlewares/
    logger.js             # Middleware propio para registrar cada request
  app.js                  # Configuración principal de la app
  db.js                   # Conexión a la base de datos
```

---

## 🧠 Conceptos introducidos

- Uso de **middlewares** en Express para manejar el flujo de las requests.
- Introducción del middleware de terceros **CORS** para habilitar llamadas cross-origin desde el frontend separado.
- Creación de un **middleware propio de logging** que registra:
  - Fecha y hora
  - Método HTTP
  - URL solicitada
  - Código de estado HTTP de la respuesta
  - Tiempo de respuesta

---

## 🔥 Middlewares agregados

### 🔹 `cors`

Configurado para permitir solicitudes únicamente desde `http://localhost:5500` (donde corre el frontend).

```javascript
app.use(cors({
  origin: "http://localhost:5500",
  methods: ["GET"],
  credentials: true
}));
```

### 🔹 `logger`

Middleware personalizado que registra cada request:

```javascript
// Ejemplo de salida en consola:
[2025-04-28T22:00:00.123Z] GET /api/barrios 200 - 15ms
```

Se activa al finalizar la respuesta, midiendo también el tiempo de procesamiento.

---

## 🚀 Endpoints disponibles

Los mismos que en el paso anterior:

- `[GET] /api/barrios`
- `[GET] /api/estaciones`

✅ Ahora con soporte CORS y logs automáticos en la consola.

---

## ⚡ Detalles técnicos destacados

- **Configuración CORS** para permitir el acceso desde el frontend separado.
- **Middleware de logging propio** para monitoreo del servidor.
- Primer paso hacia la **observabilidad y seguridad** del backend.
- Seguimos con **estructura simple**, pero mucho más robusta.

---

## 📈 Siguiente objetivo

En el próximo paso:

- Modularizaremos las rutas separándolas en archivos independientes.
- Crearemos **routers** específicos para cada recurso (`servidor`, `barrios`, `estaciones`).
- Empezaremos a trabajar sobre la **capa de acceso a datos** creando los **repositorios**.

---
