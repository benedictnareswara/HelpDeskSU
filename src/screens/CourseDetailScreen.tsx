import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,
  Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { hapticLight, hapticSuccess, hapticError } from '../utils/haptics';

const CourseDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { addTicket } = useAppStore();
  const course = route.params?.course;
  const [showReportForm, setShowReportForm] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');

  if (!course) {
    return (
      <View style={styles.container}>
        <Header title="Course Detail" onBack={() => navigation.goBack()} />
        <View style={styles.empty}><Text>Course not found</Text></View>
      </View>
    );
  }

  const handleReportSubmit = () => {
    if (!issueDescription.trim() || issueDescription.trim().length < 10) {
      hapticError();
      Alert.alert('Invalid', 'Please provide at least 10 characters describing the issue.');
      return;
    }
    Alert.alert('Submit Report', `Report an issue in room ${course.room}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Submit',
        onPress: () => {
          addTicket({
            title: `Issue in ${course.room} – ${course.courseName}`,
            type: 'complaint',
            submittedAt: 'Just now',
            status: 'In Review',
            progress: 25,
            details: issueDescription.trim(),
            location: course.room,
          });
          hapticSuccess();
          setIssueDescription('');
          setShowReportForm(false);
          Alert.alert('✅ Report Submitted', `Your issue report for ${course.room} has been submitted. Track it in Profile > Ongoing Requests.`);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Course Detail" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.sv} contentContainerStyle={styles.svContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.infoCard}>
            <View style={styles.courseHeader}>
              <Ionicons name="book" size={28} color={COLORS.primary} />
              <Text style={styles.courseName}>{course.courseName}</Text>
            </View>
            {[
              { icon: 'person-outline' as const, text: course.lecturer },
              { icon: 'location-outline' as const, text: `Room ${course.room}` },
              { icon: 'time-outline' as const, text: `${course.startTime} – ${course.endTime}` },
              { icon: 'calendar-outline' as const, text: course.day },
            ].map((item, i) => (
              <View key={i} style={styles.detailRow}>
                <Ionicons name={item.icon} size={18} color={COLORS.textSecondary} />
                <Text style={styles.detailText}>{item.text}</Text>
              </View>
            ))}
          </View>

          {!showReportForm ? (
            <TouchableOpacity style={styles.reportBtn} onPress={() => { hapticLight(); setShowReportForm(true); }} activeOpacity={0.7}>
              <Ionicons name="warning-outline" size={22} color={COLORS.error} />
              <Text style={styles.reportBtnText}>Report Issue in {course.room}</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <Ionicons name="warning" size={22} color={COLORS.error} />
                <Text style={styles.reportTitle}>Report Issue – {course.room}</Text>
              </View>
              <Text style={styles.reportSub}>Report a classroom resource problem (broken equipment, AC, projector, etc.)</Text>
              <TextInput style={styles.textArea} placeholder="Describe the issue..." placeholderTextColor={COLORS.textTertiary} value={issueDescription} onChangeText={setIssueDescription} multiline numberOfLines={5} textAlignVertical="top" autoFocus />
              <View style={styles.reportActions}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => { setShowReportForm(false); setIssueDescription(''); }} activeOpacity={0.7}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.submitBtn, !issueDescription.trim() && styles.submitBtnDisabled]} onPress={handleReportSubmit} activeOpacity={0.7}>
                  <Ionicons name="send" size={16} color={COLORS.white} />
                  <Text style={styles.submitBtnText}>Submit Report</Text>
                </TouchableOpacity>
              </View>
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
  infoCard: { backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, padding: SPACING.xl, marginBottom: SPACING.lg, ...SHADOWS.card },
  courseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg, paddingBottom: SPACING.lg, borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  courseName: { fontSize: FONT_SIZES.xl, fontWeight: '700', color: COLORS.textPrimary, marginLeft: SPACING.md, flex: 1 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.sm },
  detailText: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, marginLeft: SPACING.md },
  reportBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.error + '08', borderWidth: 1, borderColor: COLORS.error + '25', borderRadius: RADIUS.lg, padding: SPACING.lg, minHeight: MIN_TOUCH_SIZE + SPACING.lg },
  reportBtnText: { fontSize: FONT_SIZES.md, fontWeight: '600', color: COLORS.error, flex: 1, marginLeft: SPACING.md },
  reportCard: { backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.error + '25', ...SHADOWS.card },
  reportHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  reportTitle: { fontSize: FONT_SIZES.lg, fontWeight: '700', color: COLORS.textPrimary, marginLeft: SPACING.sm },
  reportSub: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.lg },
  textArea: { borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.textPrimary, minHeight: 120 },
  reportActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: SPACING.lg, gap: SPACING.md },
  cancelBtn: { paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, minHeight: MIN_TOUCH_SIZE, justifyContent: 'center' },
  cancelBtnText: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, fontWeight: '600' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md, borderRadius: RADIUS.md, backgroundColor: COLORS.error, minHeight: MIN_TOUCH_SIZE, justifyContent: 'center', gap: SPACING.sm },
  submitBtnDisabled: { backgroundColor: COLORS.error + '60' },
  submitBtnText: { fontSize: FONT_SIZES.md, color: COLORS.white, fontWeight: '700' },
});

export default CourseDetailScreen;
