import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import UserContext from '../context/user.context';

function UserProvider({ children }) {
  const { email } = JSON.parse(localStorage.getItem('user')) || { email: '' };
  const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const localDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const localInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { cocktails: {}, meals: {} };

  const [userEmail, setUserEmail] = useState(email);
  const [favorites, setFavorites] = useState(localFavorites);
  const [done, setDone] = useState(localDone);
  const [inProgress, setInProgress] = useState(localInProgress);
  const [warningMessage, setWarningMessage] = useState('');

  const shared = {
    userEmail,
    setUserEmail,
    favorites,
    setFavorites,
    done,
    setDone,
    inProgress,
    setInProgress,
    warningMessage,
    setWarningMessage,
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(done));
  }, [done]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }, [inProgress]);

  return (
    <UserContext.Provider value={ { ...shared } }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
