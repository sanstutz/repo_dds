import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import funcionesService from "../services/funciones.service.js";

export default function FuncionesFormulario({ funcion, accion }) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();


    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <form >
                <div>
                    <label className="form-label" htmlFor="pelicula"></label>
                    <input type="text" id="pelicula"
                    {...register("pelicula", {required: true})} defaultValue={funcion && funcion.pelicula} className="form-control" />
                </div>
                <div>
                    <label className="form-label" htmlFor="cine"></label>
                    <select id="cine" {...register("cine", {required: true})} defaultValue={funcion && funcion.idCine} className="form-select">

                    </select>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">{
                        accion === "E" ? "Editar" : "Crear"
                        }</button>
                </div>
            </form>
        </div>
    );
}