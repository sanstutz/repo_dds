import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { estacionesService } from "../services/estaciones.service.js";
import { barriosService } from "../services/barrios.service.js";

function NuevaEstacion() {
    const { register, handleSubmit, formState: { errors } } = useForm();    
    const [barrios, setBarrios] = useState([]);

    function onSubmit(data) {
        estacionesService.crearEstacion(data);
    }

    useEffect(() => {
        barriosService.obtenerBarrios().then(b => { setBarrios(b) });
    }, []);

    return (
        <div className="container">
            <h3>Nueva Estacion</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-4">
                    <label htmlFor="nombre">Nombre:</label>
                    <input {...register("nombre", { required: true, maxLength: 20 })} id="nombre" className="form-control"></input>
                    {errors.nombre && <span className="text-danger">{errors.nombre.type == "required" ? "Campo obligatorio" : "Maximo 20 caracteres"}</span>}
                </div>
                <div className="col-md-4">
                    <label htmlFor="direccion">Direccion:</label>
                    <input {...register("direccion", { required: true })} id="direccion" className="form-control"></input>
                    {errors.direccion?.type == "required" && <span className="text-danger">Campo obligatorio</span>}
                </div>
                <div className="col-md-4">
                    <label htmlFor="barrio">Barrio:</label>
                    <select {...register("barrio")} id="barrio" className="form-select">
                        {barrios.map((barrio, index) => 
                            (<option value={barrio.idBarrio} selected={index === 0}>{barrio.nombre}</option>)
                        )}
                    </select>
                    {errors.barrio && <span className="text-danger">Campo obligatorio</span>}
                </div>
                <div className="col-md-4 mt-3">
                    <button type="submit" className="btn btn-primary">Crear</button>
                </div>
            </form>
        </div>
    );
}

export default NuevaEstacion;