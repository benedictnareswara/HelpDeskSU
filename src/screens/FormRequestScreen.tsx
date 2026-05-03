import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { FORM_REQUEST_TYPES } from '../data/mockData';

const FormRequestScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, addTicket } = useAppStore();

  const [selectedType, setSelectedType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a request type.');
      return;
    }

    addTicket({
      title: selectedType,
      type: 'form_request',
      submittedAt: 'Just now',
      status: 'In Review',
      progress: 25,
    });

    setShowSuccess(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Form Request" onBack={() => navigation.goBack()} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Request Form Data</Text>
          
          {/* Auto-filled info */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>SID:</Text>
            <Text style={styles.infoValue}>{user.sid}</Text>
          </View>

          {/* Type Dropdown */}
          <Text style={styles.label}>TYPE</Text>
          <TouchableOpacity
            style={styles.dropdownBtn}
            onPress={() => setShowDropdown(!showDropdown)}
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
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Note */}
          <Text style={styles.label}>NOTE</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Type your note here..."
            placeholderTextColor={COLORS.textTertiary}
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          {/* Document Attachment */}
          <Text style={styles.label}>DOCUMENT ATTACHMENT</Text>
          <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
            <Ionicons name="cloud-upload-outline" size={24} color={COLORS.textTertiary} />
            <Text style={styles.attachText}>Tap to upload a file</Text>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.7}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    gap: SPACING.sm,
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
    height: 44,
  },
  dropdownText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
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
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  dropdownItemActive: {
    backgroundColor: COLORS.primary + '10',
  },
  dropdownItemText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
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
  attachBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderStyle: 'dashed',
    paddingVertical: SPACING.xxl,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
});

export default FormRequestScreen;
