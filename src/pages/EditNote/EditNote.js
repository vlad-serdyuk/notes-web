import React, { Fragment, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { NoteForm } from '/components/NoteForm/NoteForm';
import { CREATE_NOTE, GET_NOTE, GET_NOTES, GET_MY_NOTES } from '/gql/query';

const EditNotePage = ({ history, match }) => {
  const { data: noteData, loading: noteLoading, error: noteError } = useQuery(GET_NOTE, { variables: { id: match.params.id } });
  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      history.push(`note/${data.createNote.id}`);
    },
  });

  const onCreateNote = useCallback(({ note }) => {
    createNote({ variables: { content: note } });
  }, [createNote]);

  return (
    <Fragment>
      {(loading || noteLoading) && <p>loading...</p>}
      {(error || noteError) && <p>Error during saving the note</p>}
      <NoteForm
        content={noteData.note}
        submitNote={onCreateNote}
      />
    </Fragment>
  );
};

export default EditNotePage;