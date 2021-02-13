import React, { useCallback, useEffect, useState, useRef, FC, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { DocumentText, Chat, Search, User } from 'grommet-icons';
import { Box, Button, Text, TextInput } from 'grommet';

import { SEARCH_ALL } from 'gql/query';
import { useDebounce } from 'common/hooks/debounce';
import { encodeSearchData } from './utils';
import { SearchBarContainer } from './SearchBar.styled';

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
  const debouncedSearchTerm = useDebounce(value, 250);

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

  const onSelect = ({ suggestion: { type, id } }: ChangeEvent<HTMLInputElement>) => {
    history.push(`/${type.toLowerCase()}/${id}`);
  }

  const renderSuggestions: () => Array<{ label: JSX.Element, id: string, type: string }> = () => {
    return suggestedResults
      .map(({ id, content, type }, index: number, list: []) => {

        const Icon = TYPE_IMAGE[type];

        return {
          id,
          type,
          label: (
            <Box
              direction="row"
              align="center"
              gap="small"
              border={index < list.length - 1 ? 'bottom' : undefined}
              pad="small"
            >
              <Icon />
              <Text>{content}</Text>
            </Box>
          ),
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
    <SearchBarContainer
      ref={boxRef}
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
    </SearchBarContainer>
  );
};
