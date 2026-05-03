import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';

const TABS = ['All', 'Groups', 'Lecturer'] as const;

const MessagesListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { conversations } = useAppStore();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredConversations = conversations.filter((conv) => {
    if (activeTab !== 'All' && conv.category !== activeTab) return false;
    if (search && !conv.contactName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const renderConversation = ({ item }: any) => (
    <TouchableOpacity
      style={styles.convRow}
      onPress={() =>
        navigation.navigate('ChatThread', {
          conversationId: item.id,
          contactName: item.contactName,
        })
      }
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

        {/* Filter Tabs */}
        <View style={styles.tabRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbubbles-outline" size={40} color={COLORS.textTertiary} />
              <Text style={styles.emptyText}>No conversations found</Text>
            </View>
          }
        />
      </View>
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
    gap: SPACING.sm,
  },
  tab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
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
  },
  convRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  emptyText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textTertiary,
  },
});

export default MessagesListScreen;
