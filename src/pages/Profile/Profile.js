import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME } from '/gql/query';

const ProfilePage = ({ match: { params: { id } } }) => {
  const { data: { me } = {} } = useQuery(GET_ME);

  return <p>Profile</p>;
};

export default ProfilePage;