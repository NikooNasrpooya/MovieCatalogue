import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from './screens/MovieListScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';


type RootStackParamList = {
  Movies: undefined;
  MovieDetail: { movieId: number };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Movies">
        <Stack.Screen name="Movies" component={MovieListScreen} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
