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
  Home: undefined; // 
  Movies: undefined;
  MovieDetail: { movieId: number }; // 
};
