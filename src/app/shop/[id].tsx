import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useShop } from '@/context/shop-context';
import { getShop } from '@/data/shops';

const colors = { bg: '#F8F9FD', surface: '#FFFFFF', text: '#17182C', muted: '#747789', accent: '#6366F1', red: '#DC2626' };

export default function ShopScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const shop = getShop(id);
  const insets = useSafeAreaInsets();
  const { cart, addToCart, changeQuantity } = useShop();
  const [search, setSearch] = useState('');
  const items = useMemo(() => shop?.menu.filter((item) => item.name.toLowerCase().includes(search.trim().toLowerCase())) ?? [], [search, shop]);

  if (!shop) return <View style={styles.center}><ThemedText style={styles.title}>Shop not found</ThemedText><Pressable onPress={() => router.back()}><ThemedText style={styles.link}>Go back</ThemedText></Pressable></View>;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + (cart.length ? 110 : 30) }} keyboardShouldPersistTaps="handled">
        <View style={[styles.hero, { backgroundColor: shop.color, paddingTop: insets.top + 12 }]}>
          <Pressable onPress={() => router.back()} style={styles.back}><ThemedText style={styles.backText}>‹</ThemedText></Pressable>
          <ThemedText style={styles.heroEmoji}>{shop.emoji}</ThemedText>
        </View>
        <View style={styles.content}>
          <ThemedText style={styles.title}>{shop.name}</ThemedText>
          <ThemedText style={styles.cuisine}>{shop.cuisine}</ThemedText>
          <View style={styles.meta}><ThemedText style={styles.metaText}>★ {shop.rating}</ThemedText><ThemedText style={styles.metaText}>• {shop.time}</ThemedText><ThemedText style={styles.metaText}>• {shop.delivery}</ThemedText></View>
          <View style={styles.search}><ThemedText style={styles.searchIcon}>⌕</ThemedText><TextInput value={search} onChangeText={setSearch} placeholder={`Search ${shop.name}`} placeholderTextColor={colors.muted} style={styles.searchInput} /></View>
          <ThemedText style={styles.menuTitle}>Menu</ThemedText>
          <View style={styles.list}>
            {items.map((item) => {
              const cartItem = cart.find((entry) => entry.id === item.id);
              return <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemImage}><ThemedText style={styles.itemEmoji}>{item.emoji}</ThemedText></View>
                <View style={styles.itemInfo}><ThemedText style={styles.itemName}>{item.name}</ThemedText><ThemedText style={styles.description} numberOfLines={2}>{item.description}</ThemedText><ThemedText style={styles.price}>R{item.price}</ThemedText></View>
                {cartItem ? <Pressable onPress={() => changeQuantity(item.id, -cartItem.quantity)} style={styles.remove}><ThemedText style={styles.removeText}>Remove</ThemedText></Pressable> : <Pressable onPress={() => addToCart(item)} style={styles.add}><ThemedText style={styles.addText}>+</ThemedText></Pressable>}
              </View>;
            })}
          </View>
        </View>
      </ScrollView>
      {!!cart.length && <Pressable onPress={() => router.push('/(tabs)/cart')} style={[styles.cartBar, { bottom: insets.bottom + 12 }]}><ThemedText style={styles.cartText}>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</ThemedText><ThemedText style={styles.cartText}>View cart →</ThemedText></Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: colors.bg }, link: { color: colors.accent, fontWeight: 800 },
  hero: { height: 220, alignItems: 'center', justifyContent: 'center' }, heroEmoji: { fontSize: 92 }, back: { position: 'absolute', left: 20, top: 54, width: 42, height: 42, borderRadius: 15, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }, backText: { color: colors.text, fontSize: 34, lineHeight: 36 },
  content: { padding: 24, gap: 8 }, title: { color: colors.text, fontSize: 29, lineHeight: 36, fontWeight: 800 }, cuisine: { color: colors.muted, fontSize: 14 }, meta: { flexDirection: 'row', gap: 7 }, metaText: { color: colors.text, fontSize: 12, fontWeight: 700 },
  search: { marginTop: 16, backgroundColor: colors.surface, borderRadius: 18, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10 }, searchIcon: { fontSize: 24, color: colors.text }, searchInput: { flex: 1, paddingVertical: 16, color: colors.text, fontSize: 14 }, menuTitle: { color: colors.text, fontSize: 21, fontWeight: 800, marginTop: 14 }, list: { gap: 12 },
  itemCard: { backgroundColor: colors.surface, borderRadius: 18, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }, itemImage: { width: 72, height: 72, borderRadius: 16, backgroundColor: '#F3F4F8', alignItems: 'center', justifyContent: 'center' }, itemEmoji: { fontSize: 35 }, itemInfo: { flex: 1, gap: 3 }, itemName: { color: colors.text, fontSize: 14, fontWeight: 800 }, description: { color: colors.muted, fontSize: 11, lineHeight: 15 }, price: { color: colors.text, fontSize: 14, fontWeight: 800 },
  add: { width: 32, height: 32, borderRadius: 11, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }, addText: { color: '#FFFFFF', fontSize: 21, fontWeight: 800 }, remove: { paddingHorizontal: 8, paddingVertical: 7, borderRadius: 9, backgroundColor: '#FEECEC' }, removeText: { color: colors.red, fontSize: 9, fontWeight: 800 },
  cartBar: { position: 'absolute', left: 24, right: 24, backgroundColor: '#25265E', borderRadius: 18, padding: 17, flexDirection: 'row', justifyContent: 'space-between' }, cartText: { color: '#FFFFFF', fontSize: 13, fontWeight: 800 },
});
