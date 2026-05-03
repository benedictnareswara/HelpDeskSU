import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';

const AIChatScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { chatMessages, sendAIMessage } = useAppStore();
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  // Pre-fill from search
  useEffect(() => {
    if (route.params?.prefillQuestion) {
      const q = route.params.prefillQuestion;
      sendAIMessage(q);
    }
  }, [route.params?.prefillQuestion]);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [chatMessages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendAIMessage(inputText.trim());
    setInputText('');
  };

  const handleActionPress = (screen: string) => {
    // Navigate to HomeTab first, then to the nested screen
    navigation.navigate('HomeTab', { screen });
  };

  const renderMessage = (msg: any) => {
    if (msg.isUser) {
      return (
        <View key={msg.id} style={styles.userMsgContainer}>
          <View style={styles.userBubble}>
            <Text style={styles.userBubbleText}>{msg.text}</Text>
          </View>
        </View>
      );
    }

    return (
      <View key={msg.id} style={styles.aiMsgContainer}>
        <View style={styles.aiAvatarSmall}>
          <Ionicons name="school" size={16} color={COLORS.primary} />
        </View>
        <View style={styles.aiBubbleContainer}>
          <View style={styles.aiBubble}>
            <Text style={styles.aiBubbleText}>{msg.text}</Text>
          </View>
          {msg.actions && msg.actions.length > 0 && (
            <View style={styles.actionsRow}>
              {msg.actions.map((action: any, idx: number) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.actionBtn}
                  onPress={() => handleActionPress(action.screen)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="arrow-forward-circle" size={16} color={COLORS.white} />
                  <Text style={styles.actionBtnText}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={styles.disclaimer}>
            ⚠ This response is AI generated and can make mistakes
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Smart Campus Helpdesk" />
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.messagesScroll}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {chatMessages.map(renderMessage)}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask SmartCampus AI"
              placeholderTextColor={COLORS.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              returnKeyType="send"
              multiline
            />
            <TouchableOpacity style={styles.micBtn}>
              <Ionicons name="mic" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend} activeOpacity={0.7}>
            <Ionicons name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  chatContainer: {
    flex: 1,
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  userMsgContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: SPACING.lg,
  },
  userBubble: {
    backgroundColor: COLORS.chatBubbleUser,
    borderRadius: RADIUS.lg,
    borderBottomRightRadius: SPACING.xs,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    maxWidth: '80%',
  },
  userBubbleText: {
    color: COLORS.chatBubbleUserText,
    fontSize: FONT_SIZES.md,
    lineHeight: 20,
  },
  aiMsgContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    alignItems: 'flex-start',
  },
  aiAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    marginTop: 4,
  },
  aiBubbleContainer: {
    flex: 1,
  },
  aiBubble: {
    backgroundColor: COLORS.chatBubbleBot,
    borderRadius: RADIUS.lg,
    borderBottomLeftRadius: SPACING.xs,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  aiBubbleText: {
    color: COLORS.chatBubbleBotText,
    fontSize: FONT_SIZES.md,
    lineHeight: 22,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
    gap: SPACING.sm,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  actionBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  disclaimer: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    minHeight: 44,
    marginRight: SPACING.sm,
  },
  textInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    maxHeight: 100,
    paddingVertical: SPACING.sm,
  },
  micBtn: {
    padding: SPACING.xs,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AIChatScreen;
