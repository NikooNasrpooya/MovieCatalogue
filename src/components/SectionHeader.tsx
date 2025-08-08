import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export default function SectionHeader({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <View style={{ marginTop: 24, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ color: colors.text, fontSize: 26, fontWeight: '400' }}>{title}</Text>
      <TouchableOpacity onPress={onPress}><Text style={{ color: colors.accent, fontSize: 16 }}>See All</Text></TouchableOpacity>
    </View>
  );
}
