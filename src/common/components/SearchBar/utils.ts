import { Entity } from 'gql/models';
import { ISearchDataItem } from './SearchBar';

export function encodeSearchData(data: Array<Entity>): Array<ISearchDataItem> {
  return data.map(({ id, __typename, content, username, noteId }) => {
    return {
      id,
      noteId,
      type: __typename,
      content: content || username,
    }
  });
 }