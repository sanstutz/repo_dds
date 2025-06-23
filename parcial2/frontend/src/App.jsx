import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Encabezado from "./components/Encabezado.jsx";
import Inicio from "./pages/Inicio.jsx";
import TemporadasListado from "./pages/TemporadasListado.jsx";
import TemporadasFormulario from "./pages/TemporadasFormulario.jsx";

function App() {
  // lógica funcional previa a la construcción del resultado renderizable del componente
  const [temporada, setTemporada] = useState(null); // para la edicion

  return (
    <BrowserRouter>
      <Encabezado />
      <Routes>
        <Route index element={<Inicio />}/>
        <Route path="/listado" element={<TemporadasListado seleccionarTemporada={setTemporada}/>}/>
        <Route path="/nueva" element={<TemporadasFormulario/>}/>
        <Route path="/editar" element={<TemporadasFormulario temporada={temporada}/>}/>
        <Route path="*" element={<Navigate to={"/inicio"} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
