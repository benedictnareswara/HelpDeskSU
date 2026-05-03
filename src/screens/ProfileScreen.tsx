import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import TicketCard from '../components/TicketCard';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';

const ProfileScreen: React.FC = () => {
  const { user, tickets } = useAppStore();

  const ongoingRequests = tickets.filter(
    (t) => t.type === 'form_request' || t.type === 'venue_booking'
  );

  return (
    <View style={styles.container}>
      <Header title="Personal Page" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar & Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={48} color={COLORS.textTertiary} />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userDetails}>
            {user.sid} - {user.major}
          </Text>
        </View>

        {/* Ongoing Requests */}
        <Text style={styles.sectionTitle}>ONGOING REQUEST</Text>
        {ongoingRequests.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}

        {ongoingRequests.length === 0 && (
          <View style={styles.emptyCard}>
            <Ionicons name="document-text-outline" size={32} color={COLORS.textTertiary} />
            <Text style={styles.emptyText}>No ongoing requests</Text>
          </View>
        )}

        <View style={{ height: 24 }} />
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
  profileCard: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  userName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  userDetails: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
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

export default ProfileScreen;
