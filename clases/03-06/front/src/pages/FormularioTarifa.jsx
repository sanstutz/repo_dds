import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { tarifasService } from "../services/tarifas.service.js";

export const FormularioTarifa = ({ accion, setAccion, defSeleccionada, handleDefinicion, tarifa }) => {
  const {register, handleSubmit, formState: { errors }} = useForm();

  return (
    <main className="container my-5">
      <h1 className="mb-4">
        {accion === "E" ? "Editar tarifa" : "Crear tarifa"}
      </h1>
      <form className="g-3 mb-4">
        <div className="col-md-4">
          <label htmlFor="descripcion" className="form-label">
            Descripción:
          </label>
          <input
            {...register("descripcion", { maxLength: 100 })}
            className="form-control"
            placeholder="Descripcion"
            id="descripcion"
            defaultValue={accion === "E" ? tarifa.descripcion : ""}
          />
          {errors.descripcion && (
            <span className="text-danger">{"Máximo 100 caracteres"}</span>
          )}
        </div>
        <div className="col-md-4">
          <label htmlFor="tipo" className="form-label">
            Tipo:
          </label>
          <select
            {...register("tipo")}
            defaultValue={accion === "E" ? `${tarifa.tipoTarifa}` : "T"}
            className="form-select"
            id="tipo"
          >
            <option value="T">Todos</option>
            <option value="1">Normal</option>
            <option value="2">Descuento</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="definicion" className="form-label">
            Definición:
          </label>
          <select
            {...register("definicion")}
            onChange={handleDefinicion}
            defaultValue={accion === "E" ? tarifa.definicion : "S"}
            className="form-select"
            id="definicion"
          >
            <option value="S">Día Semana</option>
            <option value="C">Día/Mes/Año</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="dia" className="form-label">
            Día:
          </label>
          {defSeleccionada === "S" ? (
            <input
              {...register("diaSemana", { required: true, min: 1, max: 7 })}
              type="number"
              className="form-control"
              defaultValue={accion === "E" ? tarifa.diaSemana : ""}
            ></input>
          ) : (
            <input
              {...register("fecha", { required: true })}
              type="date"
              className="form-control"
              defaultValue={accion === "E" ? `${tarifa.anio}-${tarifa.mes}-${tarifa.dia}` : ""}
            ></input>
          )}
          {errors.diaSemana && (
            <span className="text-danger">
              {errors.diaSemana.type === "required"
                ? "Campo obligatorio"
                : "El día no puede ser " +
                  (errors.diaSemana.type === "min" ? "menor a 1" : "mayor a 7")}
            </span>
          )}
          {errors.fecha && (
            <span className="text-danger">{"Campo obligatorio"}</span>
          )}
        </div>
        <div className="col-md-4 d-flex align-items-end justify-content-end my-3">
          <button type="submit" className="btn btn-primary w-100">
            {accion === "E" ? "Editar" : "Crear"}
          </button>
        </div>
      </form>
    </main>
  );
};
