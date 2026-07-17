import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useShop } from '@/context/shop-context';

const colors = { background: '#F8F9FD', surface: '#FFFFFF', text: '#17182C', muted: '#737789', accent: '#24A865', pale: '#EAF8F0' };

const CATEGORIES = ['All', 'Fresh', 'Dairy', 'Bakery', 'Pantry'];
const PRODUCTS = [
  { id: 'grocery-apples', name: 'Royal Gala Apples', unit: '1 kg', price: 32, emoji: '🍎', category: 'Fresh', color: '#FFEDEC' },
  { id: 'grocery-bananas', name: 'Fresh Bananas', unit: '1 kg', price: 25, emoji: '🍌', category: 'Fresh', color: '#FFF8D9' },
  { id: 'grocery-milk', name: 'Full Cream Milk', unit: '2 litre', price: 36, emoji: '🥛', category: 'Dairy', color: '#EAF4FF' },
  { id: 'grocery-eggs', name: 'Free Range Eggs', unit: '12 pack', price: 48, emoji: '🥚', category: 'Dairy', color: '#FFF5E4' },
  { id: 'grocery-bread', name: 'Brown Bread', unit: '700 g', price: 19, emoji: '🍞', category: 'Bakery', color: '#F7EEE5' },
  { id: 'grocery-rice', name: 'Long Grain Rice', unit: '2 kg', price: 55, emoji: '🍚', category: 'Pantry', color: '#F0F1F5' },
  { id: 'grocery-tomatoes', name: 'Ripe Tomatoes', unit: '1 kg', price: 28, emoji: '🍅', category: 'Fresh', color: '#FFE9E5' },
  { id: 'grocery-cheese', name: 'Cheddar Cheese', unit: '400 g', price: 72, emoji: '🧀', category: 'Dairy', color: '#FFF4D1' },
];

export default function GroceryScreen() {
  const insets = useSafeAreaInsets();
  const { cart, addToCart } = useShop();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const products = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PRODUCTS.filter((product) =>
      (category === 'All' || product.category === category) &&
      (!query || product.name.toLowerCase().includes(query))
    );
  }, [category, search]);
  const countInCart = (id: string) => cart.find((item) => item.id === id)?.quantity ?? 0;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.eyebrow}>DELIVERED TO YOUR DOOR</ThemedText>
          <ThemedText style={styles.title}>Fresh groceries</ThemedText>
        </View>
        <Pressable onPress={() => router.push('/(tabs)/cart')} style={styles.cartButton}>
          <ThemedText style={styles.cartIcon}>🛒</ThemedText>
          {!!cart.length && <View style={styles.badge}><ThemedText style={styles.badgeText}>{cart.reduce((sum, item) => sum + item.quantity, 0)}</ThemedText></View>}
        </Pressable>
      </View>

      <View style={styles.searchBox}>
        <ThemedText style={styles.searchIcon}>⌕</ThemedText>
        <TextInput value={search} onChangeText={setSearch} placeholder="Search groceries" placeholderTextColor={colors.muted} style={styles.searchInput} returnKeyType="search" />
        {!!search && <Pressable onPress={() => setSearch('')} hitSlop={10}><ThemedText style={styles.clear}>×</ThemedText></Pressable>}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
        {CATEGORIES.map((item) => (
          <Pressable key={item} onPress={() => setCategory(item)} style={[styles.category, category === item && styles.categoryActive]}>
            <ThemedText style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>{category === 'All' ? 'Popular essentials' : category}</ThemedText>
        <ThemedText style={styles.resultCount}>{products.length} products</ThemedText>
      </View>

      <View style={styles.grid}>
        {products.map((product) => {
          const quantity = countInCart(product.id);
          return (
            <View key={product.id} style={styles.card}>
              <View style={[styles.image, { backgroundColor: product.color }]}><ThemedText style={styles.emoji}>{product.emoji}</ThemedText></View>
              <View style={styles.cardBody}>
                <ThemedText style={styles.productName} numberOfLines={1}>{product.name}</ThemedText>
                <ThemedText style={styles.unit}>{product.unit}</ThemedText>
                <View style={styles.priceRow}>
                  <ThemedText style={styles.price}>R{product.price}</ThemedText>
                  <Pressable onPress={() => addToCart(product)} style={[styles.addButton, quantity > 0 && styles.addedButton]} accessibilityLabel={`Add ${product.name} to cart`}>
                    <ThemedText style={styles.addText}>{quantity || '+'}</ThemedText>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
      </View>
      {!products.length && <View style={styles.empty}><ThemedText style={styles.emptyEmoji}>🧺</ThemedText><ThemedText style={styles.emptyTitle}>Nothing found</ThemedText><ThemedText style={styles.emptyText}>Try a different product or category.</ThemedText></View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 24, gap: 22 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, eyebrow: { color: colors.accent, fontSize: 10, fontWeight: 800, letterSpacing: 1.2 }, title: { color: colors.text, fontSize: 30, lineHeight: 38, fontWeight: 800 },
  cartButton: { width: 48, height: 48, backgroundColor: colors.surface, borderRadius: 17, alignItems: 'center', justifyContent: 'center', shadowColor: '#18213A', shadowOpacity: 0.07, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 }, cartIcon: { fontSize: 21 }, badge: { position: 'absolute', top: -4, right: -4, minWidth: 20, height: 20, borderRadius: 10, paddingHorizontal: 5, backgroundColor: '#EF5350', alignItems: 'center', justifyContent: 'center' }, badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: 800 },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderRadius: 18, paddingHorizontal: 16, paddingVertical: 10, shadowColor: '#18213A', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 1 }, searchIcon: { color: colors.text, fontSize: 24 }, searchInput: { flex: 1, color: colors.text, fontSize: 15, paddingVertical: 7 }, clear: { color: colors.muted, fontSize: 24 },
  categories: { gap: 10 }, category: { backgroundColor: colors.surface, borderRadius: 14, paddingHorizontal: 17, paddingVertical: 10 }, categoryActive: { backgroundColor: colors.accent }, categoryText: { color: colors.muted, fontSize: 13, fontWeight: 700 }, categoryTextActive: { color: '#FFFFFF' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, sectionTitle: { color: colors.text, fontSize: 20, fontWeight: 800 }, resultCount: { color: colors.muted, fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 }, card: { width: '47.8%', backgroundColor: colors.surface, borderRadius: 20, overflow: 'hidden', shadowColor: '#18213A', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 2 }, image: { height: 112, alignItems: 'center', justifyContent: 'center' }, emoji: { fontSize: 48 }, cardBody: { padding: 12 }, productName: { color: colors.text, fontSize: 14, fontWeight: 800 }, unit: { color: colors.muted, fontSize: 11, marginTop: 3 }, priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }, price: { color: colors.text, fontSize: 16, fontWeight: 800 }, addButton: { width: 30, height: 30, backgroundColor: colors.accent, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }, addedButton: { backgroundColor: '#177A48' }, addText: { color: '#FFFFFF', fontSize: 17, fontWeight: 800 },
  empty: { alignItems: 'center', paddingVertical: 40 }, emptyEmoji: { fontSize: 42 }, emptyTitle: { color: colors.text, fontSize: 18, fontWeight: 800, marginTop: 10 }, emptyText: { color: colors.muted, fontSize: 13, marginTop: 4 },
});
