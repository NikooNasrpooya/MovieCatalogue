import { TMDB_API_KEY } from '@env';

const BASE = 'https://api.themoviedb.org/3';
export const IMG = (path?: string | null, size: 'w185'|'w342'|'w500'|'original' = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined;

async function get(path: string) {
  const url = `${BASE}${path}${path.includes('?') ? '&' : '?'}api_key=${TMDB_API_KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('TMDB error');
  return res.json();
}

export const tmdb = {
  nowPlaying: () => get('/movie/now_playing?page=1'),
  upcoming: () => get('/movie/upcoming?page=1'),
  detail: (id: number) => get(`/movie/${id}`),
  credits: (id: number) => get(`/movie/${id}/credits`),
  videos: (id: number) => get(`/movie/${id}/videos`),
};
