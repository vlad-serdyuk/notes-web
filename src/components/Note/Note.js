import React from 'react';
import ReactMarkdown from 'react-markdown';

const Note = ({ note }) => {
  return (
    <article>
      <img
        src={note.author.avatar}
        alt={note.author.username}
      />
      {note.author.username}
      {note.createdAt}
      {note.favoriteCount}
      {' '}
      <ReactMarkdown source={note.content} />
    </article>
  );
};

export default Note;