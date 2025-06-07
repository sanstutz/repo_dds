import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { tarifasService } from "../services/tarifas.service.js";

export const FormularioTarifa = ({ accion, setAccion, defSeleccionada, handleDefinicion, tarifa }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const {id, descripcion, tipo, definicion, diaSemana, fecha, mfijo, mminuto, mhora, mkm } = data;
    const [anio, mes, dia] = fecha ? fecha.split("-") : [null, null, null];
    tarifasService.editarTarifa(id, descripcion, tipo, definicion, diaSemana, dia, mes, anio, mfijo, mminuto, mhora, mkm)
    setAccion("L");
  }

  return (
    <main className="container my-5">
      <h1 className="mb-4">
        {accion === "E" ? "Editar tarifa" : "Crear tarifa"}
      </h1>
      <form className="g-3 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-4">
          <label htmlFor="descripcion" className="form-label">
            Descripción:
          </label>
          <input
            {...register("descripcion", { required: true, maxLength: 100 })}
            className="form-control"
            placeholder="Descripcion"
            id="descripcion"
            defaultValue={accion === "E" ? tarifa.descripcion : ""}
          />
          {errors.descripcion && <span className="text-danger">{errors.descripcion.type === "required" ?
            "Cambo obligatorio" : "Máximo 100 caracteres"}</span>}
        </div>
        <div className="col-md-4">
          <label htmlFor="tipo" className="form-label">
            Tipo:
          </label>
          <select
            {...register("tipo", { required: true })}
            defaultValue={accion === "E" ? `${tarifa.tipoTarifa}` : ""}
            className="form-select"
            id="tipo"
          >
            <option value=""></option>
            <option value="1">Normal</option>
            <option value="2">Descuento</option>
          </select>
          {errors.tipo && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-md-4">
          <label htmlFor="definicion" className="form-label">
            Definición:
          </label>
          <select
            {...register("definicion", {/*no hay forma de no poner el valor*/})}
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
          {errors.diaSemana && (<span className="text-danger">{errors.diaSemana.type === "required" ?
                "Campo obligatorio" : "El día no puede ser " +
                (errors.diaSemana.type === "min" ? "menor a 1" : "mayor a 7")}
            </span>
          )}
          {errors.fecha && <span className="text-danger">{"Campo obligatorio"}</span>}
        </div>
        <div className="col-md-4">
          <label htmlFor="mfijo" className="form-label">Monto fijo:</label>
          <input {...register("mfijo", {required: true, min: 0})}
            type="number" step="0.01" className="form-control" id="mfijo"
            defaultValue={accion === "E" ? `${tarifa.montoFijoAlquiler}` : ""}
          />
          {errors.mfijo && <span className="text-danger">{errors.mfijo.type === "required" ? "Campo obligatorio" :
          "El monto no puede ser negativo"}</span>}
        </div>
        <div className="col-md-4">
          <label htmlFor="mminuto" className="form-label">Monto por minuto:</label>
          <input {...register("mminuto", {required: true, min: 0})}
            type="number" step="0.01" className="form-control" id="mminuto"
            defaultValue={accion === "E" ? `${tarifa.montoMinutoFraccion}` : ""}
          />
          {errors.mminuto && <span className="text-danger">{errors.mminuto.type === "required" ? "Campo obligatorio" :
          "El monto no puede ser negativo"}</span>}
        </div>
        <div className="col-md-4">
          <label htmlFor="mhora" className="form-label">Monto por hora:</label>
          <input {...register("mhora", {required: true, min: 0})}
            type="number" step="0.01" className="form-control" id="mhora"
            defaultValue={accion === "E" ? `${tarifa.montoHora}` : ""}
          />
          {errors.mhora && <span className="text-danger">{errors.mhora.type === "required" ? "Campo obligatorio" :
          "El monto no puede ser negativo"}</span>}
        </div>
        <div className="col-md-4">
          <label htmlFor="mkm" className="form-label">Monto por kilometro:</label>
          <input {...register("mkm", {required: true, min: 0})}
            type="number" step="0.01" className="form-control" id="mkm"
           defaultValue={accion === "E" ? `${tarifa.montoKm}` : ""}
          />
          {errors.mkm && <span className="text-danger">{errors.mkm.type === "required" ? "Campo obligatorio" :
          "El monto no puede ser negativo"}</span>}
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
