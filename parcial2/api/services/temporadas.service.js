import Temporada from "../models/temporada.js";
import Serie from "../models/serie.js";
import { Op } from "sequelize";
import HttpError from "../errors/HttpError.js";

async function buscar(filtros) {
    const limit = 50;
    const whereTemp =  {};
    const whereSerie = {};

    if (filtros.titulo !== "") {
        whereSerie.titulo = {[Op.like]: `%${filtros.titulo}%`}
    }
    if (filtros.plataforma !== ""){
        whereSerie.plataforma = filtros.plataforma
    }
    if (filtros.genero !== ""){
        whereTemp.genero = {[Op.like]: `%${filtros.genero}%`}
    }

    const temporadas = await Temporada.findAll({
        where: whereTemp,
        include: {model: Serie, as: "serie", where: whereSerie},
        limit: limit,
        order: [["idSerie", "ASC"], ["numero", "ASC"]]
    });
    return temporadas;
}

async function buscarUltimas() {
    const limit = 50;
    const temporadas = await Temporada.findAll({
        include: {
            model: Serie,
            as: "serie"
        },
        limit: limit,
        order: [["id", "DESC"]]
    });
    return temporadas;
}

async function crear(datos) {
    await validarSerie(datos); // si falla tira error y es atrapado por el catch del router
    validarEstreno(datos);
    validarEpisodios(datos);
    validarDatos(datos);

    await Temporada.create(datos);
}

async function editar(id, datos){
    const temporada = await getTemporada(id);
    await validarSerie(datos, id);
    validarEstreno(datos);
    validarEpisodios(datos);
    validarDatos(datos);

    await temporada.update(datos);
}

async function borrar(id){
    const temporada = await getTemporada(id);
    await temporada.destroy();
}

// VALIDACIONES

// busca una temporada por id y tira HttpError 404 si no la encuentra
async function getTemporada(id){
    const temporada = await Temporada.findByPk(id);
    if (!temporada)
        throw new HttpError(404, "No se encontro la temporada ingresada");
    return temporada;
}

// valida que el idSerie sea valido y que la temporada no se repita (id es el id de la temporada a modificar si estoy validando para la edicion)
async function validarSerie(datos, id=-1) {
    if (datos.idSerie === -1)
        throw new HttpError(400, "No se indico un id de serie valido");
    if (datos.numero === -1)
        throw new HttpError(400, "No se indico un numero de temporada valido");
    const serie = await Serie.findByPk(datos.idSerie); // podria llamar a seriesService, pero que los service se importen entre si puede causar problemas, esto pasa por no usar repositorios
    if (!serie)
        throw new HttpError(404, "No se encontro la serie");
    const temporadaConMismoNumero = await Temporada.findOne({
        where: {
            id: {[Op.not]: id}, // cuando actualizo, si no estoy modificando el numero me va a salir que ya existe uno (yo mismo)
            idSerie: datos.idSerie,
            numero: datos.numero
        }
    });
    if (temporadaConMismoNumero)
        throw new HttpError(400, "Ya existe una temporada con ese numero para esa serie");
}

// valida la fecha de estreno
function validarEstreno(datos){
    const hoy = new Date().getFullYear();
    if (datos.estreno < 1900)
        throw new HttpError(400, "El año de estreno no puede ser menor al 1900");
    if (datos.estreno > hoy)
        throw new HttpError(400, "El año de estreno no puede ser mayor al año actual");
}

// valida episodios
function validarEpisodios(datos) {
    if (datos.episodios <= 0)
        throw new HttpError(400, "Debe haber al menos 1 episodio");
}

// valida que el resto de datos no esten vacios
function validarDatos(datos) {
    if (datos.genero === "")
        throw new HttpError(400, "El genero no puede estar vacio");
    if (datos.creador === "")
        throw new HttpError(400, "El creador no puede estar vacio");
}

export default { buscar, buscarUltimas, crear, editar, borrar };