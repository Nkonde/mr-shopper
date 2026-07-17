import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useShop } from '@/context/shop-context';
import { SHOPS } from '@/data/shops';

// --- Brand colors ---
const palette = {
  background: '#F8F9FD',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  cardBg: '#FFFFFF',
  cardImageBg: '#E5E7EB',
  accent: '#6366F1',
};

const CATEGORIES = [
  { id: '1', name: 'Pizza', emoji: '🍕', color: '#FFE4E1' },
  { id: '2', name: 'Burgers', emoji: '🍔', color: '#FFF3E0' },
  { id: '3', name: 'Sushi', emoji: '🍣', color: '#E8F5E9' },
  { id: '4', name: 'Pasta', emoji: '🍝', color: '#FFF8E1' },
  { id: '5', name: 'Salads', emoji: '🥗', color: '#E0F2F1' },
  { id: '6', name: 'Desserts', emoji: '🍰', color: '#FCE4EC' },
  { id: '7', name: 'Drinks', emoji: '🥤', color: '#E3F2FD' },
  { id: '8', name: 'African', emoji: '🥘', color: '#FFF3E0' },
];

export default function MenuScreen() {
  const { cart } = useShop();
  const [search, setSearch] = useState('');
  const [itemsY, setItemsY] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const bottomPad = insets.bottom + (cart.length ? 150 : 90);
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return SHOPS;
    return SHOPS.filter((shop) => `${shop.name} ${shop.cuisine}`.toLowerCase().includes(query));
  }, [search]);

  return (
    <View style={styles.screen}>
    <ScrollView
      ref={scrollRef}
      style={[styles.scrollView, { backgroundColor: palette.background }]}
      contentContainerStyle={{ paddingBottom: bottomPad }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={[styles.avatar, { backgroundColor: palette.accent }]}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <ThemedText style={styles.avatarText}>TN</ThemedText>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
          style={[styles.searchBar, { backgroundColor: palette.cardBg }]}
        >
          <ThemedText style={styles.searchIcon}>⌕</ThemedText>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search shops or cuisines"
            placeholderTextColor={palette.textSecondary}
            style={styles.searchInput}
            returnKeyType="search"
            autoCorrect={false}
            clearButtonMode="while-editing"
            accessibilityLabel="Search shops"
          />
          {!!search && (
            <Pressable
              onPress={() => setSearch('')}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              style={styles.clearButton}
            >
              <ThemedText style={styles.clearText}>×</ThemedText>
            </Pressable>
          )}
        </View>

        <View style={styles.promo}>
          <View style={styles.promoCopy}>
            <ThemedText style={styles.promoEyebrow}>TODAY'S SPECIAL</ThemedText>
            <ThemedText style={styles.promoTitle}>Free delivery on your first order</ThemedText>
            <Pressable
              style={styles.promoButton}
              onPress={() => scrollRef.current?.scrollTo({ y: Math.max(itemsY - 20, 0), animated: true })}
              accessibilityRole="button"
              accessibilityLabel="Scroll to popular items"
            >
              <ThemedText style={styles.promoButtonText}>Order now  →</ThemedText>
            </Pressable>
          </View>
          <ThemedText style={styles.promoEmoji}>🛵</ThemedText>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: palette.text }]}>
            Categories
          </ThemedText>
          <Pressable>
            <ThemedText style={{ color: palette.accent, fontWeight: 700, fontSize: 13 }}>
              See All
            </ThemedText>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesRow}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((cat) => (
            <Pressable key={cat.id} style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
                <ThemedText style={styles.categoryEmoji}>{cat.emoji}</ThemedText>
              </View>
              <ThemedText style={[styles.categoryName, { color: palette.text }]}>
                {cat.name}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>

        {/* Popular Items */}
        <View
          style={styles.sectionHeader}
          onLayout={(event) => setItemsY(event.nativeEvent.layout.y)}
        >
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: palette.text }]}>
            {search ? 'Search Results' : 'Popular Shops Near You'}
          </ThemedText>
          <Pressable>
            <ThemedText style={{ color: palette.accent, fontWeight: 700, fontSize: 13 }}>
              See All
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.popularGrid}>
          {filteredItems.map((shop) => {
            return (
            <Pressable
              key={shop.id}
              style={[styles.popularCard, { backgroundColor: palette.cardBg }]}
              onPress={() => router.push({ pathname: '/shop/[id]', params: { id: shop.id } })}
              accessibilityRole="button"
              accessibilityLabel={`Open ${shop.name} menu`}
            >
              <View
                style={[styles.popularImage, { backgroundColor: shop.color }]}
              >
                <ThemedText style={styles.popularEmoji}>{shop.emoji}</ThemedText>
                <View style={styles.ratingPill}><ThemedText style={styles.ratingText}>★ {shop.rating}</ThemedText></View>
              </View>
              <View style={styles.popularInfo}>
                <ThemedText style={[styles.itemName, { color: palette.text }]} numberOfLines={1}>
                  {shop.name}
                </ThemedText>
                <ThemedText style={[styles.itemMeta, { color: palette.textSecondary }]}>
                  {shop.cuisine}
                </ThemedText>
                <View style={styles.priceRow}>
                  <ThemedText style={styles.shopDelivery}>{shop.time}</ThemedText>
                  <ThemedText style={styles.shopArrow}>→</ThemedText>
                </View>
              </View>
            </Pressable>
          );})}
          {!filteredItems.length && (
            <View style={styles.noResults}>
              <ThemedText style={styles.noResultsEmoji}>🔎</ThemedText>
              <ThemedText style={styles.noResultsTitle}>No shops found</ThemedText>
              <ThemedText style={styles.noResultsText}>Try another shop name or cuisine.</ThemedText>
              <Pressable onPress={() => setSearch('')} style={styles.resetButton}>
                <ThemedText style={styles.resetButtonText}>Clear search</ThemedText>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
    {!!cart.length && (
      <Pressable
        onPress={() => router.push('/(tabs)/cart')}
        style={[styles.cartToast, { bottom: insets.bottom + 84 }]}
        accessibilityRole="button"
        accessibilityLabel="View cart"
      >
        <View>
          <ThemedText style={styles.cartToastText}>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</ThemedText>
        </View>
        <ThemedText style={styles.cartToastText}>View cart  →</ThemedText>
      </Pressable>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.background },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: Spacing.four,
    gap: 20,
    paddingTop: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 16,
  },
  searchBar: {
    paddingVertical: 10,
    paddingHorizontal: Spacing.three,
    borderRadius: 18,
    flexDirection: 'row', alignItems: 'center', gap: 10,
    shadowColor: '#18213A', shadowOpacity: 0.06, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 2,
  },
  searchIcon: { fontSize: 25, color: palette.text },
  searchInput: { flex: 1, color: palette.text, fontSize: 15, paddingVertical: 7 },
  clearButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EEF0F4', alignItems: 'center', justifyContent: 'center' },
  clearText: { color: palette.textSecondary, fontSize: 22, lineHeight: 24 },
  filter: { width: 34, height: 34, borderRadius: 12, backgroundColor: '#EEF0FF', alignItems: 'center', justifyContent: 'center' },
  filterText: { color: palette.accent, fontSize: 18 },
  promo: { minHeight: 152, borderRadius: 24, backgroundColor: '#25265E', padding: 20, flexDirection: 'row', overflow: 'hidden' },
  promoCopy: { flex: 1, gap: 8 }, promoEyebrow: { color: '#B8BAFF', fontSize: 10, fontWeight: 800, letterSpacing: 1.2 },
  promoTitle: { color: '#FFFFFF', fontSize: 20, lineHeight: 26, fontWeight: 800 },
  promoButton: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  promoButtonText: { color: '#25265E', fontSize: 12, fontWeight: 800 }, promoEmoji: { fontSize: 58, alignSelf: 'center' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 600,
  },
  categoriesRow: {
    marginHorizontal: -Spacing.four,
    paddingHorizontal: Spacing.four,
  },
  categoriesContent: {
    gap: Spacing.three,
  },
  categoryCard: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  categoryIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontWeight: 600,
    fontSize: 14,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  popularCard: {
    width: '47.5%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#18213A', shadowOpacity: 0.07, shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 2,
  },
  popularImage: {
    height: 118,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularEmoji: {
    fontSize: 48,
  },
  ratingPill: { position: 'absolute', left: 8, top: 8, backgroundColor: '#FFFFFF', paddingHorizontal: 7, paddingVertical: 4, borderRadius: 10 },
  ratingText: { fontSize: 10, fontWeight: 800, color: '#F59E0B' },
  popularInfo: {
    padding: Spacing.two,
    gap: Spacing.half,
  },
  itemName: {
    fontWeight: 700,
    fontSize: 14,
  },
  itemMeta: {
    fontSize: 12,
    lineHeight: 16,
  },
  itemPrice: { fontWeight: 800, fontSize: 16 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  shopDelivery: { color: palette.textSecondary, fontSize: 11, fontWeight: 700 },
  shopArrow: { color: palette.accent, fontSize: 18, fontWeight: 800 },
  addButton: { width: 28, height: 28, borderRadius: 10, backgroundColor: palette.accent, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#FFFFFF', fontSize: 20, fontWeight: 700, lineHeight: 22 }, pressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  addedPill: { width: 30, height: 30, backgroundColor: '#FEECEC', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  trashIcon: { width: 14, height: 17, alignItems: 'center' },
  trashLid: { width: 14, height: 2, borderRadius: 1, backgroundColor: '#DC2626', marginBottom: 2 },
  trashBody: { width: 10, height: 12, borderWidth: 2, borderTopWidth: 0, borderColor: '#DC2626', borderBottomLeftRadius: 2, borderBottomRightRadius: 2 },
  cartToast: { position: 'absolute', left: 24, right: 24, backgroundColor: '#25265E', borderRadius: 18, paddingHorizontal: 18, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#11123D', shadowOpacity: 0.25, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 10 },
  cartToastText: { color: '#FFFFFF', fontWeight: 800, fontSize: 13 },
  noResults: { width: '100%', alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20 },
  noResultsEmoji: { fontSize: 38, marginBottom: 12 },
  noResultsTitle: { color: palette.text, fontSize: 18, fontWeight: 800 },
  noResultsText: { color: palette.textSecondary, fontSize: 13, textAlign: 'center', marginTop: 6 },
  resetButton: { marginTop: 16, backgroundColor: '#EEF0FF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  resetButtonText: { color: palette.accent, fontSize: 13, fontWeight: 800 },
});
