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

  static async buscarPorSemana(diaSemana, tipoTarifa) {
    if (diaSemana < 1 || diaSemana > 7) throw new HttpError(400, "Día de la semana inválido");
    return tarifaRepository.buscarPorSemana({ diaSemana, tipoTarifa });
  }

  static async buscarPorFecha(dia, mes, anio, tipoTarifa) {
    if (
      dia < 1 || dia > 31
      || mes < 1 || mes > 12
      || anio < 2000 // o la regla que quieras
    ) throw new HttpError(400, "Fecha inválida");

    return tarifaRepository.buscarPorFecha({ dia, mes, anio, tipoTarifa });
  }
}

export default TarifaService;
