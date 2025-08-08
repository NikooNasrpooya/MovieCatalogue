import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { colors } from '../src/theme/colors';
import { tmdb } from '../src/api/tmdb';
import { Movie } from '../types';
import HeaderSection from '../src/components/HeaderSection';
import SearchBar from '../src/components/SearchBar';
import SectionHeader from '../src/components/SectionHeader';
import MovieCarousel from '../src/components/MovieCarousel';
import ComingSoonList from '../src/components/ComingSoonList';


export default function HomeScreen() {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const np = await tmdb.nowPlaying();
        const up = await tmdb.upcoming();
        setNowPlaying(np.results || []);
        setUpcoming(up.results || []);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentInsetAdjustmentBehavior="always">
      <StatusBar barStyle="light-content" />
      <HeaderSection />
      <SearchBar />
      <SectionHeader title="Now Playing" />
      <MovieCarousel data={nowPlaying} />
      <SectionHeader title="Cooming Soon" />
      <ComingSoonList data={upcoming.slice(0, 6)} />
    </ScrollView>
  );
}
