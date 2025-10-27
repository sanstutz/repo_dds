import Funcion from "../models/funcion.js";
import Cine from "../models/cine.js";
import { Op } from "sequelize";
import HttpError from "../errors/HttpError.js"

async function buscarActuales({ nombre = "", sala = "", fecha = "" }) {
    const hoy = new Date().toISOString().split('T')[0];

    const where = {};

    if (nombre !== "") {
        where.pelicula = { [Op.like]: `%${nombre}%` }
    }

    if (sala !== "") {
        where.sala = sala
    }

    // asumo que fecha siempre es un string formato YYYY-MM-DD
    if (fecha !== "") {
        where.fechaDesde = { [Op.lte]: fecha < hoy ? fecha : hoy }
        where.fechaHasta = { [Op.gte]: fecha > hoy ? fecha : hoy }
    }
    else {
        where.fechaDesde = {[Op.lte]: hoy};
        where.fechaHasta = {[Op.gte]: hoy};
    }

    return await Funcion.findAll({
        where,
        include: {model: Cine, as: "cine"},
        order: [["pelicula", "ASC"]]
    });
}

async function crearFuncion(funcion) {
    await validarCine(funcion);
    await validarHorario(funcion);
    await validarUnicidad(funcion);
    await validarFechas(funcion);

    await Funcion.create(funcion);
}

async function editarFuncion(id, datos) {
    const funcion = await Funcion.findByPk(id);
    if (funcion === null) throw new HttpError(404, "La funcion no existe");

    await validarCine(datos);
    await validarHorario(datos);
    await validarUnicidad(datos, [id]);
    await validarFechas(datos);

    await funcion.update(datos);
}

async function eliminarFuncion(id) {
    const funcion = await Funcion.findByPk(id);
    if (funcion === null) throw new HttpError(404, "La funcion no existe");

    funcion.destroy();
}

async function validarUnicidad(funcion, excluir = []) {
    const funciones = await Funcion.findAll({ where: {
        id: {[Op.not]: {[Op.in]: excluir }}
    }});
    funciones.forEach(f => {
        if (funcion.pelicula === f.pelicula && funcion.fechaDesde === f.fechaDesde && funcion.fechaHasta === f.fechaHasta && funcion.sala === f.sala &&
            funcion.idCine === f.idCine && funcion.horario === f.horario) {
            throw new HttpError(400, "Ya existe una funcion para esa pelicula en esa sala, en esa semana y en ese horario");
        }
    });
    return true;
}

async function validarFechas(funcion) {
    const desde = new Date(funcion.fechaDesde);
    const hasta = new Date(funcion.fechaHasta);

    if (isNaN(desde) || isNaN(hasta)) throw new HttpError(400, "Las fechas no estan correctamente formateadas");

    if (desde.getDay() !== 3) throw new HttpError(400, "La fecha inicial debe ser un jueves");
    if (hasta.getDay() !== 2) throw new HttpError(400, "La fecha final debe ser un miercoles");

    if (hasta < new Date()) throw new HttpError(400, "La fecha final no puede haber llegado");

    desde.setHours(0, 0, 0, 0);
    hasta.setHours(0, 0, 0, 0);
    if ((hasta - desde) / (1000 * 60 * 60 * 24) !== 6) // si empieza jueves y termina miercoles son 6 dias de diferencia, no 7
        throw new HttpError(400, "La fecha final debe ser una semana despues de la inicial");

    return true;
}

async function validarHorario(funcion) {
    const horario = funcion.horario.split(":");
    
    if (horario.length !== 2 || horario[0].length !== 2 || horario[1].length !== 2) throw new HttpError(400, "El horario esta mal formateado");
    const hora = Number(horario[0]);
    const minutos = Number(horario[1]);
    if (isNaN(hora) || hora < 0 || hora > 23) throw new HttpError(400, "La hora esta fuera del rango de 24 horas");
    if (isNaN(minutos) || minutos < 0 || minutos > 59) throw new HttpError(400, "Los minutos estan fuera del rango de 60 minutos");

    return true;
}

async function validarCine(funcion) {
    const cine = await Cine.findByPk(funcion.idCine);
    if (cine === null) throw new HttpError(404, "El cine no existe");
    return true
}

export default { buscarActuales, crearFuncion, editarFuncion, eliminarFuncion };