import React, { FC, Fragment, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { GET_USER_NOTES, GET_ME } from '../../gql/query';
import { UPDATE_USER } from '../../gql/mutation';
import { Note as NoteModel, Me as UserModel } from '../../gql/models';
import { Profile } from '../../components/Profile';
import { NotesTabs } from '../../components/NotesTabs';
import { NoteFeed } from '../../components/NoteFeed';

interface IGetMe {
  me: UserModel;
}

export const ProfilePage: FC = () => {
  const { data: { me } = {} } = useQuery<IGetMe>(GET_ME);
  const { data: { user } = {}, loading, error } = useQuery(GET_USER_NOTES, { variables: { username: me.username } });
  
  const [updateProfile] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
  });

  const privateNotes = useMemo(() => {
    if (loading || error) {
      return [];
    }

    return user.notes.filter((note: NoteModel) => note.private);
  }, [user, loading, error]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Fragment>
      <Profile 
        user={me}
        updateProfile={updateProfile}
      />
      <NotesTabs 
        notes={<NoteFeed notes={user.notes} />}
        favorites={<NoteFeed notes={user.favorites} />}
        privates={<NoteFeed notes={privateNotes} />}
      />
    </Fragment>
  );
};
