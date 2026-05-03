import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  RefreshControl,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { FAQ_ITEMS } from '../data/mockData';
import TicketCard from '../components/TicketCard';
import { hapticLight } from '../utils/haptics';

const { width } = Dimensions.get('window');

const QUICK_ACCESS_ITEMS = [
  { label: 'Contacts', icon: 'people', screen: 'Contacts', color: '#4A90D9' },
  { label: 'Calendar', icon: 'calendar', screen: 'Calendar', color: '#E67E22' },
  { label: 'Voicebox', icon: 'megaphone', screen: 'Voicebox', color: '#9B59B6' },
  { label: 'Request', icon: 'document-text', screen: 'Request', color: '#27AE60' },
  { label: 'Events', icon: 'calendar-outline', screen: 'Maintenance', color: '#E74C3C' },
  { label: 'Advising', icon: 'school', screen: 'Maintenance', color: '#3498DB' },
  { label: 'Payment', icon: 'card', screen: 'Maintenance', color: '#F39C12' },
  { label: 'Clubs', icon: 'people-circle', screen: 'Maintenance', color: '#1ABC9C' },
];

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { user, tickets, searchQuery, setSearchQuery, sendAIMessage, isRefreshing, setRefreshing } = useAppStore();
  const [showFAQ, setShowFAQ] = useState(false);

  const activeTickets = tickets.filter((t) => t.status === 'In Review' || t.status === 'Completed');

  // Shneiderman Rule 2: Pull-to-refresh shortcut for frequent users
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleFAQPress = (question: string) => {
    hapticLight();
    setShowFAQ(false);
    setSearchQuery('');
    sendAIMessage(question);
    navigation.navigate('SearchTab', { screen: 'AIChat' });
  };

  const handleFileComplaint = () => {
    hapticLight();
    setShowFAQ(false);
    setSearchQuery('');
    navigation.navigate('Voicebox');
  };

  return (
    <View style={styles.container}>
      {/* Navy Header */}
      <View style={[styles.header, { paddingTop: insets.top + SPACING.md }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Hello {user.name},</Text>
          </View>
          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => {
              hapticLight();
              navigation.navigate('Maintenance');
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.textTertiary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Ask SmartCampus AI"
              placeholderTextColor={COLORS.textTertiary}
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                setShowFAQ(text.length > 0);
              }}
              onFocus={() => setShowFAQ(true)}
              onBlur={() => setTimeout(() => setShowFAQ(false), 200)}
              returnKeyType="search"
            />
            <TouchableOpacity
              onPress={() => {
                if (searchQuery.trim()) {
                  hapticLight();
                  sendAIMessage(searchQuery.trim());
                  setSearchQuery('');
                  navigation.navigate('SearchTab', { screen: 'AIChat' });
                }
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="mic" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* FAQ Dropdown */}
      {showFAQ && (
        <View style={styles.faqDropdown}>
          {FAQ_ITEMS.filter((f) =>
            f.question.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqItem}
              onPress={() => handleFAQPress(faq.question)}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={16} color={COLORS.primary} />
              <Text style={styles.faqText}>{faq.question}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.faqComplaint} onPress={handleFileComplaint}>
            <Ionicons name="warning-outline" size={16} color={COLORS.accent} />
            <Text style={styles.faqComplaintText}>File a Complaint</Text>
          </TouchableOpacity>
        </View>
      )}

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
        {/* Announcement Banner */}
        <TouchableOpacity
          style={styles.announcementCard}
          activeOpacity={0.85}
          onPress={() => {
            hapticLight();
            navigation.navigate('SearchTab', { screen: 'AIChat' });
          }}
        >
          <View style={styles.announcementRow}>
            <View style={styles.announcementContent}>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>New</Text>
              </View>
              <Text style={styles.announcementTitle}>Smart Campus Helpdesk</Text>
              <Text style={styles.announcementDesc}>
                AI-powered student assistance is now available!
              </Text>
            </View>
            <View style={styles.announcementIcon}>
              <Ionicons name="school" size={48} color={COLORS.primary} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Access Grid */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickGrid}>
          {QUICK_ACCESS_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickItem}
              onPress={() => {
                hapticLight();
                navigation.navigate(item.screen);
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.quickIconContainer, { backgroundColor: item.color + '18' }]}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text style={styles.quickLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Progress Tracker */}
        <Text style={styles.sectionTitle}>Progress Tracker</Text>
        {activeTickets.length > 0 ? (
          activeTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons name="checkmark-circle-outline" size={40} color={COLORS.textTertiary} />
            <Text style={styles.emptyText}>No active requests</Text>
            <Text style={styles.emptySubtext}>Your submissions will appear here</Text>
          </View>
        )}

        {/* Bottom spacing for tab bar */}
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
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.white,
  },
  notifBtn: {
    width: MIN_TOUCH_SIZE,
    height: MIN_TOUCH_SIZE,
    borderRadius: MIN_TOUCH_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    marginTop: SPACING.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: MIN_TOUCH_SIZE,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  faqDropdown: {
    position: 'absolute',
    top: 160,
    left: SPACING.lg,
    right: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    ...SHADOWS.card,
    zIndex: 100,
    paddingVertical: SPACING.sm,
    elevation: 10,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    minHeight: MIN_TOUCH_SIZE,
  },
  faqText: {
    marginLeft: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  faqComplaint: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    minHeight: MIN_TOUCH_SIZE,
  },
  faqComplaintText: {
    marginLeft: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.accent,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  announcementCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.card,
  },
  announcementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  announcementContent: {
    flex: 1,
  },
  newBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.md,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  newBadgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
  },
  announcementTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  announcementDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  announcementIcon: {
    marginLeft: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  quickItem: {
    width: (width - SPACING.lg * 2 - SPACING.md * 3) / 4,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    minHeight: MIN_TOUCH_SIZE,
  },
  quickIconContainer: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  quickLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.xxl,
    alignItems: 'center',
    ...SHADOWS.card,
  },
  emptyText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textTertiary,
    fontWeight: '600',
  },
  emptySubtext: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
  },
});

export default HomeScreen;
