import React from 'react';
import Card from '../card/card.component'; 
import './cards.styles.css'; 

const Cards = (props) => {
     const {recipes} = props
  return (
    <div className="cards-container"> 
      {recipes.map(({ id, name, diets, image }) => { 
      
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

export default Cards; 



