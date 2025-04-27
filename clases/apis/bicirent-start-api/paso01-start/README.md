# Paso 01

## Servidor Express básico con endpoints `/health-check` y `/echo`

Este es el primer paso del proyecto backend con Node.js y Express.  
Aquí se configura un servidor Express **desde cero** con dos rutas triviales para probar que la API está funcionando correctamente.

---

## 📁 Estructura del proyecto

```sh
paso01-start/
├── app.js               # Servidor Express con endpoints iniciales
├── package.json         # Configuración del proyecto Node.js
├── .gitignore
├── .eslintrc.json       # Reglas de estilo y linting (opcional)
└── test.rest            # Archivo para probar la API desde VS Code
```

---

## 🚀 ¿Qué incluye esta versión?

### ✅ 1. Ruta raíz `/`

Responde con una página HTML sencilla para confirmar que el servidor está activo.

### ✅ 2. Endpoint `/health-check`

- Método: `GET`
- Devuelve un JSON con estado del servidor.

```json
{
  "status": "ok",
  "timestamp": "2024-04-17T12:00:00.000Z"
}
```

### ✅ 3. Endpoint `/echo`

- Método: `GET`
- Requiere un parámetro `mensaje` por querystring
- Devuelve el mensaje recibido:

Ejemplo: `GET /echo?mensaje=hola`

```json
{
  "recibido": "hola"
}
```

---

## 📦 Instalación y ejecución

```bash
npm install
npm start
```

Luego abrí tu navegador en:  
👉 `http://localhost:3000/`

---

## 🧪 Pruebas con REST Client (`test.rest`)

Si usás VS Code, podés instalar la extensión **REST Client** y ejecutar directamente los tests incluidos en `test.rest`.

```http
### GET /health-check
GET http://localhost:3000/health-check

### GET /echo
GET http://localhost:3000/echo?mensaje=hola
```

---

## 🧠 ¿Qué aprendimos en este paso?

- Cómo configurar un proyecto Express desde cero
- Cómo levantar un servidor HTTP con Node.js
- Cómo definir rutas básicas con `app.get(...)`
- Cómo responder en JSON
- Cómo probar endpoints desde el editor

---

✌️ ¡Este es el primer peldaño de una API RESTful real!
