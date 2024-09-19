export interface Genre {
    id: number;
    name: string;
}
  
export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    genres: Genre[];
    overview: string;
    vote_average: number;
}
  