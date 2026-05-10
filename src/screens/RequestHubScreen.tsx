import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import TicketCard from '../components/TicketCard';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { hapticLight } from '../utils/haptics';

const RequestHubScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { tickets } = useAppStore();

  const requestTickets = tickets.filter(
    (t) => t.type === 'venue_booking' || t.type === 'form_request' || t.type === 'maintenance'
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
          onPress={() => {
            hapticLight();
            navigation.navigate('VenueBookingSelect');
          }}
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
          onPress={() => {
            hapticLight();
            navigation.navigate('FormRequest');
          }}
          activeOpacity={0.7}
        >
          <View style={styles.bigIconContainer}>
            <Ionicons name="document-text" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.bigCardTitle}>FORM REQUEST</Text>
        </TouchableOpacity>

        {/* Maintenance Request Card */}
        <TouchableOpacity
          style={styles.bigCard}
          onPress={() => {
            hapticLight();
            navigation.navigate('MaintenanceRequest');
          }}
          activeOpacity={0.7}
        >
          <View style={[styles.bigIconContainer, { backgroundColor: '#F39C12' + '12' }]}>
            <Ionicons name="construct" size={40} color="#F39C12" />
          </View>
          <Text style={styles.bigCardTitle}>MAINTENANCE REQUEST</Text>
        </TouchableOpacity>

        {/* Ongoing Requests */}
        <Text style={styles.sectionTitle}>Ongoing Request</Text>
        {requestTickets.length > 0 ? (
          requestTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onPress={() => {
                hapticLight();
                navigation.navigate('TicketDetail', { ticket });
              }}
            />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons name="document-text-outline" size={40} color={COLORS.textTertiary} />
            <Text style={styles.emptyTitle}>No ongoing requests</Text>
            <Text style={styles.emptySubtext}>Book a venue, submit a form, or report an issue above</Text>
          </View>
        )}

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { padding: SPACING.lg },
  bigCard: { backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, paddingVertical: SPACING.xxxl, alignItems: 'center', marginBottom: SPACING.lg, ...SHADOWS.card },
  bigIconContainer: { width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.primary + '12', alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.md },
  bigCardTitle: { fontSize: FONT_SIZES.lg, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: 1 },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: '700', color: COLORS.textPrimary, marginTop: SPACING.md, marginBottom: SPACING.md },
  emptyCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: SPACING.xxl, alignItems: 'center', ...SHADOWS.card },
  emptyTitle: { marginTop: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.textSecondary, fontWeight: '600' },
  emptySubtext: { marginTop: SPACING.xs, fontSize: FONT_SIZES.sm, color: COLORS.textTertiary, textAlign: 'center' },
});

export default RequestHubScreen;
