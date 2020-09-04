import React from 'react';
import PropTypes from 'prop-types';

import { Skeleton } from '/components/Skeleton';
import { useIsLoggedInQuery } from '../queries/auth';

export const ShowIfAuth = ({ children }) => {
  const { loading, error, data: { isLoggedIn } } = useIsLoggedInQuery();
    
  if (loading) return <Skeleton />;
    
  if (error) return <p>Error!</p>;

  if (!isLoggedIn) {
    return null;
  }
    
  return children;
};

ShowIfAuth.propTypes = {
  children: PropTypes.element.isRequired
};
  