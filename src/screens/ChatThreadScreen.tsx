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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZES, SPACING, RADIUS, MIN_TOUCH_SIZE } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { hapticLight } from '../utils/haptics';

const ChatThreadScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { conversations, addMessage } = useAppStore();
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const { conversationId, contactName } = route.params;
  const conversation = conversations.find((c) => c.id === conversationId);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [conversation?.messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    hapticLight();
    addMessage(conversationId, inputText.trim());
    setInputText('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + SPACING.sm }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerAvatar}>
          <Ionicons name="person" size={18} color={COLORS.white} />
        </View>
        <Text style={styles.headerName} numberOfLines={1}>
          {contactName}
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.messagesScroll}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {conversation?.messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.msgContainer,
                msg.isMe ? styles.myMsgContainer : styles.otherMsgContainer,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  msg.isMe ? styles.myBubble : styles.otherBubble,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    msg.isMe ? styles.myBubbleText : styles.otherBubbleText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
              <Text style={styles.msgTime}>{msg.timestamp}</Text>
            </View>
          ))}
          {(!conversation || conversation.messages.length === 0) && (
            <View style={styles.emptyChat}>
              <Ionicons name="chatbubble-outline" size={40} color={COLORS.textTertiary} />
              <Text style={styles.emptyChatText}>Start a conversation</Text>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity
            style={styles.attachBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="attach" size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your Message..."
              placeholderTextColor={COLORS.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
          </View>
          <TouchableOpacity
            style={styles.micBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="mic" size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={18} color={COLORS.white} />
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
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  backBtn: {
    marginRight: SPACING.sm,
    minWidth: MIN_TOUCH_SIZE,
    minHeight: MIN_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  headerName: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
  chatArea: {
    flex: 1,
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
    flexGrow: 1,
  },
  msgContainer: {
    marginBottom: SPACING.lg,
  },
  myMsgContainer: {
    alignItems: 'flex-end',
  },
  otherMsgContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%' as any,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  myBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: SPACING.xs,
  },
  otherBubble: {
    backgroundColor: COLORS.chatBubbleBot,
    borderBottomLeftRadius: SPACING.xs,
  },
  bubbleText: {
    fontSize: FONT_SIZES.md,
    lineHeight: 20,
  },
  myBubbleText: {
    color: COLORS.white,
  },
  otherBubbleText: {
    color: COLORS.textPrimary,
  },
  msgTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginTop: SPACING.xs,
  },
  emptyChat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl * 3,
  },
  emptyChatText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textTertiary,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  attachBtn: {
    padding: SPACING.sm,
    minWidth: MIN_TOUCH_SIZE,
    minHeight: MIN_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.sm,
    height: 40,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  micBtn: {
    padding: SPACING.sm,
    minWidth: MIN_TOUCH_SIZE,
    minHeight: MIN_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.primary + '50',
  },
});

export default ChatThreadScreen;
