import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { BrandColors, Colors } from '@/constants/theme';

const TAB_ICONS = {
  menu: '🍕',
  grocery: '🧺',
  cart: '🛒',
  orders: '📦',
} as const;

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          paddingBottom: 0,
          paddingTop: 0,
          height: 78,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.08,
              shadowRadius: 18,
            },
            android: {
              elevation: 16,
            },
          }),
        },
        tabBarActiveTintColor: BrandColors.bluePurple,
        tabBarInactiveTintColor: BrandColors.grey,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 600,
          marginTop: -2,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <View style={[styles.iconRing, focused && styles.iconRingActive]}>
                <Text style={[styles.iconEmoji, focused && styles.iconEmojiActive]}>
                  {TAB_ICONS.menu}
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="grocery"
        options={{
          title: 'Grocery',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrap}><View style={[styles.iconRing, focused && styles.iconRingActive]}><Text style={[styles.iconEmoji, focused && styles.iconEmojiActive]}>{TAB_ICONS.grocery}</Text></View></View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <View style={[styles.iconRing, focused && styles.iconRingActive]}>
                <Text style={[styles.iconEmoji, focused && styles.iconEmojiActive]}>
                  {TAB_ICONS.cart}
                </Text>
              </View>
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
              <View style={[styles.iconRing, focused && styles.iconRingActive]}>
                <Text style={[styles.iconEmoji, focused && styles.iconEmojiActive]}>
                  {TAB_ICONS.orders}
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {},
  iconRing: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRingActive: {
    backgroundColor: BrandColors.bluePurple,
  },
  iconEmoji: {
    fontSize: 20,
    opacity: 0.5,
  },
  iconEmojiActive: {
    opacity: 1,
    transform: [{ scale: 0.9 }],
  },
});
