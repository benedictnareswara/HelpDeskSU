import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { hapticLight } from '../utils/haptics';

const TABS = ['All', 'Groups', 'Lecturer'] as const;

const MessagesListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { conversations, isRefreshing, setRefreshing } = useAppStore();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredConversations = conversations.filter((conv) => {
    if (activeTab !== 'All' && conv.category !== activeTab) return false;
    if (search && !conv.contactName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Shneiderman Rule 2: Pull-to-refresh shortcut
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const renderConversation = ({ item }: any) => (
    <TouchableOpacity
      style={styles.convRow}
      onPress={() => {
        hapticLight();
        navigation.navigate('ChatThread', {
          conversationId: item.id,
          contactName: item.contactName,
        });
      }}
      activeOpacity={0.7}
    >
      <View style={styles.avatar}>
        <Ionicons name="person" size={22} color={COLORS.white} />
      </View>
      <View style={styles.convInfo}>
        <Text style={styles.convName}>{item.contactName}</Text>
        <Text style={styles.convPreview} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <Text style={styles.convTime}>{item.lastMessageTime}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Messages" />
      <View style={styles.content}>
        <View style={styles.searchRow}>
          <SearchBar
            placeholder="Search Messages"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filter Tabs — Shneiderman Rule 1: Consistent tab pattern */}
        <View style={styles.tabRow}>
          {TABS.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive,
                index > 0 && { marginLeft: SPACING.sm },
              ]}
              onPress={() => {
                hapticLight();
                setActiveTab(tab);
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredConversations}
          keyExtractor={(item) => item.id}
          renderItem={renderConversation}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbubbles-outline" size={48} color={COLORS.textTertiary} />
              <Text style={styles.emptyTitle}>No conversations found</Text>
              <Text style={styles.emptySubtext}>
                {search ? 'Try a different search term' : 'Your messages will appear here'}
              </Text>
            </View>
          }
        />
      </View>

      {/* New Chat FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          hapticLight();
          navigation.navigate('NewChat');
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="create-outline" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  searchRow: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  tab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  convRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    minHeight: MIN_TOUCH_SIZE + SPACING.md,
  },
  avatar: {
    width: MIN_TOUCH_SIZE,
    height: MIN_TOUCH_SIZE,
    borderRadius: MIN_TOUCH_SIZE / 2,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  convInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  convName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  convPreview: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  convTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: SPACING.xxxl * 2,
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
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});

export default MessagesListScreen;
