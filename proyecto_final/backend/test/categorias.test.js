import request from "supertest";
import app from "../index.js";
import { describe, it, expect } from "@jest/globals";

describe("GET /api/categorias", () => {
    it("Devuelte todas las categorias", async () => {
        const res = await request(app).get("/api/categorias").set("content-type", "application/json");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    idCategoria: expect.any(Number),
                    nombre: expect.any(String)
                })
            ])
        );
    });
});

describe("GET /api/categorias/:id", () => {
    it("Un json con una sola categoria", async () => {
        const res = await request(app).get("/api/categorias/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                idCategoria: 1,
                nombre: expect.any(String)
            })
        );
    });
});

describe("POST /api/categorias", () => {
    it("Un json de la categoria creada", async () => {
        const res = await request(app).post("/api/categorias").send({ nombre: "categoriaprueba"});
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                idCategoria: expect.any(Number),
                nombre: "categoriaprueba"
            })
        );
    })
});