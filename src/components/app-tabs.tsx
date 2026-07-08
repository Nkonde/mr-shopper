import { Tabs } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.backgroundSelected,
          borderTopWidth: 1,
          paddingBottom: Spacing.one,
          paddingTop: Spacing.half,
          height: 60,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 600,
        },
      }}
    >
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
              <View style={[styles.iconDot, { backgroundColor: color }]} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
              <View style={[styles.iconDotSm, { backgroundColor: color }]} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
              <View style={[styles.iconSquare, { backgroundColor: color }]} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
              <View style={[styles.iconUser, { backgroundColor: color }]} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  iconDotSm: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  iconSquare: {
    width: 8,
    height: 8,
    borderRadius: 1,
  },
  iconUser: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: -2,
  },
});
