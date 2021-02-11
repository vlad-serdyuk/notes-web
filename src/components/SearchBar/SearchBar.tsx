import React, { useCallback, useEffect, useState, useRef, FC, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { DocumentText, Chat, Search, User } from 'grommet-icons';
import { Box, Button, Text, TextInput } from 'grommet';

import { Entity } from 'gql/models';
import { SEARCH_ALL } from 'gql/query';
import { useDebounce } from 'common/hooks/debounce';
import { encodeSearchData } from './utils';

export interface ISearchDataItem {
  id: string;
  type: Typename;
  content: string;
}

enum Typename {
  NOTE = 'Note',
  COMMENT = 'Comment',
  USER = 'User',
}

const TYPE_IMAGE = {
  [Typename.NOTE]: DocumentText,
  [Typename.COMMENT]: Chat,
  [Typename.USER]: User,
}

export const SearchBar: FC = () => {
  const history = useHistory();

  const [value, setValue] = useState<string>('');
  const [isSuggestionOpen, setSuggestionOpen] = useState<boolean>(false);
  const [suggestedResults, setSuggestedResults] = useState<Array<ISearchDataItem>>([]);

  const [search, { data }] = useLazyQuery(SEARCH_ALL);
  const debouncedSearchTerm = useDebounce(value, 300);

  const boxRef = useRef<HTMLElement>();

  useEffect(() => {
    if (data) {
      const encodedData = encodeSearchData(data.search);
      setSuggestedResults(encodedData);
    }
  }, [data]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: text } = event.target;
    setValue(text);

    if (!text.trim()) {
      setSuggestedResults([]);
    } else if (debouncedSearchTerm) {
      search({ variables: { text } });
    }
  };

  const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
    history.push(`/note/${event.suggestion.value}`);
  }

  const renderSuggestions: () => Array<{ label: JSX.Element, value: string }> = () => {
    return suggestedResults
      .map(({ id, content, type }, index: number, list: []) => {

        const Icon = TYPE_IMAGE[type];

        return {
          label: (
            <Box
              direction="row"
              align="center"
              gap="small"
              border={index < list.length - 1 ? 'bottom' : undefined}
              pad="small"
            >
              <Button icon={<Icon />} />
              <Text>
                <strong>{content}</strong>
              </Text>
            </Box>
          ),
          value: id,
        }
      });
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
