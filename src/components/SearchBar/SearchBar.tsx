import React, { useCallback, useEffect, useState, useRef, Fragment, FC, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Search } from 'grommet-icons';
import { Box, Image, Text, TextInput } from 'grommet';

import { Note } from 'gql/models';
import { SEARCH_NOTES } from 'gql/query';

export const SearchBar: FC = () => {
  const history = useHistory();

  const [getNotes, { data }] = useLazyQuery(SEARCH_NOTES, { variables: { text: '' } });

  const [value, setValue] = useState<string>('');
  const [isSuggestionOpen, setSuggestionOpen] = useState<boolean>(false);
  const [suggestedResults, setSuggestedResults] = useState<Array<Note>>([]);

  const boxRef = useRef<HTMLElement>();

  useEffect(() => {
    if (data) {
      setSuggestedResults(data.searchNotes);
    }
  }, [data]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: text } = event.target;
    setValue(text);

    if (!text.trim()) {
      setSuggestedResults([]);
    } else {
      getNotes({ variables: { text } });
    }
  };

  const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
    history.push(`/note/${event.suggestion.value}`);
  }

  const renderSuggestions: () => Array<{ label: JSX.Element, value: string }> = () => {
    return suggestedResults
      .map(({ id, content, imageUrl }, index: number, list: []) => ({
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
    <Box
      ref={boxRef}
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
  );
};
