import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { COLORS, FONT_SIZES, SPACING, RADIUS, MIN_TOUCH_SIZE } from '../utils/theme';
import { CONTACTS } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { hapticLight } from '../utils/haptics';

const NewChatScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { addConversation } = useAppStore();
  const [search, setSearch] = useState('');

  const filtered = CONTACTS.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || (c.department || '').toLowerCase().includes(q);
  });

  const grouped = filtered.reduce((acc: Record<string, typeof CONTACTS>, contact) => {
    const letter = contact.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(contact);
    return acc;
  }, {});

  const sections = Object.keys(grouped).sort().map((letter) => ({ title: letter, data: grouped[letter] }));

  const handleSelect = (contact: typeof CONTACTS[0]) => {
    hapticLight();
    const category = contact.category === 'Lecturer' ? 'Lecturer' : 'All';
    const convId = addConversation(contact.id, contact.name, contact.role, category);
    navigation.replace('ChatThread', { conversationId: convId, contactName: contact.name });
  };

  return (
    <View style={styles.container}>
      <Header title="New Chat" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.searchRow}>
          <SearchBar placeholder="Search contacts..." value={search} onChangeText={setSearch} />
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
            <TouchableOpacity style={styles.contactRow} onPress={() => handleSelect(item)} activeOpacity={0.7}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color={COLORS.white} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactRole}>{item.role}</Text>
              </View>
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={48} color={COLORS.textTertiary} />
              <Text style={styles.emptyTitle}>No contacts found</Text>
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
  listContent: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  sectionHeader: { paddingVertical: SPACING.sm, marginTop: SPACING.sm },
  sectionHeaderText: { fontSize: FONT_SIZES.md, fontWeight: '700', color: COLORS.primary },
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.divider, minHeight: MIN_TOUCH_SIZE + SPACING.sm },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  contactInfo: { flex: 1, marginLeft: SPACING.md },
  contactName: { fontSize: FONT_SIZES.md, fontWeight: '600', color: COLORS.textPrimary },
  contactRole: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: 1 },
  emptyContainer: { alignItems: 'center', paddingTop: SPACING.xxxl * 2 },
  emptyTitle: { marginTop: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.textSecondary, fontWeight: '600' },
});

export default NewChatScreen;
