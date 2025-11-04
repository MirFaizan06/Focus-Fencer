/**
 * App Navigation - Bottom tabs navigator
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {StatsScreen} from '../screens/StatsScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {SelectAppsScreen} from '../screens/SelectAppsScreen';
import {useTheme} from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const StatsStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Stats" component={StatsScreen} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="SelectApps" component={SelectAppsScreen} />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  const {colorScheme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorScheme.primary,
        tabBarInactiveTintColor: colorScheme.textSecondary,
        tabBarStyle: {
          backgroundColor: colorScheme.surface,
          borderTopColor: colorScheme.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Focus',
          tabBarIcon: ({color}) => <Text style={{fontSize: 24}}>🎯</Text>,
        }}
      />
      <Tab.Screen
        name="StatsTab"
        component={StatsStack}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({color}) => <Text style={{fontSize: 24}}>📊</Text>,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => <Text style={{fontSize: 24}}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
