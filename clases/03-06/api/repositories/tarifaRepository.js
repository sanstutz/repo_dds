// repositories/tarifaRepository.js

import RepositorioBase from "./repositorioBase.js";
import Tarifa from "../models/tarifa.js";
import { Op } from "sequelize";

class TarifaRepository extends RepositorioBase {
  constructor() {
    super(Tarifa);
  }

  // Método para buscar tarifas con filtros como descripción y tipo
  // Buscar tarifas definidas por día de la semana ('S')
  async buscarPorSemana({ descripcion, diaSemana, tipoTarifa = -1 } = {}) {
    const where = { definicion: "S", diaSemana };
        
    if (descripcion) {
      where.descripcion = { [Op.like]: `%${descripcion}%` };
    }

    if (!Number.isNaN(tipoTarifa) && tipoTarifa !== -1) {
      where.tipoTarifa = tipoTarifa;
    }

    return this.modelo.findAll({ where });
  }

  // Buscar tarifas definidas por fecha específica ('C')
  async buscarPorFecha({ descripcion, dia, mes, anio, tipoTarifa = -1 } = {}) {
    const where = { definicion: "C", diaMes: dia, mes, anio };
    
    if (descripcion) {
      where.descripcion = { [Op.like]: `%${descripcion}%` };
    }

    if (!Number.isNaN(tipoTarifa) && tipoTarifa !== -1) {
      where.tipoTarifa = tipoTarifa;
    }

    return this.modelo.findAll({ where });
  }
}

export default new TarifaRepository();
