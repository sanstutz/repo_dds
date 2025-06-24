import React from "react";
import { NavLink } from "react-router-dom";

function Encabezado() {
    return (
        <header className="bg-dark text-white py-3 mb-4">
            <div className="container">
                <nav className="mt-3">
                    <ul className="nav nav-pills d-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        <li className="nav-item text-center">
                            <NavLink to="/" className="nav-link">Inicio</NavLink>
                        </li>
                        <li className="nav-item text-center">
                            <NavLink to="/listado" className="nav-link">Listado</NavLink>
                        </li>
                        <li className="nav-item text-center">
                            <NavLink to="/nueva" className="nav-link">Nueva temporada</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Encabezado;