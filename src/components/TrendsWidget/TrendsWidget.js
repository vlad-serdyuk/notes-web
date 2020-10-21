import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Avatar, Box, Button, Text } from 'grommet';

import { GET_ME } from '/gql/query';
import { EditProfileDialog } from './EditProfileDialog';

export const TrendsWidgetComponent = ({ user, updateProfile }) => {
  return null;
};

TrendsWidgetComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export const SearchBarComponent = withRouter(TrendsWidgetComponent);