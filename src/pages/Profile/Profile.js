import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_NOTE } from '/gql/query';

const ProfilePage = ({ match: { params: { id } } }) => {
  // const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  return <p>Profile</p>;
};

export default ProfilePage;