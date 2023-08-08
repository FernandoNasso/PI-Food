// Card component
import React from "react";
import { Link } from "react-router-dom";
import "./card.styles.css";

function Card({ id, name, diets, image, }) {
  

  return (
    <div className="card-container">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Dietas: {diets.join(', ')}</p>
      <Link to={`/detail/${id}`}>
        <button>Ver detalle</button>
      </Link>
    </div>
  );
}

export default Card;



