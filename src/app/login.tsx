import { router } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

// --- Responsive ---
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallPhone = SCREEN_WIDTH < 376;
const s = { padH: isSmallPhone ? Spacing.four : Spacing.five };

// --- Custom color palette for the login screen ---
const colors = {
  background: '#FFFFFF',
  text: '#1A1A2E',           // deep dark blue-black
  textSecondary: '#6B7280',  // grey
  inputBackground: '#F3F4F6',
  inputBorder: '#E5E7EB',
  accent: '#6366F1',         // blue-purple / indigo
  accentLight: '#818CF8',
  placeholder: '#9CA3AF',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Navigate to the menu after login
    router.replace('/(tabs)/menu');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={[styles.safeArea, { paddingHorizontal: s.padH }]}>
          <View style={styles.header}>
            <ThemedText
              type="title"
              style={[styles.title, { color: colors.text }]}
            >
              Welcome{'\n'}Back
            </ThemedText>
            <ThemedText
              type="small"
              style={[styles.subtitle, { color: colors.textSecondary }]}
            >
              Sign in to your account to continue
            </ThemedText>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <ThemedText
                type="smallBold"
                style={[styles.label, { color: colors.text }]}
              >
                Email
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.inputBorder,
                  },
                ]}
                placeholder="your@email.com"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText
                type="smallBold"
                style={[styles.label, { color: colors.text }]}
              >
                Password
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.inputBorder,
                  },
                ]}
                placeholder="Enter your password"
                placeholderTextColor={colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 },
              ]}
              onPress={handleLogin}
            >
              <ThemedText
                style={[styles.loginButtonText, { color: '#FFFFFF' }]}
              >
                Sign In
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <ThemedText
              type="small"
              style={{ color: colors.textSecondary }}
            >
              Don't have an account?{' '}
            </ThemedText>
            <Pressable>
              <ThemedText
                type="smallBold"
                style={{ color: colors.accent }}
              >
                Sign Up
              </ThemedText>
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  keyboardAvoid: {
    flex: 1,
    alignSelf: 'stretch',
    maxWidth: MaxContentWidth,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.five,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  header: {
    gap: Spacing.two,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    gap: Spacing.four,
  },
  inputContainer: {
    gap: Spacing.one,
  },
  label: {
    marginLeft: Spacing.one,
  },
  input: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
    borderRadius: Spacing.three,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
    borderWidth: 1,
  },
  loginButton: {
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.one,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 700,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
