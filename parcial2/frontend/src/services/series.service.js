import axios from "./axios.config.js"

async function buscar() {
    const series = await axios.get("/series");
    return series.data;
}

export default { buscar };