import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { NoteForm } from '/components/NoteForm';
import { GET_NOTES } from '/gql/query';
import { CREATE_NOTE } from '/gql/mutation';

export const CreateNotePage = ({ history }) => {
  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
    onCompleted: data => {
      history.push(`note/${data.createNote.id}`);
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

CreateNotePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};
