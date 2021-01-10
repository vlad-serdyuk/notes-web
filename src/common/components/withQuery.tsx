import React, { FC, useEffect } from 'react';
import { DocumentNode, useQuery } from '@apollo/client';

import { Skeleton } from 'common/components/Skeleton';

interface WithQueryProps {
  query: DocumentNode;
  variables?: object;
  dataName: string;
}

export const withQuery = (BaseComponent: FC, { query, variables, dataName }: WithQueryProps): FC => 
  (props): JSX.Element => {
    const { loading, error, data } = useQuery(query, { variables });

    useEffect(() => {
      if (data) {
        props[dataName] = data[dataName];
      }
    }, [data]);
    
    if (loading) return <Skeleton />;
    
    if (error) return <p>Error!</p>;
    
    return (
      <BaseComponent
        error={error}
        loading={loading}
        {...props}
      />
    );
  };