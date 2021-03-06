import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import UserContext from '../context/user.context';
import { setConstants, toggleFavorite } from '../helpers';
import blackHeartIcon from '../svg/blackHeartIcon.svg';
import whiteHeartIcon from '../svg/whiteHeartIcon.svg';

function FavoriteButton({ details }) {
  const { favorites, setFavorites } = useContext(UserContext);
  const isDrinks = Object.keys(details).includes('idDrink');
  const { idKey } = setConstants(isDrinks);
  const isFavorite = favorites.some((item) => item.id === details[idKey]);

  return (
    <button
      type="button"
      className="svg-button-alt"
      onClick={ () => toggleFavorite({ details, favorites, setFavorites }) }
    >
      <img
        className="svg-small"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Add to Favorites"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default FavoriteButton;
