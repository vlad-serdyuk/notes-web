import React, { useCallback, useEffect, useState, useRef, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { Search } from 'grommet-icons';
import { Box, Image, Text, TextInput } from 'grommet';

import { SEARCH_NOTES } from '../../gql/query';

const SearchBarComponent = ({ history }) => {
  const [getNotes, { loading, data }] = useLazyQuery(SEARCH_NOTES, { variables: { text: '' } });

  const [value, setValue] = useState('');
  const [isSuggestionOpen, setSuggestionOpen] = useState(false);
  const [suggestedResults, setSuggestedResults] = useState([]);

  const boxRef = useRef();

  useEffect(() => {
    if (data) {
      setSuggestedResults(data.searchNotes); 
    }
  }, [data]);

  const onChange = event => {
    const { value: text } = event.target;
    setValue(text);

    if (!text.trim()) {
      setSuggestedResults([]);
    } else {
      getNotes({ variables: { text } });
    }
  };

  const onSelect = event => {
    history.push(`/note/${event.suggestion.value}`);
  }

  const renderSuggestions = () => {
    return suggestedResults
      .map(({ id, content, imageUrl }, index, list) => ({
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
              <strong>{content}</strong>
            </Text>
          </Box>
        ),
        value: id,
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