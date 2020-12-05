import React, { FC } from 'react';

import { Skeleton } from '../../components/Skeleton';
import { useIsLoggedInQuery } from '../queries/auth';

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
  