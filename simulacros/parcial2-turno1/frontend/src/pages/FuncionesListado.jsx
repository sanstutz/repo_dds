import React, { useState, useEffect } from "react";
import funcionesService from "../services/funciones.service";
import { useNavigate } from "react-router";

export default function FuncionesListado( { funciones, setFunciones, seleccionarFuncion }) {
    const [filtros, setFiltros] = useState({ nombre: "", sala: "", fecha: "" });
    const navigate = useNavigate();

    useEffect(() => {
        funcionesService.buscarFunciones().then(res => setFunciones(res));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await funcionesService.buscarFunciones(filtros);
        setFunciones(res);
    }

    const handleAccion = (funcion, accion) => {
        seleccionarFuncion(funcion);
        if (accion === "E") {
            navigate("/funciones/editar");
        }
        else if (accion === "C") {
            navigate("/funciones/duplicar");
        }
    }

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <div className="text-center">
                <h3 className="fw-bold mb-5 display-1">Funciones en cartelera</h3>
            </div>
            <div>
                <form className="row w-80" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="nombre">Pelicula:</label>
                        <input type="text" id="nombre" className="form-control" onChange={e => setFiltros({ ...filtros, nombre: e.target.value })}></input>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label" htmlFor="sala">Sala:</label>
                        <input type="text" id="sala" className="form-control" onChange={e => setFiltros({ ...filtros, sala: e.target.value })}></input>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label" htmlFor="fecha">Fecha:</label>
                        <input type="date" id="fecha" className="form-control" onChange={e => setFiltros({ ...filtros, fecha: e.target.value })}></input>
                    </div>
                    <div className="col-md-3 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary w-100">Buscar</button>
                    </div>
                </form>
                <table className="table table-bordered my-4">
                    <thead className="table-primary">
                        <tr>
                            <th>Pelicula</th>
                            <th>Horario</th>
                            <th>Disponible desde</th>
                            <th>Disponible hasta</th>
                            <th>Cine</th>
                            <th>Sala</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funciones.map(funcion => (
                            <tr key={funcion.id}>
                                <td>{funcion.pelicula}</td>
                                <td>{funcion.horario}</td>
                                <td>{funcion.fechaDesde}</td>
                                <td>{funcion.fechaHasta}</td>
                                <td>{funcion.cine}</td>
                                <td>{funcion.sala}</td>
                                <td className="d-flex">
                                    <button type="button" className="btn btn-primary" onClick={e => handleAccion(funcion, "E")}>E</button>
                                    <button type="button" className="btn btn-primary" onClick={e => handleAccion(funcion, "C")}>C</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}