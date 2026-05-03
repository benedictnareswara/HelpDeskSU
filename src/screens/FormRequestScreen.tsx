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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { FORM_REQUEST_TYPES } from '../data/mockData';
import { hapticLight, hapticSuccess, hapticError, hapticSelection } from '../utils/haptics';

const MAX_NOTE_LENGTH = 500;

const FormRequestScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, addTicket } = useAppStore();

  const [selectedType, setSelectedType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Shneiderman Rule 6: Confirm before irreversible submit
  const handleSubmit = () => {
    if (!selectedType) {
      hapticError();
      Alert.alert('Missing Information', 'Please select a request type.');
      return;
    }

    Alert.alert(
      'Confirm Submission',
      `Submit a "${selectedType}" request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            addTicket({
              title: selectedType,
              type: 'form_request',
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

  return (
    <View style={styles.container}>
      <Header title="Form Request" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Request Form Data</Text>

            {/* Auto-filled info — Shneiderman Rule 8: context visible */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={[styles.infoValue, { marginLeft: SPACING.sm }]}>{user.name}</Text>
            </View>
            <View style={[styles.infoRow, { marginBottom: SPACING.md }]}>
              <Text style={styles.infoLabel}>SID:</Text>
              <Text style={[styles.infoValue, { marginLeft: SPACING.sm }]}>{user.sid}</Text>
            </View>

            {/* Type Dropdown */}
            <Text style={styles.label}>TYPE</Text>
            <TouchableOpacity
              style={[styles.dropdownBtn, !selectedType && styles.dropdownBtnEmpty]}
              onPress={() => {
                hapticLight();
                setShowDropdown(!showDropdown);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !selectedType && styles.dropdownPlaceholder,
                ]}
              >
                {selectedType || 'Select request type'}
              </Text>
              <Ionicons
                name={showDropdown ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={COLORS.textTertiary}
              />
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownList}>
                {FORM_REQUEST_TYPES.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      selectedType === type && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      hapticSelection();
                      setSelectedType(type);
                      setShowDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedType === type && styles.dropdownItemTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                    {selectedType === type && (
                      <Ionicons name="checkmark" size={18} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Note — Shneiderman Rule 3: Character count feedback */}
            <Text style={styles.label}>NOTE</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Type your note here..."
              placeholderTextColor={COLORS.textTertiary}
              value={note}
              onChangeText={(text) => {
                if (text.length <= MAX_NOTE_LENGTH) setNote(text);
              }}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>
              {note.length}/{MAX_NOTE_LENGTH}
            </Text>

            {/* Document Attachment */}
            <Text style={styles.label}>DOCUMENT ATTACHMENT</Text>
            <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
              <Ionicons name="cloud-upload-outline" size={24} color={COLORS.textTertiary} />
              <Text style={styles.attachText}>Tap to upload a file</Text>
            </TouchableOpacity>

            {/* Shneiderman Rule 5: Disable until type is selected */}
            <TouchableOpacity
              style={[styles.submitBtn, !selectedType && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              <Text style={styles.submitBtnText}>Submit</Text>
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
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.card,
  },
  cardTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    marginTop: SPACING.xl,
    marginBottom: SPACING.sm,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    minHeight: MIN_TOUCH_SIZE,
  },
  dropdownBtnEmpty: {
    borderColor: COLORS.border,
  },
  dropdownText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    flex: 1,
  },
  dropdownPlaceholder: {
    color: COLORS.textTertiary,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    marginTop: SPACING.sm,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    minHeight: MIN_TOUCH_SIZE,
  },
  dropdownItemActive: {
    backgroundColor: COLORS.primary + '10',
  },
  dropdownItemText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    flex: 1,
  },
  dropdownItemTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
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
  charCount: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  attachBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    // Removed borderStyle: 'dashed' — not reliable on Android native
    paddingVertical: SPACING.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  attachText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginTop: SPACING.sm,
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

export default FormRequestScreen;
