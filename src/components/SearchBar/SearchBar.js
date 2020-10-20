import React, { useState, useCallback, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Search } from 'grommet-icons';
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
  const [value, setValue] = useState('');
  const [isSuggestionOpen, setSuggestionOpen] = useState(false);
  const [suggestedFolks, setSuggestedFolks] = useState([]);

  const boxRef = useRef();

  const setOpen = useCallback(() => {
    setSuggestionOpen(true);
  }, [setSuggestionOpen]);

  const setClose = useCallback(() => {
    setSuggestionOpen(false);
  }, [setSuggestionOpen]);

  return (
    <Box background="dark-1" fill align="center" pad={{ top: 'large' }}>
        <Box
          ref={boxRef}
          width="large"
          direction="row"
          align="center"
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
          round="small"
          elevation={suggestionOpen ? 'medium' : undefined}
          border={{
            side: 'all',
            color: suggestionOpen ? 'transparent' : 'border',
          }}
          style={
            suggestionOpen
              ? {
                  borderBottomLeftRadius: '0px',
                  borderBottomRightRadius: '0px',
                }
              : undefined
          }
        >
          <Search color="brand" />
          <TextInput
            type="search"
            dropTarget={boxRef.current}
            plain
            value={value}
            onChange={onChange}
            onSelect={onSelect}
            suggestions={renderSuggestions()}
            placeholder="Search notedly"
            onSuggestionsOpen={setOpen}
            onSuggestionsClose={setClose}
          />
        </Box>
      </Box>
  );
};

SearchBarComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export const SearchBarComponent = withRouter(SearchBarComponent);