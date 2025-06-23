import React, { useState, useEffect } from "react";
import temporadasService from "../services/temporadas.service.js";
import { useNavigate } from "react-router-dom";

function TemporadasListado({ seleccionarTemporada }) {
    const [temporadas, setTemporadas] = useState([]);
    const [filtros, setFiltros] = useState({
        titulo: "",
        plataforma: "",
        genero: ""
    })
    const navigate = useNavigate();

    const cargarTemporadas = () => {
        temporadasService.buscarUltimasCargadas()
        .then(t => setTemporadas(t));
    }

    useEffect(cargarTemporadas, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const temp = await temporadasService.buscar(filtros);
        setTemporadas(temp);
    }

    const handleEdit = (temporada) => {
        seleccionarTemporada(temporada);
        navigate("/editar");
    }

    const handleDelete = (temporada) => {
        const confirmar = window.confirm("¿Está seguro que quiere borrar esta temporada?");
        if (confirmar) {
            temporadasService.eliminar(temporada.id)
                .then(() => {
                    alert("Temporada eliminada con éxito.");
                    cargarTemporadas();
                });
        }
    }

    return (
        <main className="container my-5 d-flex flex-column align-items-center">
            <h1 className="mb-4">Temporadas:</h1>
            <form className="row" onSubmit={e => handleSubmit(e)}>
                <div className="col-md-6">
                    <label htmlFor="titulo" className="form-label">Serie:</label>
                    <input type="text" id="titulo" className="form-control" placeholder="Titulo de la serie"
                        onChange={e => setFiltros({ ...filtros, titulo: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="plataforma" className="form-label">Plataforma:</label>
                    <input type="text" id="plataforma" className="form-control" placeholder="Plataforma donde se encuentra"
                        onChange={e => setFiltros({ ...filtros, plataforma: e.target.value })}
                    />
                </div>
                <div className="col-md-6 mt-1">
                    <label htmlFor="genero" className="form-label">Género:</label>
                    <input type="text" id="genero" className="form-control" placeholder="Género"
                        onChange={e => setFiltros({ ...filtros, genero: e.target.value })}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-end mt-1">
                    <button type="submit" className="btn btn-primary w-100">buscar</button>
                </div>
            </form>
            <hr></hr>
            <table className="table table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th>Serie</th>
                        <th>Temporada</th>
                        <th>Episodios</th>
                        <th>Año de estreno</th>
                        <th>Plataforma</th>
                        <th>Género</th>
                        <th>Creador</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {temporadas.map(temporada => (
                        <tr key={temporada.id}>
                            <td>{temporada.serie.titulo}</td>
                            <td>{temporada.numero}</td>
                            <td>{temporada.episodios}</td>
                            <td>{temporada.estreno}</td>
                            <td>{temporada.serie.plataforma}</td>
                            <td>{temporada.genero}</td>
                            <td>{temporada.creador}</td>
                            <td>
                                <button className="btn btn-primary mx-2" onClick={
                                    _ => handleEdit(temporada)}
                                >Editar</button>
                                <button className="btn btn-primary" onClick={
                                    _ => handleDelete(temporada)}
                                >Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}

export default TemporadasListado;