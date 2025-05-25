import React, { useEffect, useState } from "react";
import { categoriasMockService } from "../services/categorias-mock.service.js";

function Categorias() {
    const titulo = "Categorias";
    // categorias tiene un estado que cambia llamando setCategorias(value), por defecto tiene null
    const [categorias, setCategorias] = useState(null);

    // los effects se ejecutan despues del render y cuando cambie algun componente? en la lista cambie
    // no puede hacer una llamada asincrona directamente (poner await?)
    useEffect(() => {
        BuscarCategorias();
    }, []);

    // cambia el estado de categorias
    async function BuscarCategorias() {
        let data = await categoriasMockService.Buscar();
        setCategorias(data);
    };
    // mira el quilombo que hacen para simular oop en el paradigma funcional

    return (
        <>
            <div className="tituloPagina">{titulo}</div>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: "40%" }}>IdCategoria</th>
                            <th style={{ width: "60%" }}>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias && categorias.map(categoria => (
                            <tr key={categoria.idCategoria}>
                                <td>{categoria.idCategoria}</td>
                                <td>{categoria.nombre}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export { Categorias };
