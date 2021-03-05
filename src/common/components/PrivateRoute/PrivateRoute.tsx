import React, { FC } from 'react';
import { Route, RouteComponentProps, RouteProps, Redirect } from 'react-router-dom';

import { useIsLoggedInQuery } from 'common/hooks/queries';
import { Skeleton } from 'common/components/Skeleton';

interface PrivateRouteProps extends RouteProps {
  component: FC<RouteComponentProps>,
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
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