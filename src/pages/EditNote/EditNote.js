import React, { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { NoteForm } from '/components/NoteForm/NoteForm';
import { GET_NOTE, GET_NOTES, GET_MY_NOTES } from '/gql/query';
import { UPDATE_NOTE } from '/gql/mutation';

const EditNotePage = ({ history, match }) => {
  const { data: noteData, loading: noteLoading, error: noteError } = useQuery(GET_NOTE, { variables: { id: match.params.id } });
  const [updateNote, { loading, error }] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      history.push(`/note/${data.updateNote.id}`);
    },
  });

  const onUpdateNote = useCallback(({ note }) => {
    updateNote({ variables: { id: noteData.note.id, content: note } });
  }, [updateNote, noteData]);

  if (loading || noteLoading) {
    return <p>loading...</p>;
  }

  if (error || noteError) {
    return <p>Error during saving the note</p>;
  }
  
  return (
    <NoteForm
      btnLabel="Update"
      content={noteData.note.content}
      submitNote={onUpdateNote}
    />
  );
};

export default EditNotePage;