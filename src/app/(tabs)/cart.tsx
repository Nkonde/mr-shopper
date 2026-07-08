import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const palette = {
  background: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  cardBg: '#F3F4F6',
  cardImageBg: '#E5E7EB',
  accent: '#6366F1',
};

const CART_ITEMS = [
  { id: '1', name: 'Margherita Pizza', quantity: 1, price: 85 },
  { id: '2', name: 'Beef Burger', quantity: 2, price: 65 },
  { id: '3', name: 'Bowl of Fries', quantity: 1, price: 35 },
];

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom + BottomTabInset + Spacing.three;

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 15;
  const total = subtotal + delivery;

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: palette.background }]}
      contentInset={{ bottom: bottomInset }}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="subtitle" style={[styles.title, { color: palette.text }]}>
            Your Cart
          </ThemedText>
          <ThemedText style={{ color: palette.textSecondary, fontSize: 14 }}>
            {CART_ITEMS.length} item{CART_ITEMS.length !== 1 ? 's' : ''}
          </ThemedText>
        </View>

        {/* Cart Items */}
        <View style={styles.itemsList}>
          {CART_ITEMS.map((item) => (
            <View key={item.id} style={[styles.cartItem, { backgroundColor: palette.cardBg }]}>
              <View style={[styles.itemImage, { backgroundColor: palette.cardImageBg }]}>
                <ThemedText style={styles.itemEmoji}>🍽️</ThemedText>
              </View>
              <View style={styles.itemDetails}>
                <ThemedText style={[styles.itemName, { color: palette.text }]}>
                  {item.name}
                </ThemedText>
                <ThemedText style={{ color: palette.textSecondary, fontSize: 12 }}>
                  R{item.price} each
                </ThemedText>
                <View style={styles.quantityRow}>
                  <Pressable style={[styles.qtyBtn, { backgroundColor: palette.cardImageBg }]}>
                    <ThemedText style={[styles.qtyBtnText, { color: palette.text }]}>−</ThemedText>
                  </Pressable>
                  <ThemedText style={[styles.quantity, { color: palette.text }]}>
                    {item.quantity}
                  </ThemedText>
                  <Pressable style={[styles.qtyBtn, { backgroundColor: palette.accent }]}>
                    <ThemedText style={[styles.qtyBtnText, { color: '#FFFFFF' }]}>+</ThemedText>
                  </Pressable>
                </View>
              </View>
              <ThemedText style={[styles.itemTotal, { color: palette.text }]}>
                R{item.price * item.quantity}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={[styles.summary, { backgroundColor: palette.cardBg }]}>
          <View style={styles.summaryRow}>
            <ThemedText style={{ color: palette.textSecondary, fontSize: 14 }}>Subtotal</ThemedText>
            <ThemedText style={{ color: palette.text, fontSize: 14 }}>R{subtotal}</ThemedText>
          </View>
          <View style={styles.summaryRow}>
            <ThemedText style={{ color: palette.textSecondary, fontSize: 14 }}>Delivery fee</ThemedText>
            <ThemedText style={{ color: palette.text, fontSize: 14 }}>R{delivery}</ThemedText>
          </View>
          <View style={[styles.divider, { backgroundColor: palette.cardImageBg }]} />
          <View style={styles.summaryRow}>
            <ThemedText style={{ color: palette.text, fontWeight: 700, fontSize: 14 }}>Total</ThemedText>
            <ThemedText style={{ color: palette.accent, fontWeight: 700, fontSize: 14 }}>
              R{total}
            </ThemedText>
          </View>
        </View>

        {/* Checkout Button */}
        <Pressable style={[styles.checkoutBtn, { backgroundColor: palette.accent }]}>
          <ThemedText style={styles.checkoutText}>Proceed to Checkout • R{total}</ThemedText>
        </Pressable>
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
    padding: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 600,
  },
  itemsList: {
    gap: Spacing.three,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.two,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemEmoji: {
    fontSize: 28,
  },
  itemDetails: {
    flex: 1,
    gap: Spacing.half,
  },
  itemName: {
    fontWeight: 700,
    fontSize: 14,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 20,
  },
  quantity: {
    minWidth: 20,
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 14,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 700,
  },
  summary: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    height: 1,
    marginVertical: Spacing.one,
  },
  checkoutBtn: {
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 700,
  },
});