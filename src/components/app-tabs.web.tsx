import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { BrandColors, Colors, MaxContentWidth, Spacing } from '@/constants/theme';

const TAB_ICONS: Record<string, string> = {
  menu: '🍕',
  cart: '🛒',
  orders: '📦',
  profile: '👤',
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
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton icon="profile">Profile</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, icon, ...props }: TabTriggerSlotProps & { icon?: string }) {
  return (
    <Pressable {...props} style={({ pressed }) => [styles.tabBtn, pressed && styles.pressed]}>
      <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
        <Text style={[styles.iconEmoji, isFocused && styles.iconEmojiActive]}>
          {icon ? TAB_ICONS[icon] : '•'}
        </Text>
      </View>
      <ThemedText
        type="small"
        style={[styles.tabLabel, { color: isFocused ? BrandColors.bluePurple : BrandColors.grey }]}
      >
        {children}
      </ThemedText>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        {props.children}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  tabBtn: {
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
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
  tabLabel: {
    fontSize: 11,
    fontWeight: 600,
  },
  pressed: {
    opacity: 0.7,
  },
});
