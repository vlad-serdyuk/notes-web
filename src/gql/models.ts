export interface Note {
  id: string;
  createdAt: string;
  content: string;
  private: boolean;
  favoriteCount: number;
  favoritedBy: {
    id: string;
    username: string;
  }
  author: {
    id: string;
    username: string;
    avatar: string;
  }
}

export interface UserModel {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface IUserWithNotes extends UserModel {
  notes: Note[];
  favorites: Note[];
}

export interface IGetMeData {
  me: UserModel
}