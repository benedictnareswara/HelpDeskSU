import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { login } = useAppStore();
  const [name, setName] = useState('Budi Speed');
  const [sid, setSid] = useState('2023900067');

  const handleLogin = () => {
    if (!name.trim() || !sid.trim()) {
      Alert.alert('Error', 'Please enter your name and SID.');
      return;
    }
    login(name.trim(), sid.trim());
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.topSection, { paddingTop: insets.top + 40 }]}>
        <View style={styles.logoContainer}>
          <Ionicons name="school" size={60} color={COLORS.white} />
        </View>
        <Text style={styles.appTitle}>SmartCampus</Text>
        <Text style={styles.appSubtitle}>University Student Service Platform</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.signInText}>Sign in to continue</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.textTertiary}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Student ID (SID)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your SID"
          placeholderTextColor={COLORS.textTertiary}
          value={sid}
          onChangeText={setSid}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.7}>
          <Text style={styles.loginBtnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topSection: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.white,
  },
  appSubtitle: {
    fontSize: FONT_SIZES.md,
    color: 'rgba(255,255,255,0.7)',
    marginTop: SPACING.xs,
  },
  formSection: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxxl,
  },
  welcomeText: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  signInText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xxl,
    marginTop: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 48,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.xxxl,
  },
  loginBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
});

export default LoginScreen;
