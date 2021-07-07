import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import DetailsContext from '../context/details.context';
import UserContext from '../context/user.context';
import { getDetails } from '../helpers';

function DetailsProvider({ children }) {
  const { inProgress } = useContext(UserContext);
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [contentParams, setContentParams] = useState({ pathname: '', id: '' });

  const isDrinks = contentParams.pathname.includes('bebidas');
  const type = isDrinks ? 'drinks' : 'meals';
  const typePt = isDrinks ? 'bebidas' : 'comidas';
  const typeCypress = isDrinks ? 'bebida' : 'comida';
  const typeKey = isDrinks ? 'cocktails' : 'meals';
  const nameKey = isDrinks ? 'strDrink' : 'strMeal';
  const imgKey = isDrinks ? 'strDrinkThumb' : 'strMealThumb';
  const usedIngredients = contentParams.id
    ? inProgress[typeKey][contentParams.id] || []
    : [];

  const shared = {
    details,
    setDetails,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
    contentParams,
    setContentParams,
    isDrinks,
    type,
    typePt,
    nameKey,
    imgKey,
    typeKey,
    typeCypress,
    usedIngredients,
  };

  useEffect(() => {
    async function setter() {
      const result = await getDetails(type, contentParams.id);
      if (result[0]) {
        setDetails(result[0]);
        setIngredients(result[1]);
        setMeasures(result[2]);
      }
    }
    setter();
  }, [contentParams.id, type]);

  return (
    <DetailsContext.Provider value={ { ...shared } }>
      {children}
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsProvider;