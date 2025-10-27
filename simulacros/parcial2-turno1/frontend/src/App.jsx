import React, { useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router";
import FuncionesListado from "./pages/FuncionesListado.jsx";
import FuncionesFormulario from "./pages/FuncionesFormulario.jsx";

function App() {
  // lógica funcional previa a la construcción del resultado renderizable del componente
  const [funciones, setFunciones] = useState([]);
  const [funcion, setFuncion] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/funciones/lista" element={<FuncionesListado funciones={funciones} setFunciones={setFunciones} seleccionarFuncion={setFuncion} />}></Route>
        <Route path="/funciones/crear" element={<FuncionesFormulario accion={"C"} />} />
        <Route path="/funciones/duplicar" element={<FuncionesFormulario funcion={funcion} accion={"C"} />} />
        <Route path="/funciones/editar" element={<FuncionesFormulario funcion={funcion} accion={"E"} />} />
        <Route path="*" element={<Navigate to={"/funciones/lista"} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
