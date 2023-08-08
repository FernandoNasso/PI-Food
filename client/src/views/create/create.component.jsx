import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets } from '../../Redux/actions/dietActions';
import Navbar from '../../Components/navbar/navbar.component';
import CreateForm from '../../Components/createForm/create-form.component'; // Importamos el componente CreateForm
import './create.styles.css';

function Create() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <CreateForm diets={diets} /> {/* Utilizamos el componente CreateForm */}
    </div>
  );
}

export default Create;