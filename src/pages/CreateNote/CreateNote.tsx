import React, { FC, Fragment, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Note } from 'gql/models';
import { GET_NOTES } from 'gql/query';
import { CREATE_NOTE } from 'gql/mutation';
import { NoteForm } from 'common/components/NoteForm';

export const CreateNotePage: FC<RouteComponentProps> = ({ history }) => {
  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
    onCompleted: (data: { createNote: Note }) => {
      history.push(`/note/${data.createNote.id}`);
    },
  });

  const onCreateNote = useCallback(({ note, privacy }) => {
    createNote({ variables: { content: note, private: privacy } });
  }, [createNote]);

  return (
    <Fragment>
      {loading && <p>loading...</p>}
      {error && <p>Error during saving the note</p>}
      <NoteForm submitNote={onCreateNote} />
    </Fragment>
  );
};
