import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { hapticLight, hapticSuccess, hapticError } from '../utils/haptics';
import { Ticket, TicketHistoryEntry } from '../types';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return '#27AE60';
    case 'Approved': return '#27AE60';
    case 'In Review': return '#3F51B5';
    case 'Declined': return '#95A5A6';
    case 'Submitted': return '#F39C12';
    default: return COLORS.textSecondary;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'complaint': return 'Complaint';
    case 'venue_booking': return 'Venue Booking';
    case 'form_request': return 'Form Request';
    case 'maintenance': return 'Maintenance';
    case 'feedback': return 'Feedback';
    default: return 'Request';
  }
};

const TicketDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { updateTicketStatus, addTicketFollowUp } = useAppStore();
  const ticket: Ticket = route.params?.ticket;
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [followUpText, setFollowUpText] = useState('');

  if (!ticket) {
    return (
      <View style={styles.container}>
        <Header title="Ticket Detail" onBack={() => navigation.goBack()} />
        <View style={styles.empty}><Text>Ticket not found</Text></View>
      </View>
    );
  }

  const handleFollowUp = () => {
    if (!followUpText.trim()) { hapticError(); return; }
    addTicketFollowUp(ticket.id, followUpText.trim());
    hapticSuccess();
    setFollowUpText('');
    setShowFollowUp(false);
    Alert.alert('✅ Follow-up Sent', 'Your follow-up note has been added to this ticket.');
  };

  const handleClose = () => {
    Alert.alert('Close Request', 'Are you sure you want to close this request?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Close', style: 'destructive', onPress: () => {
        updateTicketStatus(ticket.id, 'Completed');
        hapticSuccess();
        Alert.alert('✅ Closed', 'This request has been marked as completed.');
        navigation.goBack();
      }},
    ]);
  };

  const handleEdit = () => {
    if (ticket.type === 'venue_booking') {
      navigation.navigate('HomeTab', {
        screen: 'VenueBookingForm',
        params: {
          venue: { name: ticket.venueName || ticket.title, location: '', maxCapacity: 0, available: true, id: '' },
          date: ticket.venueDate || '2026-05-05',
          startTime: ticket.venueStartTime || '09:00',
          endTime: ticket.venueEndTime || '11:00',
          editMode: true,
          existingTicketId: ticket.id,
          existingPurpose: ticket.purpose || '',
          existingPic: ticket.pic || '',
          existingEmail: ticket.email || '',
        },
      });
    }
  };

  const history = ticket.history || [];
  const isCloseable = ticket.status !== 'Completed' && ticket.status !== 'Declined';
  const isEditable = ticket.type === 'venue_booking' && (ticket.status === 'Approved' || ticket.status === 'In Review');

  return (
    <View style={styles.container}>
      <Header title="Ticket Detail" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.sv} contentContainerStyle={styles.svContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {/* Header Card */}
          <View style={styles.headerCard}>
            <View style={styles.idRow}>
              <Text style={styles.ticketId}>{ticket.id}</Text>
              <View style={[styles.typeBadge, { backgroundColor: getStatusColor(ticket.status) + '18' }]}>
                <Text style={[styles.typeText, { color: getStatusColor(ticket.status) }]}>{getTypeLabel(ticket.type)}</Text>
              </View>
            </View>
            <Text style={styles.title}>{ticket.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) + '18' }]}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(ticket.status) }]} />
              <Text style={[styles.statusText, { color: getStatusColor(ticket.status) }]}>{ticket.status}</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${ticket.progress}%`, backgroundColor: getStatusColor(ticket.status) }]} />
              </View>
              <Text style={styles.progressLabel}>{ticket.progress}%</Text>
            </View>
          </View>

          {/* Details */}
          {ticket.details ? (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.detailsText}>{ticket.details}</Text>
            </View>
          ) : null}

          {/* Extra info for specific types */}
          {ticket.location ? (
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>{ticket.location}</Text>
            </View>
          ) : null}
          {ticket.urgency ? (
            <View style={styles.infoRow}>
              <Ionicons name="alert-circle-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>Urgency: {ticket.urgency}</Text>
            </View>
          ) : null}

          {/* Timeline */}
          {history.length > 0 && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Status History</Text>
              {history.map((entry: TicketHistoryEntry, index: number) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineLine}>
                    <View style={[styles.timelineDot, { backgroundColor: getStatusColor(entry.status) }]} />
                    {index < history.length - 1 && <View style={styles.timelineConnector} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={[styles.timelineStatus, { color: getStatusColor(entry.status) }]}>{entry.status}</Text>
                    <Text style={styles.timelineTime}>{entry.timestamp}</Text>
                    {entry.note && <Text style={styles.timelineNote}>{entry.note}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Actions */}
          <View style={styles.actionsCard}>
            {isEditable && (
              <TouchableOpacity style={styles.actionBtn} onPress={() => { hapticLight(); handleEdit(); }} activeOpacity={0.7}>
                <Ionicons name="create-outline" size={20} color={COLORS.primary} />
                <Text style={styles.actionBtnText}>Edit Booking</Text>
              </TouchableOpacity>
            )}
            {isCloseable && (
              <TouchableOpacity style={styles.actionBtn} onPress={() => { hapticLight(); setShowFollowUp(!showFollowUp); }} activeOpacity={0.7}>
                <Ionicons name="chatbubble-outline" size={20} color={COLORS.primary} />
                <Text style={styles.actionBtnText}>Add Follow-up</Text>
              </TouchableOpacity>
            )}
            {isCloseable && (
              <TouchableOpacity style={[styles.actionBtn, styles.closeBtn]} onPress={() => { hapticLight(); handleClose(); }} activeOpacity={0.7}>
                <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.error} />
                <Text style={[styles.actionBtnText, { color: COLORS.error }]}>Close Request</Text>
              </TouchableOpacity>
            )}
          </View>

          {showFollowUp && (
            <View style={styles.followUpCard}>
              <TextInput style={styles.textArea} placeholder="Add a follow-up note..." placeholderTextColor={COLORS.textTertiary} value={followUpText} onChangeText={setFollowUpText} multiline numberOfLines={3} textAlignVertical="top" />
              <TouchableOpacity style={[styles.sendBtn, !followUpText.trim() && styles.sendBtnDisabled]} onPress={handleFollowUp} activeOpacity={0.7}>
                <Text style={styles.sendBtnText}>Send Follow-up</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: SPACING.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  sv: { flex: 1 },
  svContent: { padding: SPACING.lg },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerCard: { backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.card },
  idRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  ticketId: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textTertiary },
  typeBadge: { paddingHorizontal: SPACING.md, paddingVertical: 2, borderRadius: RADIUS.full },
  typeText: { fontSize: FONT_SIZES.xs, fontWeight: '700' },
  title: { fontSize: FONT_SIZES.xl, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.md },
  statusBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full, marginBottom: SPACING.md },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: SPACING.sm },
  statusText: { fontSize: FONT_SIZES.sm, fontWeight: '700' },
  progressContainer: { flexDirection: 'row', alignItems: 'center' },
  progressBg: { flex: 1, height: 6, backgroundColor: COLORS.border, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginLeft: SPACING.sm, fontWeight: '600' },
  sectionCard: { backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.card },
  sectionTitle: { fontSize: FONT_SIZES.md, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.md },
  detailsText: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, lineHeight: 22 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.xs, marginBottom: SPACING.xs },
  infoText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginLeft: SPACING.sm },
  timelineItem: { flexDirection: 'row', marginBottom: SPACING.md },
  timelineLine: { width: 24, alignItems: 'center' },
  timelineDot: { width: 12, height: 12, borderRadius: 6, marginTop: 2 },
  timelineConnector: { width: 2, flex: 1, backgroundColor: COLORS.border, marginTop: 2 },
  timelineContent: { flex: 1, marginLeft: SPACING.md, paddingBottom: SPACING.sm },
  timelineStatus: { fontSize: FONT_SIZES.md, fontWeight: '700' },
  timelineTime: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 2 },
  timelineNote: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: SPACING.xs, lineHeight: 20 },
  actionsCard: { backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOWS.card },
  actionBtn: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, borderRadius: RADIUS.md, minHeight: MIN_TOUCH_SIZE },
  closeBtn: { borderTopWidth: 1, borderTopColor: COLORS.divider },
  actionBtnText: { fontSize: FONT_SIZES.md, fontWeight: '600', color: COLORS.primary, marginLeft: SPACING.md },
  followUpCard: { backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, padding: SPACING.lg, ...SHADOWS.card },
  textArea: { borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.textPrimary, minHeight: 80 },
  sendBtn: { backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: SPACING.md, alignItems: 'center', marginTop: SPACING.md, minHeight: MIN_TOUCH_SIZE },
  sendBtnDisabled: { backgroundColor: COLORS.primary + '60' },
  sendBtnText: { color: COLORS.white, fontSize: FONT_SIZES.md, fontWeight: '700' },
});

export default TicketDetailScreen;
