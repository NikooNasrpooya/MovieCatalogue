import React from 'react';
import { View, Text, Image } from 'react-native';
import { colors } from '../theme/colors';

export default function HeaderSection() {
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View>
        <Text style={{ color: colors.subtext, fontSize: 12 }}>Welcome Nikoo👋</Text>
        <Text style={{ color: colors.text, fontWeight: '800', fontSize: 16, marginTop: 6 }}>
          Let’s relax and watch a movie.
        </Text>
      </View>
      <Image source={require('../../assets/avatar.png')} style={{ width: 44, height: 44, borderRadius: 22 }} />
    </View>
  );
}
