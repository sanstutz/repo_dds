import Serie from "../models/serie.js";

async function buscarTodas(){
    const series = await Serie.findAll({
        order: [["titulo", "ASC"]]
    });
    return series;
}

export default { buscarTodas }