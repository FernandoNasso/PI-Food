import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../../Redux/actions/recipeActions';
import confirmationImage from "../../assets/eliminar.png";
import "./card.styles.css";

function Card({ id, name, diets, image }) {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar la visualización del cartel de confirmación

  const handleDelete = () => {
    dispatch(deleteRecipe(id));
  };

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation); // Cambiar el estado del cartel de confirmación
  };
  
  return (
    <div className="card-container">
      <img className="card-img" src={image} alt={name} />
      <div className="card-content">
        <h2>{name}</h2>
        <p>
          Dietas:{" "}
          {diets && Array.isArray(diets)
            ? diets.map((diet) => (typeof diet === "object" ? diet.name : diet)).join(", ")
            : "No especificadas"}
        </p>
      </div>
      <Link to={`/detail/${id}`}>
        <button className="detail-button">Ver detalle</button>
      </Link>
      <button className="delete-button" onClick={toggleConfirmation}>
        Eliminar receta
      </button>
      
      {/* Cartel de confirmación */}
      {showConfirmation && (
        <div className="confirmation">
          <img src={confirmationImage} alt="Confirmación" className="confirmation-image" />
          <p>¿Estás seguro de eliminar esta receta?</p>
          <p>esta acción no tiene retorno</p>
          <button className="confirm-button" onClick={handleDelete}>
            Confirmar
          </button>
          <button className="cancel-button" onClick={toggleConfirmation}>
            Cancelar
          </button>
          <img src={confirmationImage} alt="Confirmación" className="confirmation-image" />
        </div>
      )}
    </div>
  );
}

export default Card;





