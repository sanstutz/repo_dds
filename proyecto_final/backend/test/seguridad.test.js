import request from "supertest";
import app from "../index.js";

const usuarioJefe = { usuario: "admin", clave: "123" };
const usuarioEmpleado = { usuario: "juan", clave: "123" };

describe("POST /api/login admin", () => {
    it("Devolveria error de autenticacion, porque tiene clave errónea", async () => {
        const res = await request(app).post("/api/login").send({ usuario: "admin", clave: "errónea" });

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual("Usuario o clave incorrectos");
    });

    it("Devolvería el token para usuario admin", async () => {
        const res = await request(app).post("/api/login").send(usuarioJefe);

        expect(res.statusCode).toEqual(200);
        expect(res.body.accessToken).toEqual(expect.any(String));
    });
});

describe("GET /api/usuarios", () => {
    it("Devolveria error porque falta token de autorización", async () => {
        const res = await request(app).get("/api/usuarios");

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual("Acceso denegado");
    });

    it("Devolvería todos los usuarios", async () => {
        const resLogin = await request(app).post("/api/login").set("Content-type", "application/json").send(usuarioJefe);
        expect(resLogin.statusCode).toEqual(200);
        let token = resLogin.body.accessToken;

        const res = await request(app).get("/api/usuarios").set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nombre: expect.any(String),
                    clave: expect.any(String),
                    rol: expect.any(String),
                }),
            ])
        );
    });


    it("Devolvería error de autorizacion porque solo estan autorizados los jefes", async () => {
        const resLogin = await request(app).post("/api/login").set("Content-type", "application/json").send(usuarioEmpleado);
        expect(resLogin.statusCode).toEqual(200);
        let token = resLogin.body.accessToken;

        const res = await request(app).get("/api/usuarios").set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toEqual("Usuario no autorizado");
    });
});
