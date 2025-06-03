import request from "supertest";
import express from "express";
import BarriosService from "../../services/barrios.service.js";
import barriosRouter from "../../routes/barrios.routes.js";
import { jest } from "@jest/globals";
import { describe, it, expect, afterEach } from "@jest/globals";

jest.mock("../../services/barrios.service.js");
BarriosService.obtenerTodosOrdenados = jest.fn();
BarriosService.obtenerPorId = jest.fn();

const app = express();
app.use(express.json());
app.use("/barrios", barriosRouter);

describe("Barrios Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /barrios", () => {
        it("should return all barrios ordered", async () => {
            const mockResponse = [
                { idBarrio: 1, nombre: "Barrio A" },
                { idBarrio: 2, nombre: "Barrio B" }
            ];
            BarriosService.obtenerTodosOrdenados.mockResolvedValue(mockResponse);
            const response = await request(app).get("/barrios");

            expect(BarriosService.obtenerTodosOrdenados).toBeCalledWith();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
        });
    });

    describe("GET /barrios/:id", () => {
        it("should return a barrio by ID", async () => {
            const mockResponse = { idBarrio: 1, nombre: "Barrio A" };
            BarriosService.obtenerPorId.mockResolvedValue(mockResponse);
            const response = await request(app).get("/barrios/1");
            
            expect(BarriosService.obtenerPorId).toBeCalledWith(1);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
        });
        it("should return 204 if barrio not found", async () => {
            BarriosService.obtenerPorId.mockResolvedValue(null);
            const response = await request(app).get("/barrios/999");

            expect(BarriosService.obtenerPorId).toBeCalledWith(999);
            expect(response.status).toBe(204);
            expect(response.body).toEqual({ error: "Barrio no encontrado" });
        });
    });
});
