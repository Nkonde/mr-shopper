import { Dimensions, Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// --- Responsive scaling ---
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = Math.min(SCREEN_WIDTH / 390, 1.2); // base width iPhone 14
const fontScale = (size: number) => Math.round(size * scale);

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: fontScale(14),
    lineHeight: fontScale(20),
    fontWeight: 500,
  },
  smallBold: {
    fontSize: fontScale(14),
    lineHeight: fontScale(20),
    fontWeight: 700,
  },
  default: {
    fontSize: fontScale(16),
    lineHeight: fontScale(24),
    fontWeight: 500,
  },
  title: {
    fontSize: fontScale(36),
    fontWeight: 600,
    lineHeight: fontScale(40),
  },
  subtitle: {
    fontSize: fontScale(24),
    lineHeight: fontScale(32),
    fontWeight: 600,
  },
  link: {
    lineHeight: fontScale(30),
    fontSize: fontScale(14),
  },
  linkPrimary: {
    lineHeight: fontScale(30),
    fontSize: fontScale(14),
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: fontScale(12),
  },
});
