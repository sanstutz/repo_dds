function Encabezado() {
    return (
        <header className="bg-dark text-white py-3 mb-4">
            <div className="ccontainer py-5 h-100 position-relative">
                <div className="usuario-pill">
                    <i className="bi bi-person-circle"></i>
                    <span>Nombre Apellido</span>
                </div>
                <nav className="mt-3">
                    <ul className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm justify-content-center"
                        id="pillNav"
                        role="tablist"
                    >
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active rounded-5"
                                href="#">
                                Inicio
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link rounded-5" href="#">
                                Estaciones
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link rounded-5" href="#">
                                Alquileres
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link rounded-5" href="#">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Encabezado;
