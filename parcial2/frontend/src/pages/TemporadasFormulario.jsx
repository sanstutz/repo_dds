import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import seriesService from "../services/series.service.js";
import temporadasService from "../services/temporadas.service.js";
import { useNavigate } from "react-router-dom";

function TemporadasFormulario({ temporada }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [series, setSeries] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        seriesService.buscar()
            .then(s => setSeries(s));
    }, []);

    // recien luego del fetch de series puedo cargar los valores por defecto
    useEffect(() => {
        if (!temporada)
            return;
        reset({
            idSerie: temporada.serie.id,
            numero: temporada.numero,
            episodios: temporada.episodios,
            estreno: temporada.estreno,
            genero: temporada.genero,
            creador: temporada.creador
        });
    }, [series])

    const onSubmit = async (data) => {
        data.idSerie = Number(data.idSerie);
        data.numero = Number(data.numero);
        data.episodios = Number(data.episodios);
        data.estreno = Number(data.estreno);

        let res = "";
        if (temporada) {
            res = await temporadasService.actualizar(temporada.id, data);
            setError(res);
        }
        else {
            res = await temporadasService.crear(data);
            setError(res);
        }
        
        if (res === ""){
            const msg = temporada ? "modificada" : "creada";
            alert("Temporada " + msg + " con éxito.")
            navigate("/listado");
        }
    }

    return (
        <main className="container my-5 d-flex flex-column align-items-center">
            <h1 className="mb-4">{temporada ? "Editar temporada:" : "Crear temporada:"}</h1>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6 mt-1">
                    <label htmlFor="serie" className="form-label">Serie:</label>
                    <select {...register("idSerie", {
                        required: {
                            value: true,
                            message: "Campo es obligatorio"
                        }
                    })}
                        className="form-select"
                    >
                        <option></option>
                        {series.map(serie => (
                            <option value={serie.id} key={serie.id}>{serie.titulo}</option>
                        ))}
                    </select>
                    {errors?.idSerie && <span className="text-danger">{
                        errors.idSerie.message}</span>}
                </div>
                <div className="col-md-6 mt-1">
                    <label htmlFor="numero" className="form-label">Numero:</label>
                    <input {...register("numero", {
                        required: {
                            value: true,
                            message: "Campo obligatorio"
                        },
                        min: {
                            value: 1,
                            message: "El numero debe ser mayor a 0"
                        }
                    })}
                        type="number"
                        className="form-control"
                        id="numero"
                    />
                    {errors?.numero && <span className="text-danger">{
                        errors.numero.message}</span>}
                </div>
                <div className="col-md-6 mt-1">
                    <label htmlFor="episodios" className="form-label">Episodios:</label>
                    <input {...register("episodios", {
                        required: {
                            value: true,
                            message: "Campo obligatorio"
                        },
                        min: {
                            value: 1,
                            message: "Debe haber al menos 1 episodio"
                        }
                    })}
                        type="number"
                        className="form-control"
                        id="episodios"
                        />
                    {errors?.episodios && <span className="text-danger">{
                        errors.episodios.message}</span>}
                </div>
                <div className="col-md-6 mt-1">
                    <label htmlFor="estreno" className="form-label">Año de estreno:</label>
                    <input {...register("estreno", {
                        required: {
                            value: true,
                            message: "Campo obligatorio"
                        },
                        min: {
                            value: 1900,
                            message: "El año no puede ser menor a 1900"
                        },
                        max: {
                            value: new Date().getFullYear(),
                            message: "El año no puede ser mayor al año actual"
                        }
                    })}
                        type="number"
                        id="estreno"
                        className="form-control"
                    />
                    {errors?.estreno && <span className="text-danger">{
                        errors.estreno.message}</span>}
                </div>
                <div className="col-md-6 mt-1">
                    <label htmlFor="genero">Género:</label>
                    <input {...register("genero", {
                        required: {
                            value: true,
                            message: "Campo obligatorio"
                        }
                    })}
                        type="text"
                        id="genero"
                        className="form-control"
                    />
                    {errors?.genero && <span className="text-danger">{
                        errors.genero.message}</span>}
                </div>
                <div className="col-md-6 mt-1">
                    <label htmlFor="creador">Creador:</label>
                    <input {...register("creador", {
                        required: {
                            value: true,
                            message: "Campo obligatorio"
                        }
                    })}
                        type="text"
                        id="creador"
                        className="form-control"
                    />
                    {errors?.creador && <span className="text-danger">{
                        errors.creador.message}</span>}
                </div>
                <div className="col-md-12 d-flex align-items-end mt-3">
                    <button type="submit" className="btn btn-primary">
                        {temporada ? "Editar" : "Crear"}
                    </button>
                </div>
            </form>
            {error !== "" && <div className="my-5">
                <span className="alert alert-danger" role="alert">{error}</span>
            </div>}
        </main>
    );
}

export default TemporadasFormulario;