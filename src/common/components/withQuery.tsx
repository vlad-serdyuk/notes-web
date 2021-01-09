import React, { FC } from 'react';
import { useQuery } from '@apollo/client';

import { Skeleton } from 'common/components/Skeleton';

interface WithQueryProps {
  query: string;
}

export const withQuery = (Component) => (props) => {
    const { loading, error, data: [props.dataName] } = useQuery(props.query);
    
    if (loading) return <Skeleton />;
    
    if (error) return <p>Error!</p>;
    
    return <Component {...props} />;
  };