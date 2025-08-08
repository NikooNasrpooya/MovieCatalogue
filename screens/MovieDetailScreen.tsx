import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Movie } from '../types';
import { tmdb, IMG } from '../src/api/tmdb';
import { colors } from '../src/theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

export default function MovieDetailScreen({ route, navigation }: Props) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    (async () => {
      const data = await tmdb.detail(movieId);
      setMovie(data);
    })();
  }, [movieId]);

  if (!movie) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 20 }}>
        <Text style={{ color: colors.accent }}>{'← Back'}</Text>
      </TouchableOpacity>

      <Image source={{ uri: IMG(movie.poster_path, 'w500') }} style={{ width: '92%', height: 420, alignSelf: 'center', borderRadius: 24 }} />

      <View style={{ padding: 20 }}>
        <Text style={{ color: colors.text, fontSize: 26, fontWeight: '800' }}>{movie.title}</Text>
        <Text style={{ color: colors.subtext, marginTop: 6 }}>
          ⭐ {movie.vote_average?.toFixed(1)}   ·   {movie.release_date}
        </Text>
        <Text style={{ color: colors.text, marginTop: 14, lineHeight: 22 }}>
          {movie.overview}
        </Text>
      </View>
    </ScrollView>
  );
}
