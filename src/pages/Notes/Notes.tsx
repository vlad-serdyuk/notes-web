import React, { useMemo, FC, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { UPDATE_USER } from 'gql/mutation';
import { GET_USER_NOTES, GET_ME } from 'gql/query';
import { Note as NoteModel, IGetMeData, IUserWithNotes } from 'gql/models';
import { Profile } from 'components/Profile';
import { NoteFeed } from 'components/NoteFeed';
import { NotesTabs } from 'components/NotesTabs';

interface IGetUserNoteData {
  user: IUserWithNotes;
}

export const NotesPage: FC<RouteComponentProps> = ({ match }) => {
  const { loading, error, data } = useQuery<IGetUserNoteData>(GET_USER_NOTES, { variables: { username: match.params.author } });
  const { data: { me } = {} } = useQuery<IGetMeData>(GET_ME, { variables: { username: match.params.author } });
  const [updateProfile] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
  });

  const user = useMemo(() => {
    if (!data) {
      return {};
    }

    const { user } = data;
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }, [data]);

  const privateNotes = useMemo(() => {
    if (loading || error) {
      return [];
    }

    return data.user.notes.filter((note: NoteModel) => note.private);
  }, [data, loading, error]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Fragment>
      <Profile 
        user={user}
        updateProfile={updateProfile}
      />
      <NotesTabs 
        notes={<NoteFeed notes={data.user.notes} />}
        favorites={<NoteFeed notes={data.user.favorites} />}
        privates={data.user.id === me.id ? <NoteFeed notes={privateNotes} /> : null}
      />
    </Fragment>
  );
};
