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
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZES, SPACING, RADIUS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { hapticLight, hapticSuccess, hapticError } from '../utils/haptics';

const LoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { login } = useAppStore();
  const [name, setName] = useState('Budi Speed');
  const [sid, setSid] = useState('2023900067');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Shneiderman Rule 5: Inline validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!sid.trim()) newErrors.sid = 'Student ID is required';
    else if (sid.trim().length < 5) newErrors.sid = 'Student ID must be at least 5 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) {
      hapticError();
      return;
    }

    hapticLight();
    // Shneiderman Rule 3: Loading feedback
    setIsLoading(true);
    setTimeout(() => {
      login(name.trim(), sid.trim());
      hapticSuccess();
      setIsLoading(false);
    }, 600);
  };

  const isFormValid = name.trim().length > 0 && sid.trim().length >= 5;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.textTertiary}
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) setErrors((e) => ({ ...e, name: '' }));
          }}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <Text style={styles.label}>Student ID (SID)</Text>
        <TextInput
          style={[styles.input, errors.sid && styles.inputError]}
          placeholder="Enter your SID"
          placeholderTextColor={COLORS.textTertiary}
          value={sid}
          onChangeText={(text) => {
            setSid(text);
            if (errors.sid) setErrors((e) => ({ ...e, sid: '' }));
          }}
          keyboardType="numeric"
        />
        {errors.sid ? <Text style={styles.errorText}>{errors.sid}</Text> : null}

        {/* Shneiderman Rule 5: Disable until valid */}
        <TouchableOpacity
          style={[styles.loginBtn, (!isFormValid || isLoading) && styles.loginBtnDisabled]}
          onPress={handleLogin}
          activeOpacity={0.7}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.loginBtnText}>Sign In</Text>
          )}
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
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 1.5,
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.xxxl,
    minHeight: MIN_TOUCH_SIZE + 4,
  },
  loginBtnDisabled: {
    backgroundColor: COLORS.primary + '60',
  },
  loginBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
});

export default LoginScreen;
