
# 🛠️ Paso 7 - Backend - Modularización con Routers

## 📚 Tecnologías utilizadas

- **Node.js** (entorno de ejecución backend)
- **Express.js** (framework web)
- **Sequelize ORM** (mapeo objeto-relacional)
- **SQLite** (motor de base de datos liviano)

---

## 🏗️ Estructura del backend en este paso

```bash
src/
  data/
    db.sqlite             # Base de datos
  models/
    barrio.js             # Modelo Sequelize de Barrio
    estacion.js           # Modelo Sequelize de Estacion
  middlewares/
    logger.js             # Middleware propio para registrar cada request
  routes/
    servidor.routes.js    # Rutas relacionadas al servidor (/api, /api/health-check, /api/echo)
    barrios.routes.js     # Rutas de la API de barrios
    estaciones.routes.js  # Rutas de la API de estaciones
  app.js                  # Configuración principal de la app
  db.js                   # Conexión a la base de datos
```

---

## 🧠 Conceptos introducidos

- **Modularización del backend**:
  - Cada grupo de rutas se separa en un **Router** Express independiente.
  - `/api` → ServidorRouter
  - `/api/barrios` → BarriosRouter
  - `/api/estaciones` → EstacionesRouter

---

## 🔥 Cambios principales en este paso

- `app.js` ahora solo monta middlewares y routers:

  ```javascript
  app.use("/api", servidorRouter);
  app.use("/api/barrios", barriosRouter);
  app.use("/api/estaciones", estacionesRouter);
  ```

- Cada Router maneja solo su conjunto de rutas específico.
- Los Routers llaman métodos de los Repositorios para obtener los datos.

---

## 🚀 Endpoints disponibles

Se mantienen los mismos endpoints que en pasos anteriores, pero ahora:

✅ Implementados de manera modular.  
✅ Mejor organización y separación de responsabilidades.

---

## ⚡ Detalles técnicos destacados

- **Middlewares** iniciales (`cors`, `logger`) aplicados globalmente.
- **Routers** Express que agrupan rutas por recurso.
- **Código más mantenible, escalable y profesional**.

---

## 📈 Siguiente objetivo

En los próximos pasos:

- Agregar métodos **POST**, **PUT** y **DELETE** para modificar datos.
- Introducir la **capa de Repositorios** para encapsular el acceso a la base de datos.
- Agregar **validaciones** de datos en las operaciones de escritura.

---
