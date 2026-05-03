import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';

const { width } = Dimensions.get('window');

const CalendarScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // Academic calendar data as a structured representation
  const calendarData = [
    { month: 'August 2025', events: ['18 - Orientation Day', '25 - Classes Begin'] },
    { month: 'September 2025', events: ['8 - Last Day Add/Drop', '15 - Holiday'] },
    { month: 'October 2025', events: ['6-10 - Midterm Exams (Week 6)', '20 - Academic Advising'] },
    { month: 'November 2025', events: ['10 - Registration Opens', '24-28 - Thanksgiving Break'] },
    { month: 'December 2025', events: ['8-19 - Final Exams', '20 - Semester Ends'] },
    { month: 'January 2026', events: ['5 - Spring Semester Begins', '12 - Last Day Add/Drop'] },
    { month: 'February 2026', events: ['16 - Holiday'] },
    { month: 'March 2026', events: ['2-6 - Midterm Exams', '16-20 - Spring Break'] },
    { month: 'April 2026', events: ['6 - Registration Opens', '20 - Academic Advising'] },
    { month: 'May 2026', events: ['4-15 - Final Exams', '20 - Commencement'] },
  ];

  return (
    <View style={styles.container}>
      <Header title="Calendar" onBack={() => navigation.goBack()} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Academic Calendar 2025-2026</Text>
          {calendarData.map((month, index) => (
            <View key={index} style={styles.monthBlock}>
              <View style={styles.monthHeader}>
                <Ionicons name="calendar" size={16} color={COLORS.primary} />
                <Text style={styles.monthName}>{month.month}</Text>
              </View>
              {month.events.map((event, eIdx) => (
                <View key={eIdx} style={styles.eventRow}>
                  <View style={styles.eventDot} />
                  <Text style={styles.eventText}>{event}</Text>
                </View>
              ))}
            </View>
          ))}
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
    ...SHADOWS.card,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  monthBlock: {
    marginBottom: SPACING.lg,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    paddingBottom: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  monthName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SPACING.xxl,
    paddingVertical: SPACING.xs,
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    marginRight: SPACING.sm,
  },
  eventText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});

export default CalendarScreen;
