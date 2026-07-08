import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

// --- Responsive helpers ---
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallPhone = SCREEN_WIDTH < 376;

// --- Brand colors (hardcoded so background stays white regardless of theme) ---
const palette = {
  background: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  cardBg: '#F3F4F6',
  cardImageBg: '#E5E7EB',
  accent: '#6366F1',
};

// --- Responsive size map ---
const s = {
  catIcon: isSmallPhone ? 52 : 64,
  catIconR: isSmallPhone ? 26 : 32,
  catEmoji: isSmallPhone ? 22 : 28,
  catFont: isSmallPhone ? 12 : 14,
  popularImgH: isSmallPhone ? 85 : 100,
  popularMinW: isSmallPhone ? '100%' : '45%' as any,
  catMarginR: isSmallPhone ? Spacing.two : Spacing.three,
  padH: isSmallPhone ? Spacing.three : Spacing.four,
};

// --- Mock menu data ---
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

const POPULAR_ITEMS = [
  { id: '1', name: 'Margherita Pizza', price: 'R85', rating: 4.8, time: '25-35 min' },
  { id: '2', name: 'Beef Burger', price: 'R65', rating: 4.6, time: '15-20 min' },
  { id: '3', name: 'Chicken Wrap', price: 'R55', rating: 4.7, time: '10-15 min' },
  { id: '4', name: 'Bowl of Fries', price: 'R35', rating: 4.5, time: '10 min' },
];

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: palette.background }]}
      contentInset={{ bottom: bottomInset }}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.container, { paddingHorizontal: s.padH }]}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText type="subtitle" style={[styles.greeting, { color: palette.text }]}>
              Hungry?
            </ThemedText>
            <ThemedText style={[styles.subText, { color: palette.textSecondary }]}>
              Order your favourite food
            </ThemedText>
          </View>
          <View style={[styles.avatar, { backgroundColor: palette.accent }]}>
            <ThemedText style={styles.avatarText}>TN</ThemedText>
          </View>
        </View>

        {/* Search Bar */}
        <Pressable style={[styles.searchBar, { backgroundColor: palette.cardBg }]}>
          <ThemedText style={{ color: palette.textSecondary }}>🔍  Search for food...</ThemedText>
        </Pressable>

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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          {CATEGORIES.map((cat) => (
            <Pressable key={cat.id} style={[styles.categoryCard, { marginRight: s.catMarginR }]}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.color, width: s.catIcon, height: s.catIcon, borderRadius: s.catIconR }]}>
                <ThemedText style={[styles.categoryEmoji, { fontSize: s.catEmoji }]}>{cat.emoji}</ThemedText>
              </View>
              <ThemedText style={[styles.categoryName, { color: palette.text, fontSize: s.catFont }]}>
                {cat.name}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>

        {/* Popular Items */}
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: palette.text }]}>
            Popular Near You
          </ThemedText>
          <Pressable>
            <ThemedText style={{ color: palette.accent, fontWeight: 700, fontSize: 13 }}>
              See All
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.popularGrid}>
          {POPULAR_ITEMS.map((item) => (
            <Pressable key={item.id} style={[styles.popularCard, { backgroundColor: palette.cardBg, minWidth: s.popularMinW }]}>
              <View style={[styles.popularImage, { backgroundColor: palette.cardImageBg, height: s.popularImgH }]}>
                <ThemedText style={styles.popularEmoji}>🍽️</ThemedText>
              </View>
              <View style={styles.popularInfo}>
                <ThemedText style={[styles.itemName, { color: palette.text }]} numberOfLines={1}>
                  {item.name}
                </ThemedText>
                <ThemedText style={[styles.itemMeta, { color: palette.textSecondary }]}>
                  ⭐ {item.rating} • {item.time}
                </ThemedText>
                <ThemedText style={[styles.itemPrice, { color: palette.accent }]}>
                  {item.price}
                </ThemedText>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 600,
  },
  subText: {
    fontSize: 14,
    lineHeight: 20,
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
    paddingVertical: 12,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
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
  categoryCard: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  categoryIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmoji: {},
  categoryName: {
    fontWeight: 600,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  popularCard: {
    flex: 1,
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  popularImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularEmoji: {
    fontSize: 36,
  },
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
  itemPrice: {
    fontWeight: 700,
    fontSize: 14,
  },
});