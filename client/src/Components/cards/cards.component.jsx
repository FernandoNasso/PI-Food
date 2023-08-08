import React from 'react'; // Importa la biblioteca React
import Card from '../card/card.component'; // Importa el componente Card
import { useSelector } from 'react-redux'; // Importa el hook useSelector de react-redux
import './cards.styles.css'; // Importa los estilos CSS específicos para las tarjetas

const Cards = () => {
  const recipes = useSelector(state => state.recipes); // Obtiene las recetas del estado global

  return (
    <div className="cards-container"> {/* Define un contenedor para las tarjetas */}
      {recipes.map(({ id, name, diets, image }) => { // Mapea y renderiza las tarjetas de recetas
      
        return (
          <Card
            key={id}
            image={image} 
            name={name}
            diets={diets} 
            id={id}
          />
        );
      })}
    </div>
  );
};

export default Cards; // Exporta el componente Cards para su uso en otros lugares



