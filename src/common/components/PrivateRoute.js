import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Skeleton } from '../../components/Skeleton';
import { useIsLoggedInQuery } from '../queries/auth';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data: { isLoggedIn } } = useIsLoggedInQuery();
    
    if (loading) return <Skeleton />;
    
    if (error) return <p>Error!</p>;
    
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/sign-in',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  };