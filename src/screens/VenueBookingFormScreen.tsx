import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { hapticLight, hapticSuccess, hapticError } from '../utils/haptics';

const VenueBookingFormScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { addTicket } = useAppStore();

  const { venue, date, startTime, endTime } = route.params;

  const [purpose, setPurpose] = useState('');
  const [pic, setPic] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Shneiderman Rule 5: Real-time inline validation (error prevention)
  const validateEmail = (text: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!purpose.trim()) newErrors.purpose = 'Purpose is required';
    if (!pic.trim()) newErrors.pic = 'PIC name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Shneiderman Rule 6: Confirm before submitting
  const handleSubmit = () => {
    if (!validate()) {
      hapticError();
      return;
    }

    Alert.alert(
      'Confirm Submission',
      `Book "${venue.name}" on ${date} from ${startTime} to ${endTime}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            addTicket({
              title: `${venue.name} Booking`,
              type: 'venue_booking',
              submittedAt: 'Just now',
              status: 'In Review',
              progress: 25,
            });
            hapticSuccess();
            setShowSuccess(true);
          },
        },
      ]
    );
  };

  const isFormValid = purpose.trim() && pic.trim() && email.trim() && validateEmail(email.trim());

  return (
    <View style={styles.container}>
      <Header title="Venue Booking" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Selected Venue Info — Shneiderman Rule 8: Show context */}
          <View style={styles.infoCard}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
              <Text style={[styles.infoText, { marginLeft: SPACING.sm }]}>{date}</Text>
            </View>
            <View style={[styles.infoRow, { marginTop: SPACING.xs }]}>
              <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
              <Text style={[styles.infoText, { marginLeft: SPACING.sm }]}>{startTime} - {endTime}</Text>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formCard}>
            <Text style={styles.label}>Purpose</Text>
            <TextInput
              style={[styles.textArea, errors.purpose && styles.inputError]}
              placeholder="Describe the purpose of booking..."
              placeholderTextColor={COLORS.textTertiary}
              value={purpose}
              onChangeText={(text) => {
                setPurpose(text);
                if (errors.purpose) setErrors((e) => ({ ...e, purpose: '' }));
              }}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.purpose ? <Text style={styles.errorText}>{errors.purpose}</Text> : null}

            <Text style={styles.label}>Person In Charge (PIC)</Text>
            <TextInput
              style={[styles.input, errors.pic && styles.inputError]}
              placeholder="Enter PIC name"
              placeholderTextColor={COLORS.textTertiary}
              value={pic}
              onChangeText={(text) => {
                setPic(text);
                if (errors.pic) setErrors((e) => ({ ...e, pic: '' }));
              }}
            />
            {errors.pic ? <Text style={styles.errorText}>{errors.pic}</Text> : null}

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter email address"
              placeholderTextColor={COLORS.textTertiary}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((e) => ({ ...e, email: '' }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            {/* Shneiderman Rule 5: Disable until all fields valid */}
            <TouchableOpacity
              style={[styles.submitBtn, !isFormValid && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              <Text style={styles.submitBtnText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Shneiderman Rule 4: Clear task closure */}
      <SuccessModal
        visible={showSuccess}
        onDismiss={() => {
          setShowSuccess(false);
          navigation.navigate('Request');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  infoCard: {
    backgroundColor: COLORS.primary + '10',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.primary + '25',
  },
  venueName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  formCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.card,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    minHeight: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: MIN_TOUCH_SIZE,
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
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.xxl,
    minHeight: MIN_TOUCH_SIZE,
  },
  submitBtnDisabled: {
    backgroundColor: COLORS.primary + '60',
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
});

export default VenueBookingFormScreen;
