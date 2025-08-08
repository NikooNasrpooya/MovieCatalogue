// types.ts

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}
export type RootStackParamList = {
  Home: undefined; // No params for Home
  Movies: undefined;
  MovieDetail: { movieId: number }; // Example: MovieDetail takes movieId as param
};
