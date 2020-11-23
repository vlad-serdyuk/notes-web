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

export interface Me {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}