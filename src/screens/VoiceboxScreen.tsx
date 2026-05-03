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
import TicketCard from '../components/TicketCard';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { hapticLight, hapticSuccess, hapticError } from '../utils/haptics';

const MAX_COMPLAINT_LENGTH = 500;

const VoiceboxScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { tickets, addTicket } = useAppStore();
  const [complaintText, setComplaintText] = useState('');

  const complaints = tickets.filter((t) => t.type === 'complaint');

  // Shneiderman Rule 5: Prevent empty submissions
  const handleSubmit = () => {
    if (!complaintText.trim()) {
      hapticError();
      Alert.alert('Empty Complaint', 'Please describe your complaint before submitting.');
      return;
    }

    if (complaintText.trim().length < 10) {
      hapticError();
      Alert.alert('Too Short', 'Please provide at least 10 characters describing your complaint.');
      return;
    }

    // Shneiderman Rule 6: Confirm before submitting
    Alert.alert(
      'Submit Complaint',
      'Your complaint will be filed anonymously. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            addTicket({
              title: complaintText.trim().substring(0, 50) + (complaintText.length > 50 ? '...' : ''),
              type: 'complaint',
              submittedAt: 'Just now',
              status: 'In Review',
              progress: 25,
            });
            hapticSuccess();
            setComplaintText('');
            // Shneiderman Rule 4: Clear task closure
            Alert.alert('✅ Submitted', 'Your anonymous complaint has been filed successfully. You can track it below.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="SU Voicebox" onBack={() => navigation.goBack()} />
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
          {/* File a Complaint */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>File a Complaint</Text>
            <Text style={styles.cardSubtitle}>Anonymous • Your identity is protected</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe your complaint..."
              placeholderTextColor={COLORS.textTertiary}
              value={complaintText}
              onChangeText={(text) => {
                if (text.length <= MAX_COMPLAINT_LENGTH) setComplaintText(text);
              }}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            {/* Shneiderman Rule 3: Character count feedback */}
            <Text style={styles.charCount}>{complaintText.length}/{MAX_COMPLAINT_LENGTH}</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.attachIcon}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="attach" size={22} color={COLORS.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitBtn, !complaintText.trim() && styles.submitBtnDisabled]}
                onPress={handleSubmit}
                activeOpacity={0.7}
              >
                <Ionicons name="send" size={18} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Ongoing Complaints */}
          <Text style={styles.sectionTitle}>On-Going Complaints</Text>
          {complaints.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}

          {complaints.length === 0 && (
            <View style={styles.emptyCard}>
              <Ionicons name="chatbubble-ellipses-outline" size={40} color={COLORS.textTertiary} />
              <Text style={styles.emptyTitle}>No complaints filed yet</Text>
              <Text style={styles.emptySubtext}>Your submissions will appear here</Text>
            </View>
          )}

          <View style={{ height: SPACING.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: SPACING.xl,
    ...SHADOWS.card,
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
    marginBottom: SPACING.lg,
    fontStyle: 'italic',
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
  charCount: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  attachIcon: {
    padding: SPACING.sm,
    minWidth: MIN_TOUCH_SIZE,
    minHeight: MIN_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    width: MIN_TOUCH_SIZE,
    height: MIN_TOUCH_SIZE,
    borderRadius: MIN_TOUCH_SIZE / 2,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: {
    backgroundColor: COLORS.primary + '50',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.xxl,
    alignItems: 'center',
    ...SHADOWS.card,
  },
  emptyTitle: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  emptySubtext: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
  },
});

export default VoiceboxScreen;
