// screens/MovieDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

// 👇 type for navigation route params
type RootStackParamList = {
  MovieDetail: { movieId: number };
};

type Props = {
  route: RouteProp<RootStackParamList, 'MovieDetail'>;
};

const API_KEY = '77a7a1ad27722701cbc51092242518aa'; 

const MovieDetailScreen: React.FC<Props> = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [movieId]);

  if (loading || !movie) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
      <Text style={styles.releaseDate}>📅 {movie.release_date}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: 300,
    height: 450,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rating: {
    fontSize: 18,
    marginVertical: 8,
  },
  releaseDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    textAlign: 'justify',
  },
});

export default MovieDetailScreen;
