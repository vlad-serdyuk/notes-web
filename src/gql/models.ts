export interface Note {
  id: string;
  createdAt: string;
  content: string;
  private: boolean;
  favoriteCount: number;
  favoritedBy: Array<{
    id: string;
    username: string;
    avatar: string;
  }>
  author: {
    id: string;
    username: string;
    avatar: string;
  }
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
  author: {
    id: string;
    username: string;
    avatar: string;
  }
  favoriteCount: number;
  favoritedBy: Array<{
    id: string;
    username: string;
    avatar: string;
  }>
  createdAt: string;
}

export interface IUserWithNotes extends UserModel {
  notes: Note[];
  favorites: Note[];
}

export interface IGetMeData {
  me: UserModel
}