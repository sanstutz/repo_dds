import { fileURLToPath } from "url"
import express from "express";
import cors from "cors";
import inicializarBase from "./models/inicializarBase.js";
import categoriasRouter from "./routes/categorias.js";
import articulosRouter from "./routes/articulos.js";
import seguridadRouter from "./routes/seguridad.js"
import usuariosRouter from "./routes/usuarios.js"

// https://docs.google.com/document/d/1pewKQP7CeGjVmgZkgtQJlG8uOrI028K65zD41V2olco/edit?tab=t.0#heading=h.gw85bpgp7r7t

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "*"}));
app.use(seguridadRouter);

app.use("/api/usuarios", usuariosRouter);
app.use("/api/categorias", categoriasRouter);
app.use("/api/articulos", articulosRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

(function main(){
    const __filename = fileURLToPath(import.meta.url);
    if (__filename === process.argv[1]) {
        inicializarBase().then(() => {
            app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}...`));
        })
    }
})();

export default app;