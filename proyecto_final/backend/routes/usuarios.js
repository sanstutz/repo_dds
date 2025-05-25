import express from "express";
import Usuario from "../models/usuariosModel.js";
import { authenticateJWT } from "../middlewares/auth.js";
import authorizedRoles from "../middlewares/roles.js";

const router = express.Router();

const rolesAutorizados = ["jefe"];

router.get("/", authenticateJWT, authorizedRoles(rolesAutorizados), async (req, res) => { // "api/usuarios"
    try {
        // el middleware se encarga de revisar que sea un rol autorizado
        /*const user = res.locals.user;
        // solo el jefe puede ver todo
        /*if (user.rol !== "jefe") {
            return res.status(403).json({ message: "Usuario no autorizado" });
        }*/

        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

export default router;