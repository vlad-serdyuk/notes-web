import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Image, Text, TextInput } from 'grommet';

const renderSuggestions = () => {
  return []
    .filter(
      ({ name }) => name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
    )
    .map(({ name, imageUrl }, index, list) => ({
      label: (
        <Box
          direction="row"
          align="center"
          gap="small"
          border={index < list.length - 1 ? 'bottom' : undefined}
          pad="small"
        >
          <Image
            width="48px"
            src={imageUrl}
            style={{ borderRadius: '100%' }}
          />
          <Text>
            <strong>{name}</strong>
          </Text>
        </Box>
      ),
      value: name,
    }));
};

const SearchBarComponent = ({ history }) => {
  return (
    <Box>
      <TextInput
        type="search"
        dropTarget={boxRef.current}
        plain
        value={value}
        suggestions={renderSuggestions()}
        placeholder="Search Notedly"
        onChange={onChange}
        onSelect={onSelect}
        onSuggestionsOpen={() => setSuggestionOpen(true)}
        onSuggestionsClose={() => setSuggestionOpen(false)}
      />
    </Box>
  );
};

SearchBarComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export const SearchBarComponent = withRouter(SearchBarComponent);