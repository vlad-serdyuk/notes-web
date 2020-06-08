import React from 'react'
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

const Note = ({ note }) => {
  return (
    <article>
      <img
        src={note.author.avatar}
        alt={note.author.username}
      />
      {note.author.username}
      {format(note.createdAt, 'MMM do YYYY')}
      {note.favoriteCount}
      {' '}
      <ReactMarkdown source={note.content} />
    </article>
  );
};

export default Note;