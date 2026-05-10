import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { Ticket } from '../types';

interface TicketCardProps {
  ticket: Ticket;
  onPress?: () => void;
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

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'complaint':
      return { label: 'Complaint', color: '#E74C3C' };
    case 'venue_booking':
      return { label: 'Venue', color: '#3498DB' };
    case 'form_request':
      return { label: 'Form', color: '#27AE60' };
    case 'maintenance':
      return { label: 'Maintenance', color: '#F39C12' };
    case 'feedback':
      return { label: 'Feedback', color: '#9B59B6' };
    default:
      return { label: 'Other', color: COLORS.textSecondary };
  }
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onPress }) => {
  const statusColor = getStatusColor(ticket.status);
  const statusBg = getStatusBgColor(ticket.status);
  const typeBadge = getTypeBadge(ticket.type);

  const content = (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.titleCol}>
          <Text style={styles.title} numberOfLines={1}>{ticket.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.subtitle}>{ticket.submittedAt}</Text>
            <View style={[styles.typeBadge, { backgroundColor: typeBadge.color + '18' }]}>
              <Text style={[styles.typeText, { color: typeBadge.color }]}>{typeBadge.label}</Text>
            </View>
          </View>
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

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  typeBadge: {
    marginLeft: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 1,
    borderRadius: RADIUS.full,
  },
  typeText: {
    fontSize: 9,
    fontWeight: '700',
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
