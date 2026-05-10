import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { FEEDBACK_CATEGORIES } from '../data/mockData';
import { hapticLight, hapticSuccess, hapticError, hapticSelection } from '../utils/haptics';

const FeedbackScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { addTicket } = useAppStore();
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    if (rating === 0) { hapticError(); Alert.alert('Missing Rating', 'Please select a rating.'); return; }
    if (!category) { hapticError(); Alert.alert('Missing Category', 'Please select a category.'); return; }

    Alert.alert('Submit Feedback', 'Send your feedback to the SmartCampus team?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Submit', onPress: () => {
        addTicket({
          title: `Feedback: ${category} (${rating}★)`,
          type: 'feedback',
          submittedAt: 'Just now',
          status: 'Completed',
          progress: 100,
          details: comments.trim() || `Rating: ${rating}/5 stars. Category: ${category}.`,
          category,
        });
        hapticSuccess();
        Alert.alert(
          '🎉 Thank You!',
          'Your feedback has been received. We appreciate your input and will use it to improve SmartCampus.\n\nYou can view your feedback in your Profile page.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Send Feedback" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.sv} contentContainerStyle={styles.svContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={styles.iconHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="chatbubble-ellipses" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.cardTitle}>We'd love your feedback!</Text>
              <Text style={styles.cardSub}>Help us improve SmartCampus for everyone</Text>
            </View>

            {/* Star Rating */}
            <Text style={styles.label}>RATING</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => { hapticSelection(); setRating(star); }} style={styles.starBtn}>
                  <Ionicons name={star <= rating ? 'star' : 'star-outline'} size={36} color={star <= rating ? '#F39C12' : COLORS.border} />
                </TouchableOpacity>
              ))}
            </View>
            {rating > 0 && (
              <Text style={styles.ratingLabel}>
                {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
              </Text>
            )}

            {/* Category */}
            <Text style={styles.label}>CATEGORY</Text>
            <TouchableOpacity style={styles.dropdownBtn} onPress={() => { hapticLight(); setShowDropdown(!showDropdown); }} activeOpacity={0.7}>
              <Text style={[styles.dropdownText, !category && styles.dropdownPlaceholder]}>{category || 'Select feedback category'}</Text>
              <Ionicons name={showDropdown ? 'chevron-up' : 'chevron-down'} size={18} color={COLORS.textTertiary} />
            </TouchableOpacity>
            {showDropdown && (
              <View style={styles.dropdownList}>
                {FEEDBACK_CATEGORIES.map((cat, i) => (
                  <TouchableOpacity key={i} style={[styles.dropdownItem, category === cat && styles.dropdownItemActive]} onPress={() => { hapticSelection(); setCategory(cat); setShowDropdown(false); }}>
                    <Text style={[styles.dropdownItemText, category === cat && styles.dropdownItemTextActive]}>{cat}</Text>
                    {category === cat && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Comments */}
            <Text style={styles.label}>COMMENTS (OPTIONAL)</Text>
            <TextInput style={styles.textArea} placeholder="Tell us more about your experience..." placeholderTextColor={COLORS.textTertiary} value={comments} onChangeText={setComments} multiline numberOfLines={4} textAlignVertical="top" />

            <TouchableOpacity style={[styles.submitBtn, !(rating > 0 && category) && styles.submitBtnDisabled]} onPress={handleSubmit} activeOpacity={0.7}>
              <Text style={styles.submitBtnText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  sv: { flex: 1 },
  svContent: { padding: SPACING.lg },
  card: { backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, padding: SPACING.lg, ...SHADOWS.card },
  iconHeader: { alignItems: 'center', marginBottom: SPACING.md },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary + '12', alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.md },
  cardTitle: { fontSize: FONT_SIZES.lg, fontWeight: '700', color: COLORS.textPrimary },
  cardSub: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: SPACING.xs },
  label: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textSecondary, letterSpacing: 0.5, marginTop: SPACING.xl, marginBottom: SPACING.sm },
  starsRow: { flexDirection: 'row', justifyContent: 'center', gap: SPACING.md },
  starBtn: { padding: SPACING.xs },
  ratingLabel: { textAlign: 'center', fontSize: FONT_SIZES.sm, color: '#F39C12', fontWeight: '600', marginTop: SPACING.xs },
  dropdownBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, minHeight: MIN_TOUCH_SIZE },
  dropdownText: { fontSize: FONT_SIZES.md, color: COLORS.textPrimary, flex: 1 },
  dropdownPlaceholder: { color: COLORS.textTertiary },
  dropdownList: { borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, marginTop: SPACING.sm, backgroundColor: COLORS.white, overflow: 'hidden' },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.divider, minHeight: MIN_TOUCH_SIZE },
  dropdownItemActive: { backgroundColor: COLORS.primary + '10' },
  dropdownItemText: { fontSize: FONT_SIZES.md, color: COLORS.textPrimary, flex: 1 },
  dropdownItemTextActive: { color: COLORS.primary, fontWeight: '600' },
  textArea: { borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.textPrimary, minHeight: 100 },
  submitBtn: { backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: SPACING.lg, alignItems: 'center', marginTop: SPACING.xxl, minHeight: MIN_TOUCH_SIZE },
  submitBtnDisabled: { backgroundColor: COLORS.primary + '60' },
  submitBtnText: { color: COLORS.white, fontSize: FONT_SIZES.lg, fontWeight: '700' },
});

export default FeedbackScreen;
