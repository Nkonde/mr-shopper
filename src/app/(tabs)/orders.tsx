import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallPhone = SCREEN_WIDTH < 376;

const palette = {
  background: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  cardBg: '#F3F4F6',
  cardImageBg: '#E5E7EB',
  accent: '#6366F1',
  green: '#10B981',
  orange: '#F59E0B',
};

const s = { padH: isSmallPhone ? Spacing.three : Spacing.four };

const ORDERS = [
  {
    id: '1',
    items: 'Margherita Pizza, Bowl of Fries',
    total: 120,
    status: 'Delivered',
    date: 'Today, 14:30',
    statusColor: palette.green,
  },
  {
    id: '2',
    items: 'Beef Burger x2, Chicken Wrap',
    total: 185,
    status: 'In Transit',
    date: 'Today, 12:15',
    statusColor: palette.accent,
  },
  {
    id: '3',
    items: 'Sushi Set, Miso Soup',
    total: 145,
    status: 'Preparing',
    date: 'Today, 11:00',
    statusColor: palette.orange,
  },
];

export default function OrdersScreen() {
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
          <ThemedText type="subtitle" style={[styles.title, { color: palette.text }]}>
            My Orders
          </ThemedText>
          <ThemedText style={{ color: palette.textSecondary, fontSize: 14 }}>
            Track your deliveries
          </ThemedText>
        </View>

        {/* Order List */}
        <View style={styles.ordersList}>
          {ORDERS.map((order) => (
            <Pressable key={order.id} style={[styles.orderCard, { backgroundColor: palette.cardBg }]}>
              <View style={styles.orderHeader}>
                <ThemedText style={[styles.orderItems, { color: palette.text }]} numberOfLines={1}>
                  {order.items}
                </ThemedText>
                <View style={[styles.statusBadge, { backgroundColor: order.statusColor + '20' }]}>
                  <ThemedText style={[styles.statusText, { color: order.statusColor }]}>
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
    alignItems: 'center',
    gap: Spacing.one,
    paddingTop: Spacing.two,
  },
  title: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: 600,
  },
  ordersList: {
    gap: Spacing.three,
  },
  orderCard: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
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
});