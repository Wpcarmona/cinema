export interface AddFavoriteRequest {
  userId: string;
  favoriteId: string;
  type: string;
}

export interface AddFavoriteResponse {
  header: [
    {
      error: string;
      code: number;
    }
  ];
  body: {
    user: string;
    favoriteId: string;
    type: string;
    createdAt: string;
    uid: string;
  };
}

export interface GetFavoritesResponse {
  header: [
    {
      error: string;
      code: number;
    }
  ];
  body: Favorite[];
}

export interface Favorite {
  user: string;
  favoriteId: string;
  type: string;
  createdAt: string;
  uid: string;
}
export interface DeleteFavoriteResponse {
  header: [
    {
      error: string;
      code: number;
    }
  ];
  body: {
    message: string;
  };
}
