import React, { FC, Fragment, useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

import { UPDATE_USER } from 'gql/mutation';
import { GET_USER_NOTES, GET_ME, GET_USER_COMMENTS } from 'gql/query';
import { Note as NoteModel, IUserWithNotes } from 'gql/models';
import { useGetMeQuery } from 'common/hooks/queries';
import { Profile } from 'common/components/Profile';
import { NotesTabs, TabsOptions } from 'common/components/NotesTabs';
import { NotesFeed } from 'common/components/NotesFeed';
import { Comments } from 'common/components/Comments';

interface IGetUserNoteData {
  user: IUserWithNotes;
}

export const NotesPage: FC<RouteComponentProps> = ({ match }) => {
  const { loading, error, data } = useQuery<IGetUserNoteData>(GET_USER_NOTES, { variables: { usermatch: match.params.usermatch } });
  const [getComments, { data: comments = {}, loading: commentsLoading }] = useLazyQuery(GET_USER_COMMENTS, { variables: { username: match.params.author } });
  const { data: { me } = {} } = useGetMeQuery();
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

  const tabClickHandle = useCallback((tab) => {
    if (tab === TabsOptions.Comments) {
      getComments();
    }
  }, [getComments]);

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
        notes={<NotesFeed notes={data.user.notes} />}
        favorites={<NotesFeed notes={data.user.favorites} />}
        privates={data.user.id === me.id ? <NotesFeed notes={privateNotes} /> : null}
        comments={<Comments comments={comments.userComments} />}
        onTabClick={tabClickHandle}
      />
    </Fragment>
  );
};
