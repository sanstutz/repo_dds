const clasificaciones = [
    {
        codigo: "E",
        descripcion: "E - Everyone",
        icono: "fas fa-child text-success"
    },
    {
        codigo: "E10",
        descripcion: "E10+ - Everyone 10 and older",
        icono: "fas fa-children text-info"
    },
    {
        codigo: "T",
        descripcion: "T - Teen",
        icono: "fas fa-user-graduate text-primary"
    },
    {
        codigo: "M",
        descripcion: "M - Mature 17+",
        icono: "fas fa-user-shield text-warning"
    },
    {
        codigo: "AO",
        descripcion: "AO - Adults Only 18+",
        icono: "fas fa-ban text-danger"
    },
    {
        codigo: "RP",
        descripcion: "RP - Rating Pending",
        icono: "fas fa-hourglass-half text-secondary"
    },
    {
        codigo: "UR",
        descripcion: "UR - Unrated",
        icono: "fas fa-hourglass-half text-secondary"
    }
];

function getClasificacion(codigo) {
    return clasificaciones.find(c => c.codigo === codigo) || null;
}

export {clasificaciones, getClasificacion};