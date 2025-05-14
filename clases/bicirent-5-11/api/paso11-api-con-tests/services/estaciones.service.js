import EstacionRepository from "../repositories/estacionRepository.js";

class EstacionesService {
  static async buscarConFiltros({ texto, barrioId, incluyeInactivos }) {
    return await EstacionRepository.buscarConFiltros({
      texto,
      barrioId,
      incluyeInactivos
    });
  }

  static async obtenerPorIdConBarrio(estacionId) {
    return await EstacionRepository.obtenerPorIdConBarrio(estacionId);
  }
}

export default EstacionesService;
