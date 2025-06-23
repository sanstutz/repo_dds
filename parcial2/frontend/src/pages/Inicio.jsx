import React from "react";
import { useNavigate } from "react-router-dom";

function Inicio() {
    const navigate = useNavigate();

    return (
        <main className="container my-5">
            <h1 className="text-center">La mejor página para ver temporadas</h1>
            <div className="d-flex justify-content-center my-5">
                <button onClick={e => navigate("/listado")} className="btn btn-primary">
                    {"Descubrí más >"}
                </button>
            </div>
        </main>
    );
}

export default Inicio;