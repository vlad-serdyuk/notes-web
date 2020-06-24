import React, { Fragment, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { NoteForm } from '../../components/NoteForm/NoteForm';
import { CREATE_NOTE, GET_NOTES } from '../../gql/query';

const CreateNotePage = ({ history }) => {
  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
    onCompleted: data => {
      history.push(`note/${data.createNote.id}`);
    },
  });

  const onCreateNote = useCallback(({ note }) => {
    createNote({ variables: { content: note } });
  }, [createNote]);

  return (
    <Fragment>
      {loading && <p>loading...</p>}
      {error && <p>Error during saving the note</p>}
      <NoteForm submitNote={onCreateNote} />
    </Fragment>
  );
};

export default CreateNotePage;