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
import { MAINTENANCE_CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';
import { hapticLight, hapticSuccess, hapticError, hapticSelection } from '../utils/haptics';

const URGENCY_LEVELS = ['Low', 'Medium', 'High', 'Critical'] as const;

const MaintenanceRequestScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { addTicket } = useAppStore();

  const [location, setLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [category, setCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!location) newErrors.location = 'Please select a location';
    if (!category) newErrors.category = 'Please select a category';
    if (!description.trim()) newErrors.description = 'Please describe the issue';
    if (description.trim().length < 10) newErrors.description = 'Please provide more detail (at least 10 characters)';
    if (!urgency) newErrors.urgency = 'Please select urgency level';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      hapticError();
      return;
    }

    Alert.alert(
      'Submit Maintenance Request',
      `Submit a ${urgency.toLowerCase()} priority ${category.toLowerCase()} issue at ${location}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            addTicket({
              title: `${category} Issue – ${location.split(' – ')[0]}`,
              type: 'maintenance',
              submittedAt: 'Just now',
              status: 'In Review',
              progress: 25,
              details: description.trim(),
              location,
              category,
              urgency,
            });
            hapticSuccess();
            setShowSuccess(true);
          },
        },
      ]
    );
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'Low': return '#27AE60';
      case 'Medium': return '#F39C12';
      case 'High': return '#E74C3C';
      case 'Critical': return '#C0392B';
      default: return COLORS.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Maintenance Request" onBack={() => navigation.goBack()} />
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
            <View style={styles.iconHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="construct" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.cardTitle}>Report a Facility Issue</Text>
              <Text style={styles.cardSubtitle}>Our facilities team will handle your request</Text>
            </View>

            {/* Location Dropdown */}
            <Text style={styles.label}>LOCATION</Text>
            <TouchableOpacity
              style={[styles.dropdownBtn, errors.location && styles.inputError]}
              onPress={() => {
                hapticLight();
                setShowLocationDropdown(!showLocationDropdown);
                setShowCategoryDropdown(false);
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="location-outline" size={18} color={location ? COLORS.primary : COLORS.textTertiary} />
              <Text style={[styles.dropdownText, !location && styles.dropdownPlaceholder, { marginLeft: SPACING.sm }]}>
                {location || 'Select building / area'}
              </Text>
              <Ionicons name={showLocationDropdown ? 'chevron-up' : 'chevron-down'} size={18} color={COLORS.textTertiary} />
            </TouchableOpacity>
            {errors.location ? <Text style={styles.errorText}>{errors.location}</Text> : null}
            {showLocationDropdown && (
              <View style={styles.dropdownList}>
                <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
                  {CAMPUS_LOCATIONS.map((loc, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.dropdownItem, location === loc && styles.dropdownItemActive]}
                      onPress={() => {
                        hapticSelection();
                        setLocation(loc);
                        setShowLocationDropdown(false);
                        if (errors.location) setErrors((e) => ({ ...e, location: '' }));
                      }}
                    >
                      <Text style={[styles.dropdownItemText, location === loc && styles.dropdownItemTextActive]}>
                        {loc}
                      </Text>
                      {location === loc && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Category Dropdown */}
            <Text style={styles.label}>ISSUE CATEGORY</Text>
            <TouchableOpacity
              style={[styles.dropdownBtn, errors.category && styles.inputError]}
              onPress={() => {
                hapticLight();
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowLocationDropdown(false);
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="build-outline" size={18} color={category ? COLORS.primary : COLORS.textTertiary} />
              <Text style={[styles.dropdownText, !category && styles.dropdownPlaceholder, { marginLeft: SPACING.sm }]}>
                {category || 'Select issue type'}
              </Text>
              <Ionicons name={showCategoryDropdown ? 'chevron-up' : 'chevron-down'} size={18} color={COLORS.textTertiary} />
            </TouchableOpacity>
            {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}
            {showCategoryDropdown && (
              <View style={styles.dropdownList}>
                {MAINTENANCE_CATEGORIES.map((cat, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.dropdownItem, category === cat && styles.dropdownItemActive]}
                    onPress={() => {
                      hapticSelection();
                      setCategory(cat);
                      setShowCategoryDropdown(false);
                      if (errors.category) setErrors((e) => ({ ...e, category: '' }));
                    }}
                  >
                    <Text style={[styles.dropdownItemText, category === cat && styles.dropdownItemTextActive]}>
                      {cat}
                    </Text>
                    {category === cat && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Description */}
            <Text style={styles.label}>PROBLEM DESCRIPTION</Text>
            <TextInput
              style={[styles.textArea, errors.description && styles.inputError]}
              placeholder="Describe the issue in detail..."
              placeholderTextColor={COLORS.textTertiary}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                if (errors.description) setErrors((e) => ({ ...e, description: '' }));
              }}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

            {/* Photo Attachment */}
            <Text style={styles.label}>PHOTO (OPTIONAL)</Text>
            <TouchableOpacity
              style={styles.attachBtn}
              onPress={() => {
                hapticLight();
                Alert.alert('📸 Photo Attached', 'Photo capture will use the device camera. For this prototype, the photo has been simulated as attached.');
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="camera-outline" size={24} color={COLORS.textTertiary} />
              <Text style={styles.attachText}>Tap to take or upload a photo</Text>
            </TouchableOpacity>

            {/* Urgency */}
            <Text style={styles.label}>URGENCY LEVEL</Text>
            {errors.urgency ? <Text style={styles.errorText}>{errors.urgency}</Text> : null}
            <View style={styles.urgencyRow}>
              {URGENCY_LEVELS.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.urgencyBtn,
                    urgency === level && { backgroundColor: getUrgencyColor(level), borderColor: getUrgencyColor(level) },
                  ]}
                  onPress={() => {
                    hapticSelection();
                    setUrgency(level);
                    if (errors.urgency) setErrors((e) => ({ ...e, urgency: '' }));
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.urgencyText, urgency === level && { color: COLORS.white }]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Submit */}
            <TouchableOpacity
              style={[styles.submitBtn, !(location && category && description.trim() && urgency) && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              <Text style={styles.submitBtnText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
  iconHeader: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary + '12',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  cardSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
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
    minHeight: 120,
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
  attachBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  attachText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginTop: SPACING.sm,
  },
  urgencyRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  urgencyBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    minHeight: MIN_TOUCH_SIZE,
    justifyContent: 'center',
  },
  urgencyText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
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

export default MaintenanceRequestScreen;
