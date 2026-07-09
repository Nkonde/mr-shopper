import { Tabs } from 'expo-router';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

import { BrandColors, Colors } from '@/constants/theme';

const TAB_ICONS = {
  menu: '🍕',
  cart: '🛒',
  orders: '📦',
  profile: '👤',
} as const;

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 0,
          paddingBottom: 0,
          paddingTop: 0,
          height: 65,
        },
        tabBarActiveTintColor: BrandColors.bluePurple,
        tabBarInactiveTintColor: BrandColors.grey,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 600,
          marginTop: -2,
        },
        tabBarItemStyle: {
          paddingVertical: 6,
        },
      }}
    >
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Text style={[styles.iconEmoji, focused && styles.iconEmojiActive]}>
                {TAB_ICONS.menu}
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Text style={[styles.iconEmoji, focused && styles.iconEmojiActive]}>
                {TAB_ICONS.cart}
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Text style={[styles.iconEmoji, focused && styles.iconEmojiActive]}>
                {TAB_ICONS.orders}
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Text style={[styles.iconEmoji, focused && styles.iconEmojiActive]}>
                {TAB_ICONS.profile}
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: BrandColors.bluePurple + '15',
  },
  iconEmoji: {
    fontSize: 18,
    opacity: 0.55,
  },
  iconEmojiActive: {
    opacity: 1,
  },
});
