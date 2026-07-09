import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from './themed-text';

import { BrandColors, Spacing } from '@/constants/theme';

const TAB_ICONS: Record<string, string> = {
  menu: '🍕',
  cart: '🛒',
  orders: '📦',
};

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="menu" href="/menu" asChild>
            <TabButton icon="menu">Menu</TabButton>
          </TabTrigger>
          <TabTrigger name="cart" href="/cart" asChild>
            <TabButton icon="cart">Cart</TabButton>
          </TabTrigger>
          <TabTrigger name="orders" href="/orders" asChild>
            <TabButton icon="orders">Orders</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, icon, ...props }: TabTriggerSlotProps & { icon?: string }) {
  return (
    <Pressable {...props} style={({ pressed }) => [styles.tabBtn, pressed && styles.pressed]}>
      <View style={[styles.iconRing, isFocused && styles.iconRingActive]}>
        <Text style={[styles.iconEmoji, isFocused && styles.iconEmojiActive]}>
          {icon ? TAB_ICONS[icon] : '•'}
        </Text>
      </View>
      <ThemedText
        type="small"
        style={[styles.tabLabel, { color: isFocused ? '#818CF8' : '#9CA3AF' }]}
      >
        {children}
      </ThemedText>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <View style={styles.innerContainer}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    paddingTop: Spacing.two,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    backgroundColor: '#2D2D2D',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
    maxWidth: 400,
    width: '100%',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(18px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
        boxShadow: '0 -6px 24px rgba(0,0,0,0.12)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.18,
        shadowRadius: 20,
      },
    }),
  },
  tabBtn: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: Spacing.two,
  },
  iconRing: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRingActive: {
    backgroundColor: BrandColors.bluePurple + '18',
  },
  iconEmoji: {
    fontSize: 20,
    opacity: 0.7,
  },
  iconEmojiActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: 600,
  },
  pressed: {
    opacity: 0.7,
  },
});

