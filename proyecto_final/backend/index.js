import express from "express";
import inicializarBase from "./models/inicializarBase.js";
import categorias from "./routers/categorias.js";
import articulos from "./routers/articulos.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/categorias", categorias);
app.use("/api/articulos", articulos);


(function main(){
    inicializarBase().then(() => {
        app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}...`));
    })
})();