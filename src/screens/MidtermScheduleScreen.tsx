import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { WEEKLY_SCHEDULE } from '../data/mockData';

const MidtermScheduleScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Header title="Midterm Schedule" onBack={() => navigation.goBack()} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.weekLabel}>WEEK 6</Text>
        <View style={styles.card}>
          {WEEKLY_SCHEDULE.map((course, index) => (
            <View key={course.id} style={[styles.courseBlock, index > 0 && styles.courseBlockBorder]}>
              <View style={styles.timeCol}>
                <Text style={styles.timeText}>{course.startTime}</Text>
                <Text style={styles.timeEndText}>{course.endTime}</Text>
              </View>
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{course.courseName}</Text>
                <Text style={styles.lecturerName}>{course.lecturer}</Text>
                <View style={styles.roomBadge}>
                  <Text style={styles.roomText}>{course.room}</Text>
                </View>
              </View>
              <Text style={styles.dayText}>{course.day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.settingsRow}>
          <Ionicons name="settings-outline" size={20} color={COLORS.textTertiary} />
        </View>
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
  weekLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.card,
  },
  courseBlock: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    alignItems: 'flex-start',
  },
  courseBlockBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  timeCol: {
    width: 55,
    marginRight: SPACING.md,
  },
  timeText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  timeEndText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  lecturerName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  roomBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
  },
  roomText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
  },
  dayText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  settingsRow: {
    alignItems: 'flex-end',
    marginTop: SPACING.md,
  },
});

export default MidtermScheduleScreen;
