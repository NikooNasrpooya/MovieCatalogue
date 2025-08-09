import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors } from '../src/theme/colors';
import { tmdb, IMG } from '../src/api/tmdb';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

type Credit = {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department?: string;
  job?: string;
};

function minutesToHhMm(min?: number) {
  if (!min || min <= 0) return '—';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
}

export default function MovieDetailScreen({ route, navigation }: Props) {
  const { movieId } = route.params;

  const [movie, setMovie] = useState<any>(null);
  const [credits, setCredits] = useState<{ cast: Credit[]; crew: Credit[] } | null>(null);
  const [youtubeKey, setYoutubeKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [detail, creditRes, videoRes] = await Promise.all([
          tmdb.detail(movieId),
          tmdb.credits(movieId),
          tmdb.videos(movieId),
        ]);
        if (!active) return;
        setMovie(detail);
        setCredits({ cast: creditRes.cast || [], crew: creditRes.crew || [] });
        const yt = (videoRes.results || []).find((v: any) => v.site === 'YouTube' && v.type === 'Trailer');
        setYoutubeKey(yt?.key ?? null);
      } catch (e) {
        console.log(e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [movieId]);

  const director = useMemo(() => credits?.crew?.find(c => c.job === 'Director'), [credits]);
  const year = movie?.release_date ? String(movie.release_date).slice(0, 4) : '—';
  const genres = (movie?.genres || []).map((g: any) => g.name).slice(0, 2).join(', ');
  const runtime = minutesToHhMm(movie?.runtime);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: colors.text }}>Couldn’t load movie.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
          <Text style={{ color: colors.accent }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentInsetAdjustmentBehavior="automatic">
      {/* Poster / Back / Bookmark */}
      <View>
        <Image
          source={{ uri: IMG(movie.backdrop_path || movie.poster_path, 'w500') }}
          style={{ width: '100%', height: 320 }}
          resizeMode="cover"
        />
        {/* back */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute', top: 48, left: 16,
            width: 44, height: 44, borderRadius: 22,
            backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 22 }}>{'‹'}</Text>
        </TouchableOpacity>
        {/* bookmark */}
        <View
          style={{
            position: 'absolute', top: 48, right: 16,
            width: 44, height: 44, borderRadius: 22,
            backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>🔖</Text>
        </View>
      </View>

      {/* Floating info card */}
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: '#1A1A1A',
          borderRadius: 20,
          padding: 16,
          marginTop: -36, // float over poster
          shadowColor: '#000',
          shadowOpacity: 0.35,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 6,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={{ color: colors.text, fontSize: 26, fontWeight: '800', flex: 1 }}>
            {movie.title}
          </Text>
        </View>

        <Text style={{ color: colors.subtext, marginTop: 8 }}>{year} • {genres || '—'} • {runtime}</Text>

        {/* Director row + trailer button */}
        <View style={{ flexDirection: 'row', marginTop: 14, alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: IMG(director?.profile_path, 'w185') || 'https://via.placeholder.com/64x64.png' }}
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            />
            <View>
              <Text style={{ color: colors.subtext, fontSize: 12 }}>Director</Text>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>
                {director?.name || '—'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            disabled={!youtubeKey}
            onPress={() => {
              // just open youtube in browser; you can integrate WebView later
              const url = `https://www.youtube.com/watch?v=${youtubeKey}`;
              // @ts-ignore
              Linking.openURL(url);
            }}
            style={{
              paddingVertical: 10, paddingHorizontal: 14,
              backgroundColor: '#2A2A2A', borderRadius: 12, opacity: youtubeKey ? 1 : 0.6
            }}
          >
            <Text style={{ color: colors.text }}>▶︎  Watch trailer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Synopsis */}
      <View style={{ paddingHorizontal: 16, paddingTop: 18 }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Synopsis</Text>
        <Text
          style={{ color: colors.text, marginTop: 8, lineHeight: 22 }}
          numberOfLines={expanded ? undefined : 3}
        >
          {movie.overview || 'No overview available.'}
        </Text>
        {!expanded && !!movie.overview && (
          <TouchableOpacity onPress={() => setExpanded(true)} style={{ marginTop: 6 }}>
            <Text style={{ color: colors.accent, fontWeight: '700' }}>Read More</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Cast chips */}
      <View style={{ paddingHorizontal: 16, paddingTop: 18 }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Cast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 12 }}>
          {(credits?.cast || []).slice(0, 12).map(person => (
            <View
              key={person.id}
              style={{
                backgroundColor: '#1A1A1A', paddingVertical: 10, paddingHorizontal: 12,
                borderRadius: 12, marginRight: 10, flexDirection: 'row', alignItems: 'center'
              }}
            >
              <Image
                source={{ uri: IMG(person.profile_path, 'w185') || 'https://via.placeholder.com/64x64.png' }}
                style={{ width: 32, height: 32, borderRadius: 16, marginRight: 8 }}
              />
              <Text style={{ color: colors.text, fontWeight: '700' }} numberOfLines={1}>
                {person.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Cinema section (static sample) */}
      <View style={{ paddingHorizontal: 16, paddingTop: 6, paddingBottom: 26 }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: 12 }}>Cinema</Text>

        <View style={{ borderColor: colors.accent, borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 12 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '800' }}>HARTONO MALL CGV</Text>
          <Text style={{ color: colors.subtext, marginTop: 6 }}>4.53 km · Jl. Ring Road Utara…</Text>
        </View>

        <View style={{ backgroundColor: '#1A1A1A', borderRadius: 16, padding: 14, marginBottom: 18 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '800' }}>LIPPO PLAZA JOGJA CINEPOLIS</Text>
          <Text style={{ color: colors.subtext, marginTop: 6 }}>3.12 km · Jl. Kaliurang…</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: colors.accent, borderRadius: 14, alignItems: 'center',
            justifyContent: 'center', paddingVertical: 14,
          }}
          onPress={() => {/* hook up later */}}
        >
          <Text style={{ color: '#000', fontSize: 20, fontWeight: '800' }}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
