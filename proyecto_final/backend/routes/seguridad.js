import express from "express";
import jwt from "jsonwebtoken";
import { accessTokenSecret, refreshTokenSecret } from "../middlewares/auth.js"

const router = express.Router();

const users = [
    {
        usuario: "admin",
        clave: "123",
        rol: "jefe",
    },
    {
        usuario: "juan",
        clave: "123",
        rol: "empleado",
    },
];
let refreshTokens = [];

router.post("/api/login", (req, res) => {
    const { usuario, clave } = req.body;
    const user = users.find(u => (u.usuario === usuario && u.clave === clave));
    if (user) {
        const accessToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            accessTokenSecret,
            { expiresIn: "20m" }
        );
        const refreshToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            refreshTokenSecret
        );

        refreshTokens.push(refreshToken);

        res.status(200).json({ // tengo que enviarle los tokens de vuelta para que los pueda usar
            accessToken,
            refreshToken,
            message: "Bienvenido " + user.usuario + " (rol: " + user.rol + ")",
        });
    }
    else {
        res.status(401).json({ message: "Usuario o clave incorrectos" });
    }
});

// refresh en el header
router.post("/api/logout", (req, res) => {
    let message = null;
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader) {
        token = authHeader.split(" ")[1];
    }
    console.log(token);
    // solo hay que eliminar el de refresco para que el token de acceso no se renueve, pero sigue siendo valido hasta que pasen los 20 minutos
    if (refreshTokens.includes(token)) {
        message = "Usuario deslogueado correctamente!";
    }
    else {
        message = "Logout inválido!";
    }

    refreshTokens = refreshTokens.filter(t => t !== token);
    res.json({ message: message });
});

// refresh en el body
router.post("/api/refreshtoken", (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken)
        return res.sendStatus(401);

    if (!refreshTokens.includes(refreshToken))
        return res.sendStatus(403);

    jwt.verify(refreshToken, refreshTokenSecret, (error, user) => {
        if (error)
            res.sendStatus(403);

        // renueva el token de acceso del usuario
        const accessToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            accessTokenSecret,
            { expiresIn: "20m" }
        );

        res.json({ accessToken });
    });
});

export default router;