// services/tarifaService.js
import tarifaRepository from "../repositories/tarifaRepository.js";
import HttpError from "../util/HttpError.js";

class TarifaService {
  static async listar({ pagina = 1, limite = 10 } = {}) {
    return tarifaRepository.obtenerTodos({ pagina, limite });
  }

  static async obtenerPorId(id) {
    const tarifa = await tarifaRepository.obtenerPorId(id);
    if (!tarifa) throw new HttpError(404, "Tarifa no encontrada");
    return tarifa;
  }

  static async buscarPorSemana(descripcion="", diaSemana, tipoTarifa) {
    if (diaSemana < 1 || diaSemana > 7) throw new HttpError(400, "Día de la semana inválido");
    return tarifaRepository.buscarPorSemana({descripcion, diaSemana, tipoTarifa });
  }

  static async buscarPorFecha(descripcion="", dia, mes, anio, tipoTarifa) {
    if (
      dia < 1 || dia > 31
      || mes < 1 || mes > 12
      || anio < 2000 // o la regla que quieras
    ) throw new HttpError(400, "Fecha inválida");

    return tarifaRepository.buscarPorFecha({descripcion, dia, mes, anio, tipoTarifa });
  }

  static async crear(tarifa) {
    if (!tarifa.descripcion || typeof (tarifa.descripcion) !== String) throw new HttpError(400, "Descripción es requerida");
    if (tarifa.descripcion.length > 100) throw new HttpError(400, "Descripción no puede exceder 100 caracteres");

    if (![1, 2].includes(tarifa.tipoTarifa)) throw new HttpError(400, "Tipo de tarifa inválido");

    if (!["S", "C"].includes(tarifa.definicion.toUpperCase())) throw new HttpError(400, "Definición inválida");
    const definicion = tarifa.definicion.toUpperCase();

    if (definicion === "S") {
      if (!tarifa.diaSemana || (tarifa.diaSemana < 1 || tarifa.diaSemana > 7)) throw new HttpError(400, "Día de la semana inválido");
      if (tarifa.diaMes || tarifa.mes || tarifa.anio) throw new HttpError(400, "No se permiten campos de fecha para tarifas semanales");
    }
    else {
      if (!tarifa.diaMes || tarifa.diaMes < 1 || tarifa.diaMes > 31) throw new HttpError(400, "Día del mes inválido");
      if (!tarifa.mes || tarifa.mes < 1 || tarifa.mes > 12) throw new HttpError(400, "Mes inválido");
      if (!tarifa.anio) throw new HttpError(400, "Año inválido");
      if (tarifa.diaSemana) throw new HttpError(400, "No se permite día de la semana para tarifas mensuales");
    }

    if (!tarifa.montoFijoAlquiler || tarifa.montoFijoAlquiler < 0) throw new HttpError(400, "Monto fijo de alquiler inválido");
    if (!tarifa.montoMinutoFraccion || tarifa.montoMinutoFraccion < 0) throw new HttpError(400, "Monto por minuto o fracción inválido");
    if (!tarifa.montoKm || tarifa.montoKm < 0) throw new HttpError(400, "Monto por kilómetro inválido");
    if (!tarifa.montoHora || tarifa.montoHora < 0) throw new HttpError(400, "Monto por hora inválido");

    // validar que no haya otra
    if (definicion === "S"){
      const tarifasExistentes = await tarifaRepository.buscarPorSemana(tarifa.diaSemana, tarifa.tipoTarifa);
      if (tarifasExistentes.length > 0) {
        throw new HttpError(409, "Ya existe una tarifa del mismo tipo para ese día");
      }
    }
    else {
      const tarifasExistentes = await tarifaRepository.buscarPorFecha(tarifa.diaMes, tarifa.mes, tarifa.anio, tarifa.tipoTarifa);
      if (tarifasExistentes.length > 0) {
        throw new HttpError(409, "Ya existe una tarifa del mismo tipo para ese día");
      }
    }

    return await tarifaRepository.crear(tarifa);
  }

  static async actualizar(id, tarifa) {
    const tarifaExistente = await tarifaRepository.obtenerPorId(id);
    if (!tarifaExistente) throw new HttpError(404, "Tarifa no encontrada");

    // Validar campos como en crear
    if (!tarifa.descripcion || typeof (tarifa.descripcion) !== String) throw new HttpError(400, "Descripción es requerida");
    if (tarifa.descripcion.length > 100) throw new HttpError(400, "Descripción no puede exceder 100 caracteres");

    if (![1, 2].includes(tarifa.tipoTarifa)) throw new HttpError(400, "Tipo de tarifa inválido");

    if (!["S", "C"].includes(tarifa.definicion.toUpperCase())) throw new HttpError(400, "Definición inválida");
    const definicion = tarifa.definicion.toUpperCase();

    if (definicion === "S") {
      if (!tarifa.diaSemana || (tarifa.diaSemana < 1 || tarifa.diaSemana > 7)) throw new HttpError(400, "Día de la semana inválido");
      if (tarifa.diaMes || tarifa.mes || tarifa.anio) throw new HttpError(400, "No se permiten campos de fecha para tarifas semanales");
    }
    else {
      if (!tarifa.diaMes || tarifa.diaMes < 1 || tarifa.diaMes > 31) throw new HttpError(400, "Día del mes inválido");
      if (!tarifa.mes || tarifa.mes < 1 || tarifa.mes > 12) throw new HttpError(400, "Mes inválido");
      if (!tarifa.anio) throw new HttpError(400, "Año inválido");
      if (tarifa.diaSemana) throw new HttpError(400, "No se permite día de la semana para tarifas mensuales");
    }

    if (!tarifa.montoFijoAlquiler || tarifa.montoFijoAlquiler < 0) throw new HttpError(400, "Monto fijo de alquiler inválido");
    if (!tarifa.montoMinutoFraccion || tarifa.montoMinutoFraccion < 0) throw new HttpError(400, "Monto por minuto o fracción inválido");
    if (!tarifa.montoKm || tarifa.montoKm < 0) throw new HttpError(400, "Monto por kilómetro inválido");
    if (!tarifa.montoHora || tarifa.montoHora < 0) throw new HttpError(400, "Monto por hora inválido");

    return tarifaRepository.actualizar(id, tarifa);
  }
  
  static async eliminar(id) {
    const tarifa = await tarifaRepository.obtenerPorId(id);
    if (!tarifa) throw new HttpError(404, "Tarifa no encontrada");
    return tarifaRepository.eliminar(id);
  }
}

export default TarifaService;
