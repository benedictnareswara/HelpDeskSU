import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import TicketCard from '../components/TicketCard';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';

const RequestHubScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { tickets } = useAppStore();

  const requestTickets = tickets.filter(
    (t) => t.type === 'venue_booking' || t.type === 'form_request'
  );

  return (
    <View style={styles.container}>
      <Header title="Request" onBack={() => navigation.goBack()} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Venue Booking Card */}
        <TouchableOpacity
          style={styles.bigCard}
          onPress={() => navigation.navigate('VenueBookingSelect')}
          activeOpacity={0.7}
        >
          <View style={styles.bigIconContainer}>
            <Ionicons name="location" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.bigCardTitle}>VENUE BOOKING</Text>
        </TouchableOpacity>

        {/* Form Request Card */}
        <TouchableOpacity
          style={styles.bigCard}
          onPress={() => navigation.navigate('FormRequest')}
          activeOpacity={0.7}
        >
          <View style={styles.bigIconContainer}>
            <Ionicons name="document-text" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.bigCardTitle}>FORM REQUEST</Text>
        </TouchableOpacity>

        {/* Ongoing Requests */}
        {requestTickets.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Ongoing Request</Text>
            {requestTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </>
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
  bigCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.xxxl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.card,
  },
  bigIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary + '12',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  bigCardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
});

export default RequestHubScreen;
