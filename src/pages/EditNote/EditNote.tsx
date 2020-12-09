import React, { FC, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { NoteForm, ISubmitNoteArgs } from '../../components/NoteForm';
import { GET_NOTE, GET_NOTES } from '../../gql/query';
import { UPDATE_NOTE } from '../../gql/mutation';
import { Note } from '../../gql/models';

interface NoteData {
  note: Note;
}

interface NoteVars {
  id: any;
}

export const EditNotePage: FC<RouteComponentProps> = ({ history, match }) => {
  const { data: noteData, loading: noteLoading, error: noteError } = useQuery<NoteData, NoteVars>(GET_NOTE, { variables: { id: match.params.id } });
  const [updateNote, { loading, error }] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
    onCompleted: (data: { updateNote: Note }) => {
      history.push(`/note/${data.updateNote.id}`);
    },
  });

  const onUpdateNote = useCallback(({ note, privacy }: ISubmitNoteArgs) => {
    updateNote({ variables: { id: noteData.note.id, content: note, private: privacy } });
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
