import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useShop } from '@/context/shop-context';

const palette = {
  background: '#F8F9FD',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  cardBg: '#FFFFFF',
  cardImageBg: '#E5E7EB',
  accent: '#6366F1',
  green: '#10B981',
  orange: '#F59E0B',
};

export default function OrdersScreen() {
  const { orders } = useShop();
  const insets = useSafeAreaInsets();
  const bottomPad = insets.bottom + 80;

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: palette.background }]}
      contentContainerStyle={{ paddingBottom: bottomPad }}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="subtitle" style={[styles.title, { color: palette.text }]}>
            My Orders
          </ThemedText>
          <ThemedText style={{ color: palette.textSecondary, fontSize: 14 }}>
            Track your deliveries
          </ThemedText>
        </View>

        {/* Order List */}
        <View style={styles.ordersList}>
          {!orders.length && <ThemedText style={styles.empty}>No orders yet. Your completed checkout will appear here.</ThemedText>}
          {orders.map((order) => (
            <Pressable key={order.id} style={[styles.orderCard, { backgroundColor: palette.cardBg }]}>
              <View style={styles.orderHeader}>
                <ThemedText style={[styles.orderItems, { color: palette.text }]} numberOfLines={1}>
                  {order.items}
                </ThemedText>
                <View style={[styles.statusBadge, { backgroundColor: palette.orange + '20' }]}> 
                  <ThemedText style={[styles.statusText, { color: palette.orange }]}> 
                    {order.status}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.orderFooter}>
                <ThemedText style={{ color: palette.textSecondary, fontSize: 12 }}>
                  {order.date}
                </ThemedText>
                <ThemedText style={{ color: palette.accent, fontWeight: 700, fontSize: 14 }}>
                  R{order.total}
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
  container: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    alignItems: 'flex-start',
    gap: Spacing.one,
    paddingTop: Spacing.two,
  },
  title: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: 800,
  },
  ordersList: {
    gap: Spacing.three,
  },
  orderCard: {
    padding: Spacing.three,
    borderRadius: 20,
    gap: Spacing.two,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  orderItems: {
    fontWeight: 700,
    fontSize: 14,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Spacing.one * 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 700,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  empty: { color: palette.textSecondary, textAlign: 'center', paddingVertical: Spacing.five },
});
