import './Inicio.css';

function Inicio() {
    return (
        <main className="container mt-5">
            {/* Portada */}
            <h3 className="text-center fw-bold mb-5 display-1">
                Bienvenido al sistema BiciAlquileres Córdoba
            </h3>
            <section className="row g-4 text-center">
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <div className="landing-icon mb-3">
                                <i className="bi bi-geo-alt-fill"></i>
                            </div>
                            <h5 className="card-title">🌱 Ecológico</h5>
                            <p className="card-text text-muted">
                                Reduce tu huella de carbono con un transporte
                                sustentable.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <div className="landing-icon mb-3">
                                <i className="bi bi-geo-alt-fill"></i>
                            </div>
                            <h5 className="card-title">💪 Saludable</h5>
                            <p className="card-text text-muted">
                                Hacé ejercicio mientras te movés por la ciudad.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                                                      <div className="landing-icon mb-3">
                                <i className="bi bi-geo-alt-fill"></i>
                            </div>
                            <h5 className="card-title">🎯 Conveniente</h5>
                            <p className="card-text text-muted">
                                Alquiler por hora, por día o por semana. ¡Vos
                                elegís!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Llamado a la acción */}
            <section className="text-center ">
                <a href="#" className="btn btn-primary btn-lg">
                    Ver estaciones disponibles
                </a>
            </section>
        </main>
    );
}

export default Inicio;
