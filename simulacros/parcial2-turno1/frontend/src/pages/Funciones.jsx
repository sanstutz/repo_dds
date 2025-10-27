import React, { useEffect, useState } from "react";
import FuncionesListado from "./FuncionesListado.jsx";

export default function Funciones() {
    const [accion, setAccion] = useState("L");

    return (
        <>
            {accion == "L" && <FuncionesListado funciones={funciones} setFunciones={setFunciones} filtros={filtros} setFiltros={setFiltros} />}
        </>
    );
}