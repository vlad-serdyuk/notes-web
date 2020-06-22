import React, { Fragment, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';

import { NoteForm } from '../../components/NoteForm/NoteForm';

const CreateNotePage = ({ history }) => {
  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    onCompleted: data => {
      history.push(`note/${data.newNote.id}`);
    },
  });

  const onCreateNote = useCallback(({ note }) => {
    createNote({ variables: { content: note } });
  }, [createNote]);

  return (
    <Fragment>
      <NoteForm submitNote={onCreateNote} />
    </Fragment>
  );
};

const CREATE_NOTE = gql`
  mutation createNote($content: String!) {
    createNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

export default CreateNotePage;