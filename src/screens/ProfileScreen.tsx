import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import TicketCard from '../components/TicketCard';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { hapticLight } from '../utils/haptics';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, tickets, isRefreshing, setRefreshing, logout } = useAppStore();

  // Shneiderman Rule 2: Pull-to-refresh shortcut
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Personal Page" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
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

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => {
              hapticLight();
              navigation.navigate('Feedback');
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="star-outline" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Send Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: COLORS.error + '08', borderColor: COLORS.error + '20' }]}
            onPress={() => { hapticLight(); handleLogout(); }}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
            <Text style={[styles.actionText, { color: COLORS.error }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* All Requests */}
        <Text style={styles.sectionTitle}>ALL REQUESTS</Text>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
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
            <Text style={styles.emptyTitle}>No requests yet</Text>
            <Text style={styles.emptySubtext}>Submit a request from the Home screen</Text>
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
  profileCard: { alignItems: 'center', marginBottom: SPACING.xl },
  avatarCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: COLORS.border, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.md },
  userName: { fontSize: FONT_SIZES.xxl, fontWeight: '700', color: COLORS.textPrimary },
  userDetails: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, marginTop: SPACING.xs },
  actionsRow: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.xl },
  actionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary + '08',
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    gap: SPACING.sm,
    minHeight: MIN_TOUCH_SIZE,
  },
  actionText: { fontSize: FONT_SIZES.md, fontWeight: '600', color: COLORS.primary },
  sectionTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textSecondary, letterSpacing: 1, marginBottom: SPACING.md },
  emptyCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: SPACING.xxl, alignItems: 'center', ...SHADOWS.card },
  emptyTitle: { marginTop: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.textSecondary, fontWeight: '600' },
  emptySubtext: { marginTop: SPACING.xs, fontSize: FONT_SIZES.sm, color: COLORS.textTertiary },
});

export default ProfileScreen;
