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
import TicketCard from '../components/TicketCard';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';

const VoiceboxScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { tickets, addTicket } = useAppStore();
  const [complaintText, setComplaintText] = useState('');

  const complaints = tickets.filter((t) => t.type === 'complaint');

  const handleSubmit = () => {
    if (!complaintText.trim()) {
      Alert.alert('Error', 'Please enter your complaint before submitting.');
      return;
    }

    addTicket({
      title: complaintText.trim().substring(0, 50) + (complaintText.length > 50 ? '...' : ''),
      type: 'complaint',
      submittedAt: 'Just now',
      status: 'In Review',
      progress: 25,
    });

    setComplaintText('');
    Alert.alert('Submitted', 'Your anonymous complaint has been filed.');
  };

  return (
    <View style={styles.container}>
      <Header title="SU Voicebox" onBack={() => navigation.goBack()} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
            onChangeText={setComplaintText}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.attachIcon}>
              <Ionicons name="attach" size={22} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.7}>
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
            <Ionicons name="chatbubble-ellipses-outline" size={32} color={COLORS.textTertiary} />
            <Text style={styles.emptyText}>No complaints filed yet</Text>
          </View>
        )}
      </ScrollView>
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  attachIcon: {
    padding: SPACING.sm,
  },
  submitBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
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
  emptyText: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textTertiary,
  },
});

export default VoiceboxScreen;
