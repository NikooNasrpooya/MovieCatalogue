import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Movie } from '../../types';
import { IMG } from '../api/tmdb';
import { colors } from '../theme/colors';

export default function ComingSoonList({ data }: { data: Movie[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(m) => String(m.id)}
      scrollEnabled={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
      ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      renderItem={({ item }) => (
        <View style={{
          backgroundColor: colors.card, borderRadius: 16,
          padding: 12, flexDirection: 'row', alignItems: 'center'
        }}>
          <Image
            source={{ uri: IMG(item.poster_path, 'w185') }}
            style={{ width: 64, height: 64, borderRadius: 12, marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={{ color: colors.text, fontSize: 20, fontWeight: '700' }}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.subtext, marginTop: 6 }}>
              Action, Adventure, Comedy
            </Text>
          </View>
        </View>
      )}
    />
  );
}
