import React, { useState, useCallback, useRef, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { Search } from 'grommet-icons';
import { Box, Image, Text, TextInput } from 'grommet';

import { SEARCH_NOTES } from '/gql/query';

const SearchBarComponent = ({ history }) => {
  const [getNotes, { loading, data }] = useLazyQuery(SEARCH_NOTES, { variables: { text: '' } });

  const [value, setValue] = useState('');
  const [isSuggestionOpen, setSuggestionOpen] = useState(false);
  const [suggestedResults, setSuggestedResults] = useState([]);

  const boxRef = useRef();

  const onChange = event => {
    const { value: text } = event.target;
    setValue(text);

    if (!text.trim()) {
      setSuggestedResults([]);
    } else {
      getNotes({ variables: { text } });
      // simulate an async call to the backend
      // setTimeout(() => setSuggestedResults([{ name: 'abc' }, { name: 'abcccc' }]), 300);
    }
  };

  const onSelect = event => setValue(event.suggestion.value);

  const renderSuggestions = () => {
    return suggestedResults
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

  const setOpen = useCallback(() => {
    setSuggestionOpen(true);
  }, [setSuggestionOpen]);

  const setClose = useCallback(() => {
    setSuggestionOpen(false);
  }, [setSuggestionOpen]);

  return (
    <Fragment>
      <Box
        ref={boxRef}
        width="large"
        direction="row"
        align="center"
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
        round="small"
        elevation={isSuggestionOpen ? 'medium' : null}
        border={{
          side: 'all',
          color: isSuggestionOpen ? 'transparent' : 'border',
        }}
        style={
          isSuggestionOpen
            ? {
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
              }
            : null
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
          placeholder="Search notes"
          onSuggestionsOpen={setOpen}
          onSuggestionsClose={setClose}
        />
      </Box>
    </Fragment>
  );
};

SearchBarComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export const SearchBar = withRouter(SearchBarComponent);