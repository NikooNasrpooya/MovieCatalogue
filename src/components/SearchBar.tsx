import React from 'react';
import { View, TextInput } from 'react-native';
import { colors } from '../theme/colors';

export default function SearchBar() {
  return (
    <View style={{
      marginHorizontal: 20, marginTop: 16,
      backgroundColor: colors.input, borderRadius: 16,
      height: 56, paddingHorizontal: 16, justifyContent: 'center', borderWidth: 1, borderColor: colors.border
    }}>
      <TextInput
        placeholder="Search movie, cinema, genre..."
        placeholderTextColor="#8A8A8A"
        style={{ color: colors.text, fontSize: 16 }}
      />
    </View>
  );
}
