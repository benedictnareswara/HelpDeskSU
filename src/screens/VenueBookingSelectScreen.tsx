import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { VENUES } from '../data/mockData';
import { hapticLight } from '../utils/haptics';

const VenueBookingSelectScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedDate, setSelectedDate] = useState('2026-05-05');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');

  const availableVenues = VENUES.filter((v) => v.available);

  const handleVenueSelect = (venue: typeof VENUES[0]) => {
    hapticLight();
    navigation.navigate('VenueBookingForm', {
      venue,
      date: selectedDate,
      startTime,
      endTime,
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Venue Booking" onBack={() => navigation.goBack()} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Date and Time Pickers — Shneiderman Rule 8: Show selected values */}
        <View style={styles.pickerCard}>
          <Text style={styles.pickerLabel}>Date</Text>
          <TouchableOpacity style={styles.pickerBtn} activeOpacity={0.7}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
            <Text style={[styles.pickerValue, { marginLeft: SPACING.sm }]}>{selectedDate}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.textTertiary} />
          </TouchableOpacity>

          <View style={styles.timeRow}>
            <View style={styles.timeCol}>
              <Text style={styles.pickerLabel}>Start Time</Text>
              <TouchableOpacity style={styles.pickerBtn} activeOpacity={0.7}>
                <Ionicons name="time-outline" size={18} color={COLORS.primary} />
                <Text style={[styles.pickerValue, { marginLeft: SPACING.sm }]}>{startTime}</Text>
                <Ionicons name="chevron-down" size={16} color={COLORS.textTertiary} />
              </TouchableOpacity>
            </View>
            <View style={[styles.timeCol, { marginLeft: SPACING.md }]}>
              <Text style={styles.pickerLabel}>End Time</Text>
              <TouchableOpacity style={styles.pickerBtn} activeOpacity={0.7}>
                <Ionicons name="time-outline" size={18} color={COLORS.primary} />
                <Text style={[styles.pickerValue, { marginLeft: SPACING.sm }]}>{endTime}</Text>
                <Ionicons name="chevron-down" size={16} color={COLORS.textTertiary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Available Venues */}
        <Text style={styles.sectionTitle}>Available Venues</Text>
        {availableVenues.length > 0 ? (
          availableVenues.map((venue) => (
            <TouchableOpacity
              key={venue.id}
              style={styles.venueCard}
              onPress={() => handleVenueSelect(venue)}
              activeOpacity={0.7}
            >
              <View style={styles.venueInfo}>
                <Text style={styles.venueName}>{venue.name}</Text>
                <Text style={styles.venueLocation}>{venue.location}</Text>
              </View>
              <View style={styles.capacityBadge}>
                <Ionicons name="people" size={14} color={COLORS.primary} />
                <Text style={[styles.capacityText, { marginLeft: SPACING.xs }]}>{venue.maxCapacity}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons name="location-outline" size={40} color={COLORS.textTertiary} />
            <Text style={styles.emptyTitle}>No venues available</Text>
            <Text style={styles.emptySubtext}>Try selecting a different date or time</Text>
          </View>
        )}

        <View style={{ height: SPACING.xxl }} />
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
  pickerCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.card,
  },
  pickerLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  pickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
    minHeight: MIN_TOUCH_SIZE,
  },
  pickerValue: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  timeRow: {
    flexDirection: 'row',
  },
  timeCol: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  venueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    minHeight: MIN_TOUCH_SIZE + SPACING.lg,
    ...SHADOWS.small,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  venueLocation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  capacityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '12',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  capacityText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
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

export default VenueBookingSelectScreen;
