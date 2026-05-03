import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { Ticket } from '../types';

interface TicketCardProps {
  ticket: Ticket;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return COLORS.statusCompleted;
    case 'Approved':
      return COLORS.statusApproved;
    case 'In Review':
      return COLORS.statusInReview;
    case 'Declined':
      return COLORS.statusDeclined;
    default:
      return COLORS.textSecondary;
  }
};

const getStatusBgColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return '#E8F5E9';
    case 'Approved':
      return '#E8F5E9';
    case 'In Review':
      return '#E8EAF6';
    case 'Declined':
      return '#F5F5F5';
    default:
      return '#F5F5F5';
  }
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const statusColor = getStatusColor(ticket.status);
  const statusBg = getStatusBgColor(ticket.status);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.titleCol}>
          <Text style={styles.title} numberOfLines={1}>{ticket.title}</Text>
          <Text style={styles.subtitle}>{ticket.submittedAt}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{ticket.status}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${ticket.progress}%`,
                backgroundColor: statusColor,
              },
            ]}
          />
        </View>
      </View>
      <Text style={styles.ticketId}>{ticket.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.card,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  titleCol: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
  },
  progressContainer: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  progressBg: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  ticketId: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginTop: SPACING.xs,
  },
});

export default TicketCard;
