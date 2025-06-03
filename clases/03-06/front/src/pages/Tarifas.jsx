import React, { useState } from "react";

export const Tarifas = () => {
  return (
    <main className="container my-5">
      <h1 className="mb-4">Tarifas</h1>
      <form className="row g-3 mb-4"></form>
      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>Descripcion</th>
            <th>Tipo</th>
            <th>Definición</th>
            <th>Día/Fecha</th>
            <th>Monto fijo</th>
            <th>Monto por minuto</th>
            <th>Monto por hora</th>
            <th>Monto por km</th>
            <th>Acciones</th>
          </tr>
        </thead>
      </table>
    </main>
  );
};
