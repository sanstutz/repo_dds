import CardInicio from "../components/CardInicio";
import "./Inicio.css";

const cards = [
  {
    title: "🌱 Ecológico",
    text: "Reduce tu huella de carbono con un transporte sustentable.",
  },
  {
    title: "💪 Saludable",
    text: "Hacé ejercicio mientras te movés por la ciudad.",
  },
  {
    title: "🎯 Conveniente",
    text: "Alquiler por hora, por día o por semana. ¡Vos elegís!",
  },
];

function Inicio() {
  return (
    <main className="container mt-5">
      {/* Portada */}
      <h3 className="text-center fw-bold mb-5 display-1">
        Bienvenido al sistema BiciAlquileres Córdoba
      </h3>
      <section className="row g-4 text-center">
        {cards.map((card, index) => (
          <CardInicio key={index} title={card.title} text={card.text} />
        ))}
      </section>
      {/* Llamado a la acción */}
      <section className="text-center ">
        <a href="/estaciones" className="btn btn-primary btn-lg"> {/* esto no es SPA */}
          Ver estaciones disponibles
        </a>
      </section>
    </main>
  );
}

export default Inicio;
