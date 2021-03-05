import React, { FC, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_NOTE } from 'gql/query';
import { Note as NoteModel } from 'gql/models';
import { Comments } from 'common/components/Comments';
import { Note } from 'pages/Note/components/Note';

interface IGetNoteData {
  note: NoteModel;
}

export const NotePage: FC<RouteComponentProps> = ({ match: { params: { id } } }) => {
  const { loading, error, data } = useQuery<IGetNoteData>(GET_NOTE, { variables: { id } });

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Error note not found</p>;
  }

  return (
    <Fragment>
      <Note note={data.note} />
      <Comments comments={data.note.comments} />
    </Fragment>
  );
};
