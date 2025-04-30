const calcularHemisferio = (longitud, latitud) => {
    let hem = "";
    hem += latitud >= 0 ? "N" : "S";
    hem += longitud >= 0 ? "E" : "O";
    return hem;
}

export default calcularHemisferio;