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
  danger: '#EF4444',
};

const PROFILE_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: '👤', label: 'Personal Details' },
      { icon: '📍', label: 'Delivery Addresses' },
      { icon: '💳', label: 'Payment Methods' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: '🔔', label: 'Notifications' },
      { icon: '🌐', label: 'Language' },
      { icon: '🎨', label: 'Theme' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: '❓', label: 'Help Centre' },
      { icon: '📝', label: 'Terms & Conditions' },
    ],
  },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: palette.background }]}
      contentInset={{ bottom: bottomInset }}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatarLarge, { backgroundColor: palette.accent }]}>
            <ThemedText style={styles.avatarText}>TN</ThemedText>
          </View>
          <ThemedText type="subtitle" style={[styles.name, { color: palette.text }]}>
            Thabani Nkonde
          </ThemedText>
          <ThemedText style={{ color: palette.textSecondary, fontSize: 14 }}>
            thabani@example.com
          </ThemedText>
        </View>

        {/* Settings Sections */}
        {PROFILE_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <ThemedText style={[styles.sectionTitle, { color: palette.textSecondary }]}>
              {section.title}
            </ThemedText>
            <View style={[styles.sectionCard, { backgroundColor: palette.cardBg }]}>
              {section.items.map((item, index) => (
                <Pressable
                  key={item.label}
                  style={[
                    styles.menuItem,
                    index < section.items.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: palette.cardImageBg,
                    },
                  ]}
                >
                  <ThemedText style={styles.menuIcon}>{item.icon}</ThemedText>
                  <ThemedText style={[styles.menuLabel, { color: palette.text }]}>
                    {item.label}
                  </ThemedText>
                  <ThemedText style={{ color: palette.textSecondary }}>›</ThemedText>
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out */}
        <Pressable style={[styles.signOutBtn, { borderColor: palette.danger }]}>
          <ThemedText style={{ color: palette.danger, fontWeight: 700, fontSize: 16 }}>
            Sign Out
          </ThemedText>
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
    gap: Spacing.five,
  },
  profileHeader: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.four,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 28,
  },
  name: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: 600,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: Spacing.one,
  },
  sectionCard: {
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  menuIcon: {
    fontSize: 18,
    width: 28,
  },
  menuLabel: {
    flex: 1,
    fontWeight: 600,
    fontSize: 14,
  },
  signOutBtn: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
});