import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { colors } from '../src/theme/colors';
import { tmdb } from '../src/api/tmdb';
import { Movie } from '../types';
import HeaderSection from '../src/components/HeaderSection';




export default function HomeScreen() {
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const up = await tmdb.upcoming();
        setUpcoming(up.results || []);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentInsetAdjustmentBehavior="always">
      <HeaderSection />
      <StatusBar barStyle="light-content" />
      
    </ScrollView>
  );
}
