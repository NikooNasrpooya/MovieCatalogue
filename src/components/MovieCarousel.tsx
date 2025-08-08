import React, { useMemo } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Movie } from '../../types';
import { IMG } from '../api/tmdb';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_W = width * 0.72;

export default function MovieCarousel({ data }: { data: Movie[] }) {
  const nav = useNavigation<any>();
  const dots = useMemo(() => new Array(Math.min(5, data.length)).fill(0), [data.length]);

  return (
    <View style={{ marginTop: 16 }}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(m) => String(m.id)}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_W + 20}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => nav.navigate('MovieDetail', { movieId: item.id })}>
            <View style={{
              width: CARD_W, borderRadius: 24, overflow: 'hidden',
              backgroundColor: colors.card
            }}>
              <Image
                source={{ uri: IMG(item.poster_path, 'w500') }}
                style={{ width: CARD_W, height: CARD_W * 1.35 }}
              />
            </View>
            <Text numberOfLines={1} style={{ color: colors.text, fontSize: 22, fontWeight: '800', marginTop: 12, width: CARD_W }}>
              {item.title}
            </Text>
            <Text style={{ color: colors.subtext, fontSize: 16, marginTop: 4 }}>Adventure</Text>
          </TouchableOpacity>
        )}
      />
      {/* pagination dots (static look) */}
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 12, gap: 8 }}>
        {dots.map((_, i) => (
          <View key={i} style={{
            width: i === 1 ? 20 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: i === 1 ? colors.accent : '#3a3a3a'
          }} />
        ))}
      </View>
    </View>
  );
}
