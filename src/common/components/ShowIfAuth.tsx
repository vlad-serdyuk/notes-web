import React, { FC } from 'react';

import { Skeleton } from './Skeleton';
import { useIsLoggedInQuery } from 'common/hooks/queries';

interface ShowIfAuthProps {
  children: JSX.Element,
}

export const ShowIfAuth: FC<ShowIfAuthProps> = ({ children }) => {
  const { loading, error, data: { isLoggedIn } } = useIsLoggedInQuery();
    
  if (loading) return <Skeleton />;
    
  if (error) return <p>Error!</p>;

  if (!isLoggedIn) {
    return null;
  }
    
  return children;
};
  