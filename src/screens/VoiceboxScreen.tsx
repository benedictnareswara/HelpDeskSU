import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import TicketCard from '../components/TicketCard';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { hapticLight, hapticSuccess, hapticError } from '../utils/haptics';

// Try to import expo-av, gracefully fail on web
let Audio: any = null;
try {
  Audio = require('expo-av').Audio;
} catch (e) {
  // expo-av not available (web)
}

const MAX_COMPLAINT_LENGTH = 500;

const VoiceboxScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { tickets, addTicket } = useAppStore();
  const [complaintText, setComplaintText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingRef = useRef<any>(null);
  const soundRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const complaints = tickets.filter((t) => t.type === 'complaint');

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recordingRef.current) {
        try { recordingRef.current.stopAndUnloadAsync(); } catch (e) {}
      }
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startRecording = async () => {
    if (!Audio) {
      Alert.alert('Not Available', 'Voice recording is available on mobile devices via Expo Go.');
      return;
    }
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        hapticError();
        Alert.alert('Permission Required', 'Microphone permission is needed for voice notes.');
        return;
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingDuration(0);
      hapticLight();
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      hapticError();
      Alert.alert('Error', 'Could not start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recordingRef.current) return;
    try {
      clearInterval(timerRef.current);
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      const { sound } = await Audio.Sound.createAsync({ uri });
      soundRef.current = sound;
      setIsRecording(false);
      setHasRecording(true);
      hapticSuccess();
    } catch (err) {
      setIsRecording(false);
    }
  };

  const playRecording = async () => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.replayAsync();
      hapticLight();
    } catch (err) {
      Alert.alert('Error', 'Could not play recording.');
    }
  };

  const deleteRecording = () => {
    soundRef.current = null;
    recordingRef.current = null;
    setHasRecording(false);
    setRecordingDuration(0);
    hapticLight();
  };

  const handleSubmit = () => {
    if (!complaintText.trim() && !hasRecording) {
      hapticError();
      Alert.alert('Empty Complaint', 'Please describe your complaint or record a voice note before submitting.');
      return;
    }
    if (complaintText.trim() && complaintText.trim().length < 10 && !hasRecording) {
      hapticError();
      Alert.alert('Too Short', 'Please provide at least 10 characters or record a voice note.');
      return;
    }

    Alert.alert('Submit Complaint', 'Your complaint will be filed anonymously. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Submit',
        onPress: () => {
          const titleText = complaintText.trim()
            ? complaintText.trim().substring(0, 50) + (complaintText.length > 50 ? '...' : '')
            : 'Voice Note Complaint';
          addTicket({
            title: titleText,
            type: 'complaint',
            submittedAt: 'Just now',
            status: 'In Review',
            progress: 25,
            details: complaintText.trim() + (hasRecording ? '\n\n🎤 Voice note attached' : ''),
          });
          hapticSuccess();
          setComplaintText('');
          setHasRecording(false);
          setRecordingDuration(0);
          soundRef.current = null;
          recordingRef.current = null;
          Alert.alert('✅ Submitted', 'Your anonymous complaint has been filed successfully. You can track it below.');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="SU Voicebox" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.cardTitle}>File a Complaint</Text>
            <Text style={styles.cardSubtitle}>Anonymous • Your identity is protected</Text>

            {/* Voice Recording Section */}
            <View style={styles.voiceSection}>
              {!isRecording && !hasRecording && (
                <TouchableOpacity style={styles.micBtn} onPress={startRecording} activeOpacity={0.7}>
                  <Ionicons name="mic" size={28} color={COLORS.white} />
                  <Text style={styles.micLabel}>Tap to Record</Text>
                </TouchableOpacity>
              )}
              {isRecording && (
                <View style={styles.recordingRow}>
                  <View style={styles.recordingIndicator}>
                    <View style={styles.recordingDot} />
                    <Text style={styles.recordingText}>Recording...</Text>
                    <Text style={styles.recordingTimer}>{formatDuration(recordingDuration)}</Text>
                  </View>
                  <TouchableOpacity style={styles.stopBtn} onPress={stopRecording} activeOpacity={0.7}>
                    <Ionicons name="stop" size={24} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              )}
              {hasRecording && !isRecording && (
                <View style={styles.playbackRow}>
                  <View style={styles.playbackInfo}>
                    <Ionicons name="checkmark-circle" size={20} color="#27AE60" />
                    <Text style={styles.playbackText}>Voice note recorded ({formatDuration(recordingDuration)})</Text>
                  </View>
                  <TouchableOpacity style={styles.playBtn} onPress={playRecording}>
                    <Ionicons name="play" size={18} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteBtn} onPress={deleteRecording}>
                    <Ionicons name="trash-outline" size={18} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Text Input */}
            <Text style={styles.orDivider}>— or add text details —</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe your complaint..."
              placeholderTextColor={COLORS.textTertiary}
              value={complaintText}
              onChangeText={(text) => { if (text.length <= MAX_COMPLAINT_LENGTH) setComplaintText(text); }}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{complaintText.length}/{MAX_COMPLAINT_LENGTH}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.attachIcon} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="attach" size={22} color={COLORS.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitBtn, !(complaintText.trim() || hasRecording) && styles.submitBtnDisabled]}
                onPress={handleSubmit}
                activeOpacity={0.7}
              >
                <Ionicons name="send" size={18} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>

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
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { padding: SPACING.lg },
  card: { backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.xl, ...SHADOWS.card },
  cardTitle: { fontSize: FONT_SIZES.lg, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  cardSubtitle: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.lg, fontStyle: 'italic' },
  voiceSection: { marginBottom: SPACING.md },
  micBtn: { backgroundColor: COLORS.primary, borderRadius: RADIUS.lg, paddingVertical: SPACING.xl, alignItems: 'center', justifyContent: 'center' },
  micLabel: { color: COLORS.white, fontSize: FONT_SIZES.sm, fontWeight: '600', marginTop: SPACING.xs },
  recordingRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E74C3C10', borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: '#E74C3C30' },
  recordingIndicator: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  recordingDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E74C3C', marginRight: SPACING.sm },
  recordingText: { fontSize: FONT_SIZES.md, fontWeight: '600', color: '#E74C3C' },
  recordingTimer: { fontSize: FONT_SIZES.md, fontWeight: '700', color: '#E74C3C', marginLeft: SPACING.sm },
  stopBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E74C3C', alignItems: 'center', justifyContent: 'center' },
  playbackRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#27AE6010', borderRadius: RADIUS.lg, padding: SPACING.md, borderWidth: 1, borderColor: '#27AE6030' },
  playbackInfo: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  playbackText: { fontSize: FONT_SIZES.sm, color: '#27AE60', fontWeight: '600', marginLeft: SPACING.sm },
  playBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary + '15', alignItems: 'center', justifyContent: 'center', marginLeft: SPACING.sm },
  deleteBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.error + '15', alignItems: 'center', justifyContent: 'center', marginLeft: SPACING.sm },
  orDivider: { textAlign: 'center', fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginVertical: SPACING.md },
  textArea: { borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.textPrimary, minHeight: 120 },
  charCount: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, textAlign: 'right', marginTop: SPACING.xs },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SPACING.md },
  attachIcon: { padding: SPACING.sm, minWidth: MIN_TOUCH_SIZE, minHeight: MIN_TOUCH_SIZE, alignItems: 'center', justifyContent: 'center' },
  submitBtn: { width: MIN_TOUCH_SIZE, height: MIN_TOUCH_SIZE, borderRadius: MIN_TOUCH_SIZE / 2, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  submitBtnDisabled: { backgroundColor: COLORS.primary + '50' },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.md },
  emptyCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: SPACING.xxl, alignItems: 'center', ...SHADOWS.card },
  emptyTitle: { marginTop: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.textSecondary, fontWeight: '600' },
  emptySubtext: { marginTop: SPACING.xs, fontSize: FONT_SIZES.sm, color: COLORS.textTertiary },
});

export default VoiceboxScreen;
