import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import { colors } from '../src/theme/colors';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

function Dummy() { return <View style={{ flex: 1, backgroundColor: colors.bg }} />; }

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.bg, borderTopColor: '#000' },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: '#777',
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="Tickets" component={Dummy} options={{ title: '' }} />
      <Tab.Screen name="Cinema" component={Dummy} options={{ title: '' }} />
      <Tab.Screen name="Profile" component={Dummy} options={{ title: '' }} />
    </Tab.Navigator>
  );
}
