import { create } from 'zustand';
import { Ticket, UserProfile, Conversation, ChatMessage, Message, TicketStatus } from '../types';
import { USER_PROFILE, INITIAL_TICKETS, CONVERSATIONS, AI_RESPONSES } from '../data/mockData';

interface AppState {
  // User
  user: UserProfile;
  isLoggedIn: boolean;
  login: (name: string, sid: string) => void;
  logout: () => void;

  // Tickets
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id'>) => void;
  updateTicketStatus: (id: string, status: TicketStatus) => void;

  // Conversations
  conversations: Conversation[];
  addMessage: (conversationId: string, text: string) => void;

  // AI Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  sendAIMessage: (text: string) => void;
  clearChat: () => void;

  // UI State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isRefreshing: boolean;
  setRefreshing: (val: boolean) => void;
}

let ticketCounter = 1032;

const generateTicketId = (): string => {
  ticketCounter += 1;
  return `SU-${ticketCounter}`;
};

let msgCounter = 100;
const generateMsgId = (): string => {
  msgCounter += 1;
  return `msg-${msgCounter}`;
};

export const useAppStore = create<AppState>((set, get) => ({
  // User state — start logged out so login screen is shown
  user: USER_PROFILE,
  isLoggedIn: false,

  login: (name: string, sid: string) =>
    set({
      isLoggedIn: true,
      user: { ...get().user, name, sid },
    }),

  logout: () => set({ isLoggedIn: false }),

  // Tickets
  tickets: INITIAL_TICKETS,

  addTicket: (ticket) =>
    set((state) => ({
      tickets: [{ ...ticket, id: generateTicketId() }, ...state.tickets],
    })),

  updateTicketStatus: (id, status) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              progress: status === 'Completed' || status === 'Approved' || status === 'Declined' ? 100 : 50,
            }
          : t
      ),
    })),

  // Conversations
  conversations: CONVERSATIONS,

  addMessage: (conversationId: string, text: string) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: text,
              lastMessageTime: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }),
              messages: [
                ...conv.messages,
                {
                  id: generateMsgId(),
                  text,
                  senderId: 'me',
                  timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  }),
                  isMe: true,
                },
              ],
            }
          : conv
      ),
    })),

  // AI Chat
  chatMessages: [
    {
      id: 'welcome',
      text: 'Hello! 👋 I\'m the SmartCampus AI assistant. How can I help you today?\n\nYou can ask me about:\n• Recommendation letters\n• BEMKMSU applications\n• Academic calendar\n• Venue bookings\n• Filing complaints\n• And much more!',
      isUser: false,
      timestamp: new Date().toISOString(),
    },
  ],

  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),

  sendAIMessage: (text: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: generateMsgId(),
      text,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      chatMessages: [...state.chatMessages, userMsg],
    }));

    // Simulate AI response after a short delay
    setTimeout(() => {
      const response = AI_RESPONSES[text] || AI_RESPONSES['default'];
      const aiMsg: ChatMessage = {
        id: generateMsgId(),
        text: response.text,
        isUser: false,
        timestamp: new Date().toISOString(),
        actions: response.actions,
      };

      set((state) => ({
        chatMessages: [...state.chatMessages, aiMsg],
      }));
    }, 800);
  },

  clearChat: () =>
    set({
      chatMessages: [
        {
          id: 'welcome',
          text: 'Hello! 👋 I\'m the SmartCampus AI assistant. How can I help you today?',
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ],
    }),

  // Search / UI
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isRefreshing: false,
  setRefreshing: (val) => set({ isRefreshing: val }),
}));
