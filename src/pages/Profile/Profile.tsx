import React, { FC, Fragment, useCallback, useMemo } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

import { UPDATE_USER } from 'gql/mutation';
import { GET_USER_NOTES, GET_USER_COMMENTS, GET_ME } from 'gql/query';
import { Note as NoteModel } from 'gql/models';
import { useGetMeQuery } from 'common/hooks/queries';
import { Comments } from 'components/Comments';
import { Profile } from 'components/Profile';
import { NotesFeed } from 'components/NotesFeed';
import { NotesTabs, TabsOptions } from 'components/NotesTabs';

export const ProfilePage: FC = () => {
  const { data: { me } = {} } = useGetMeQuery();
  const { data: { user } = {}, loading, error } = useQuery(GET_USER_NOTES, { variables: { username: me.username } });
  const [getComments, { data = {}, loading: commentsLoading }] = useLazyQuery(GET_USER_COMMENTS, { variables: { username: me.username } });
  
  const [updateProfile] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
  });

  const privateNotes = useMemo(() => {
    if (loading || error) {
      return [];
    }

    return user.notes.filter((note: NoteModel) => note.private);
  }, [user, loading, error]);

  const tabClickHandle = useCallback((tab) => {
    if (tab === TabsOptions.Comments) {
      getComments();
    }
  }, [getComments]);

  if (loading || commentsLoading) {
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
        notes={<NotesFeed notes={user.notes} />}
        favorites={<NotesFeed notes={user.favorites} />}
        privates={<NotesFeed notes={privateNotes} />}
        comments={<Comments comments={data.userComments} />}
        onTabClick={tabClickHandle}
      />
    </Fragment>
  );
};
