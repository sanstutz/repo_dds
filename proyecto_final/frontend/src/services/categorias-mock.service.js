import arrayCategoria from "../datos-mock/categorias-mock.js";

async function Buscar() {
    return arrayCategoria;
}
async function BuscarPorId(idCategoria) {
    return arrayCategoria.find((categoria) => categoria.idCategoria === idCategoria);
}
async function Agregar(categoria) {
    categoria.idCategoria = arrayCategoria.length + 1;
    arrayCategoria.push(categoria);
}
async function Modificar(categoria) {
    let categoriaEncontrado = arrayCategoria.find((categoriafind) => categoriafind.idCategoria === categoria.idCategoria);
    if (categoriaEncontrado) {
        categoriaEncontrado.nombre = categoria.nombre;
    }
}
async function Eliminar(idCategoria) {
    let categoriaEncontrado = arrayCategoria.find((categoriafind) => categoriafind.idCategoria === idCategoria);
    if (categoriaEncontrado) {
        arrayCategoria.splice(arrayCategoria.indexOf(categoriaEncontrado), 1);
    }
}

export const categoriasMockService = { Buscar, BuscarPorId, Agregar, Modificar, Eliminar };
