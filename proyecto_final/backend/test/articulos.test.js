import request from "supertest";
import app from "../index.js";
import { describe, it, expect } from "@jest/globals";

const articuloAlta = {
    nombre: "PC GAMER",
    precio: 1000000,
    codigoDeBarra: "6969696969696",
    idCategoria: 9,
    stock: 10,
    fechaAlta: "2025-05-23",
    activo: true
};

let idCreado = 0;

const articuloModificacion = {
    nombre: "PC GAMER 2",
    precio: 2000000,
    codigoDeBarra: "0000000000000",
    idCategoria: 9,
    stock: 55,
    fechaAlta: "2025-05-24",
    activo: true
};

describe("GET /api/articulos", () => {
    it("Deberia devolver todos los artículos de la pagina 1", async () => {
        const res = await request(app).get("/api/articulos?Pagina=1");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                items: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        nombre: expect.any(String),
                        precio: expect.any(Number),
                        stock: expect.any(Number),
                        fechaAlta: expect.any(String),
                        activo: expect.any(Boolean)
                    }),
                ]),
                registrosTotal: expect.any(Number),
            })
        );
    });
});

describe("GET /api/articulos con filtro", () => {
    it("Deberia devolver los aires activos", async () => {
        const res = await request(app).get("/api/articulos?nombre=AIRE&activo=true&pagina=1");

        expect(res.statusCode).toEqual(200);
        expect(verificarPropiedades(res.body.items)).toEqual(true);

        function verificarPropiedades(array) {
            for (let i = 0; i < array.length; i++) {
                if (!array[i].nombre.includes("AIRE") || !array[i].activo) {
                    console.log(array[i]);
                    return false;
                }
            }
            return true;
        }
    });
});

describe("GET /api/articulos/:id", () => {
    it("Deberia devolver el artículo 1", async () => {
        const res = await request(app).get("/api/articulos/1");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nombre: expect.any(String),
                precio: expect.any(Number),
                codigoDeBarra: expect.any(String),
                idCategoria: expect.any(Number),
                stock: expect.any(Number),
                fechaAlta: expect.any(String),
                activo: expect.any(Boolean),
            })
        );
    });
});

describe("POST /api/articulos", () => {
    it("Deberia devolver el articulo que acabo de crear", async () => {
        const res = await request(app).post("/api/articulos").send(articuloAlta);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                nombre: articuloAlta.nombre,
                precio: articuloAlta.precio,
                codigoDeBarra: articuloAlta.codigoDeBarra,
                idCategoria: articuloAlta.idCategoria,
                stock: articuloAlta.stock,
                fechaAlta: articuloAlta.fechaAlta,
                activo: articuloAlta.activo,
            })
        );
        idCreado = res.body.id;
    });
});

describe("PUT /api/articulos/:id", () => {
    it(`Deberia devolver 204 si se modifico la fila que acabo de crear`, async () => { // poner ${idCreado} muestra siempre 0 pero la modificacion la hace bien
        const res = await request(app).put(`/api/articulos/${idCreado}`).send(articuloModificacion);
        expect(res.statusCode).toEqual(204);
    });
});

describe("DELETE /api/articulos/:id", () => {
    it("Debería devolver 200 si el articulo fue borrado", async () => {
        const res = await request(app).delete(`/api/articulos/${idCreado}?fisica=true`); // baja fisica para que los test puedan repetirse mas adelante
        expect(res.statusCode).toEqual(200);
    });
});

