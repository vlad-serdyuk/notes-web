export interface Note {
  id: string;
  createdAt: string;
  content: string;
  private: boolean;
  favoriteCount: number;
  favoritedBy: Array<Author>
  author: Author;
  comments: Array<Comment>;
}

export interface UserModel {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  noteId: string;
  content: string;
  author: Author;
  favoriteCount: number;
  favoritedBy: Array<Author>
  createdAt: string;
}

interface Author {
  id: string;
  username: string;
  avatar: string;
}

export type Entity = Note | Comment | UserModel;

export interface IUserWithNotes extends UserModel {
  notes: Note[];
  favorites: Note[];
}

export interface IGetMeData {
  me: UserModel
}