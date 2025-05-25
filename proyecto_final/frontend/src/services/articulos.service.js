import httpService from "./http.service.js";
import { config } from "../config.js";

const urlResource = config.urlServidor + "/api/articulos";

async function Buscar(Nombre, Activo, Pagina) {
    const resp = await httpService.get(urlResource, {
        params: { nombre: Nombre, activo: Activo, pagina: Pagina },
    });
    return resp.data;
}

async function BuscarPorId(item) {
    const resp = await httpService.get(urlResource + "/" + item.id);
    return resp.data;
}

async function ActivarDesactivar(item) {
    await httpService.delete(urlResource + "/" + item.id);
}

async function Grabar(item) {
    if (item.id === 0) {
        await httpService.post(urlResource, item);
    } else {
        await httpService.put(urlResource + "/" + item.id, item);
    }
}

export const articulosService = {
    Buscar, BuscarPorId, ActivarDesactivar, Grabar
};
