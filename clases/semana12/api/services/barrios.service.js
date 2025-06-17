import barrioRepository from "../repositories/barrioRepository.js";

class BarriosService {
    static async obtenerTodosOrdenados() {
        return await barrioRepository.obtenerTodosOrdenados();
    }

    static async obtenerPorId(barrioId) {
        return await barrioRepository.obtenerPorId(barrioId);
    }
}

export default BarriosService;