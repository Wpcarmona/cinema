import axios from 'axios';
import { Movie, MovieResponse } from '../types/movieTypes';
import { AuthResponse, CreateUserRequest, LogoutResponse, UserDeleteResponse, UserResponse, UsersResponse, UserUpdateRequest, UserUpdateResponse } from '../types/authType';
import { AddFavoriteRequest, AddFavoriteResponse, DeleteFavoriteResponse, GetFavoritesResponse } from '@/types/FavoriteType';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; 

const BACKEND_BASE_URL = 'https://backend-cinema-ldnr.onrender.com/cinema';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    Accept: 'application/json'
  },
  params: {
    language: 'en-EN'
  },
});

const authApi = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getMoviesByPath = async (page: number, path: string): Promise<MovieResponse> => {
  try {
    const response = await api.get(`/movie/${path}`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};


export const getMovieDetails = async (id: string): Promise<Movie> => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ${id}:`, error);
    throw error;
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching for movies:', error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await authApi.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const createUser = async (data: CreateUserRequest): Promise<AuthResponse> => {
  try {
    const response = await authApi.post('/usuarios', data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  try {
    const response = await authApi.post<LogoutResponse>('/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.header[0].code === 200) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } else {
      console.error('Logout failed:', response.data.header[0].message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const getUsers = async (): Promise<UsersResponse> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in local storage');
  }

  try {
    const response = await authApi.get('/cinema/usuarios', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (userId: string): Promise<UserResponse> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  try {
    const response = await authApi.get<UserResponse>(`/usuarios/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};


export const updateUser = async (id: string, data: Partial<UserUpdateRequest>): Promise<UserUpdateResponse> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  try {
    const response = await authApi.put<UserUpdateResponse>(`/usuarios/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<UserDeleteResponse> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  try {
    const response = await authApi.delete<UserDeleteResponse>(`/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const addFavorite = async (data: AddFavoriteRequest): Promise<AddFavoriteResponse> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  try {
    const response = await authApi.post<AddFavoriteResponse>('/favorite', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const getFavoritesByUser = async (): Promise<GetFavoritesResponse> => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  if (!user) {
    throw new Error('No user found in localStorage');
  }

  const userId = JSON.parse(user).uid;

  try {
    const response = await authApi.get<GetFavoritesResponse>(`/favorite/usuario/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    throw error;
  }
};


export const deleteFavoriteById = async (favoriteId: string): Promise<DeleteFavoriteResponse> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  try {
    const response = await authApi.delete<DeleteFavoriteResponse>(`/favorite/${favoriteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting favorite:', error);
    throw error;
  }
};