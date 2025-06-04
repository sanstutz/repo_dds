import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router";
import Encabezado from './components/Encabezado.jsx';
import PiePagina from './components/PiePagina.jsx';
import Inicio from './pages/Inicio.jsx';
import { Estaciones } from './pages/Estaciones.jsx';
import NuevaEstacion from './pages/NuevaEstacion.jsx';
import { Tarifas } from './pages/Tarifas.jsx';


function App() {
  return (
    <BrowserRouter>
      <Encabezado />
        <Routes>
          <Route index element={<Inicio />} /> {/* index === path="/" */}
          <Route path="/estaciones">
            <Route index element={<Estaciones />} />
            <Route path="nueva-estacion" element={<NuevaEstacion/>} />
          </Route>
          <Route path="/tarifas" element={<Tarifas/>} />
        </Routes>
        <PiePagina />
    </BrowserRouter>
  );
}

export default App;