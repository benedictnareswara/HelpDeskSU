import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SectionList, RefreshControl, Alert, Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { COLORS, FONT_SIZES, SPACING, RADIUS, MIN_TOUCH_SIZE, SHADOWS } from '../utils/theme';
import { CONTACTS } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { hapticLight } from '../utils/haptics';

const TABS = ['All', 'SAA', 'Lecturer'] as const;

const ContactsDirectoryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isRefreshing, setRefreshing, addConversation } = useAppStore();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = CONTACTS.filter((c) => {
    if (activeTab !== 'All' && c.category !== activeTab) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        (c.department || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const grouped = filtered.reduce((acc: Record<string, typeof CONTACTS>, contact) => {
    const letter = contact.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(contact);
    return acc;
  }, {});

  const sections = Object.keys(grouped).sort().map((letter) => ({ title: letter, data: grouped[letter] }));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleContactPress = (contact: typeof CONTACTS[0]) => {
    hapticLight();
    const options = [];
    if (contact.email) {
      options.push({ text: `📧 Email: ${contact.email}`, onPress: () => Linking.openURL(`mailto:${contact.email}`) });
    }
    if (contact.phone) {
      options.push({ text: `📞 Call: ${contact.phone}`, onPress: () => Linking.openURL(`tel:${contact.phone}`) });
    }
    options.push({
      text: '💬 Send Message',
      onPress: () => {
        const cat = contact.category === 'Lecturer' ? 'Lecturer' : 'All';
        const convId = addConversation(contact.id, contact.name, contact.role, cat as any);
        navigation.navigate('MessagesTab', { screen: 'ChatThread', params: { conversationId: convId, contactName: contact.name } });
      },
    });
    options.push({ text: 'Cancel', style: 'cancel' as const });

    Alert.alert(
      contact.name,
      `${contact.role}${contact.department ? ` • ${contact.department}` : ''}`,
      options
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Contacts" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.searchRow}>
          <SearchBar placeholder="Search by name, role, or department" value={search} onChangeText={setSearch} />
        </View>

        <View style={styles.tabRow}>
          {TABS.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive, index > 0 && { marginLeft: SPACING.sm }]}
              onPress={() => { hapticLight(); setActiveTab(tab); }}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.contactRow} onPress={() => handleContactPress(item)} activeOpacity={0.7}>
              <View style={styles.contactAvatar}>
                <Ionicons name="person" size={20} color={COLORS.white} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactRole}>{item.role}</Text>
                {item.department && <Text style={styles.contactDept}>{item.department}</Text>}
              </View>
              <View style={styles.contactActions}>
                {item.email && <Ionicons name="mail-outline" size={16} color={COLORS.textTertiary} style={{ marginRight: 6 }} />}
                {item.phone && <Ionicons name="call-outline" size={16} color={COLORS.textTertiary} />}
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={48} color={COLORS.textTertiary} />
              <Text style={styles.emptyTitle}>No contacts found</Text>
              <Text style={styles.emptySubtext}>{search ? 'Try a different search term' : 'Contacts will appear here'}</Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1 },
  searchRow: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg, paddingBottom: SPACING.md },
  tabRow: { flexDirection: 'row', paddingHorizontal: SPACING.lg, marginBottom: SPACING.md },
  tab: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.white, minHeight: 36, alignItems: 'center', justifyContent: 'center' },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontWeight: '500' },
  tabTextActive: { color: COLORS.white, fontWeight: '600' },
  listContent: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  sectionHeader: { paddingVertical: SPACING.sm, marginTop: SPACING.sm },
  sectionHeaderText: { fontSize: FONT_SIZES.md, fontWeight: '700', color: COLORS.primary },
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.divider, minHeight: MIN_TOUCH_SIZE + SPACING.sm },
  contactAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  contactInfo: { flex: 1, marginLeft: SPACING.md },
  contactName: { fontSize: FONT_SIZES.md, fontWeight: '600', color: COLORS.textPrimary },
  contactRole: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: 1 },
  contactDept: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 1 },
  contactActions: { flexDirection: 'row', alignItems: 'center' },
  emptyContainer: { alignItems: 'center', paddingTop: SPACING.xxxl * 2 },
  emptyTitle: { marginTop: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.textSecondary, fontWeight: '600' },
  emptySubtext: { marginTop: SPACING.xs, fontSize: FONT_SIZES.sm, color: COLORS.textTertiary },
});

export default ContactsDirectoryScreen;
