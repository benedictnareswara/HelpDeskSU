import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { TODAY_SCHEDULE } from '../data/mockData';

const CourseScheduleScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Header title="Course Schedule" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today's Schedule Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Schedule</Text>
          {TODAY_SCHEDULE.map((course, index) => (
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

        {/* Quick Links */}
        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => navigation.navigate('MidtermSchedule')}
          activeOpacity={0.7}
        >
          <Ionicons name="calendar-outline" size={22} color={COLORS.primary} />
          <Text style={styles.linkText}>Full Class Schedule</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkCard} activeOpacity={0.7}>
          <Ionicons name="book-outline" size={22} color={COLORS.primary} />
          <Text style={styles.linkText}>Course Offering</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
        </TouchableOpacity>

        {/* Academic Advisor */}
        <Text style={styles.sectionTitle}>Academic Advisor</Text>
        <View style={styles.advisorCard}>
          <View style={styles.advisorAvatar}>
            <Ionicons name="person" size={28} color={COLORS.white} />
          </View>
          <View style={styles.advisorInfo}>
            <Text style={styles.advisorName}>Panji Darma</Text>
            <Text style={styles.advisorRole}>Academic Advisor</Text>
          </View>
          <TouchableOpacity
            style={styles.messageBtn}
            onPress={() =>
              navigation.navigate('MessagesTab', {
                screen: 'MessagesList',
              })
            }
          >
            <Ionicons name="chatbubble" size={20} color={COLORS.primary} />
          </TouchableOpacity>
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
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.card,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
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
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  linkText: {
    flex: 1,
    marginLeft: SPACING.md,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  advisorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    ...SHADOWS.card,
  },
  advisorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  advisorInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  advisorName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  advisorRole: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  messageBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CourseScheduleScreen;
