import React, { useEffect, useState } from "react";
import { tarifasService } from "../services/tarifas.service.js";
import { useForm } from "react-hook-form";
import { FormularioTarifa } from "./FormularioTarifa.jsx";

const diasSemana = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
}

export const Tarifas = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [tarifas, setTarifas] = useState([]);
  const [tarifa, setTarifa] = useState(null);
  const [defSeleccionada, setDefinicion] = useState("S");
  const [accion, setAccion] = useState("L");

  const handleDefinicion = (event) => {
    if (defSeleccionada !== event.target.value) {
      setDefinicion(event.target.value);
    }
  }

  const handleEditar = (index) => {
    setAccion("E");
    setTarifa(tarifas[index]);
  }

  const onSubmit = async (data) => {
    if (defSeleccionada === "S") {
      const { descripcion, tipo, diaSemana } = data;
      const filtradas = await tarifasService.buscarPorSemana(descripcion, diaSemana, tipo);
      setTarifas(filtradas);
    }
    else {
      const { descripcion, fecha, tipo } = data;
      const [anio, mes, dia] = fecha.split("-");
      const filtradas = await tarifasService.buscarPorFecha(descripcion, dia, mes, anio, tipo);
      setTarifas(filtradas);
    }
  }

  useEffect(() => {
    tarifasService.obtenerTarifas().then((data) => {
      setTarifas(data);
    });
  }, []);

  if (accion !== "L"){
    return (<FormularioTarifa accion={accion} setAccion={setAccion} defSeleccionada={defSeleccionada} handleDefinicion={handleDefinicion} tarifa={tarifa} />);
  }

  return (
    <main className="container my-5">
      <h1 className="mb-4">Tarifas</h1>
      <form className="row g-3 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <input {...register("descripcion", {maxLength: 100})} className="form-control" placeholder="Descripcion" id="descripcion"/>
          {errors.descripcion && <span className="text-danger">{"Máximo 100 caracteres"}</span>}
        </div>
        <div className="col-md-2">
          <label htmlFor="tipo" className="form-label">Tipo:</label>
          <select {...register("tipo")} defaultValue={"T"} className="form-select" id="tipo">
            <option value="T">Todos</option>
            <option value="1">Normal</option>
            <option value="2">Descuento</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="definicion" className="form-label">Definición:</label>
          <select {...register("definicion")} onChange={handleDefinicion} defaultValue={"S"} className="form-select" id="definicion">
            <option value="S">Día Semana</option>
            <option value="C">Día/Mes/Año</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="dia" className="form-label">Día:</label>
          { defSeleccionada === "S" ? <input {...register("diaSemana", {required: true, min: 1, max: 7})} type="number" className="form-control"></input> :
                                      <input {...register("fecha", {required: true})} type="date" className="form-control"></input> }
          {errors.diaSemana && <span className="text-danger">{errors.diaSemana.type === "required" ? "Campo obligatorio" :
                                                            "El día no puede ser " + (errors.diaSemana.type === "min" ? "menor a 1" : "mayor a 7")}</span>}
          {errors.fecha && <span className="text-danger">{"Campo obligatorio"}</span>}
        </div>
        <div className="col-md-3 d-flex align-items-end justify-content-end">
          <button type="submit" className="btn btn-primary w-100">Filtrar</button>
        </div>
      </form>
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
        <tbody>
          {tarifas.map((tarifa, index) => (
            <tr key={index}>
              <td>{tarifa.descripcion}</td>
              <td>{tarifa.tipoTarifa === 1 ? "Normal" : "Descuento"}</td>
              <td>{tarifa.definicion.toUpperCase() === "S" ? "Día semana" : "Día mes"}</td>
              <td>{tarifa.definicion.toUpperCase() === "S" ? diasSemana[tarifa.diaSemana] : `${tarifa.diaMes}/${tarifa.mes}/${tarifa.anio}`}</td>
              <td>{"$" + tarifa.montoFijoAlquiler}</td>
              <td>{"$" + tarifa.montoMinutoFraccion}</td>
              <td>{"$" + tarifa.montoHora}</td>
              <td>{"$" + tarifa.montoKm}</td>
              <td>
                {/* Aquí puedes agregar botones para editar o eliminar */}
                <button className="btn btn-secondary btn-sm" onClick={() => handleEditar(index)}>Editar</button>
                <button className="btn btn-danger btn-sm ms-2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
