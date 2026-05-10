import { create } from 'zustand';
import { Ticket, UserProfile, Conversation, ChatMessage, Message, TicketStatus, TicketType } from '../types';
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
  addTicketFollowUp: (id: string, note: string) => void;

  // Conversations
  conversations: Conversation[];
  addMessage: (conversationId: string, text: string) => void;
  addConversation: (contactId: string, contactName: string, contactRole: string, category: 'Groups' | 'Lecturer' | 'All') => string;

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

let convCounter = 10;
const generateConvId = (): string => {
  convCounter += 1;
  return `conv${convCounter}`;
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
      tickets: [{
        ...ticket,
        id: generateTicketId(),
        history: [
          { status: 'Submitted' as const, timestamp: new Date().toLocaleString() },
          ...(ticket.status === 'In Review' ? [{ status: 'In Review' as const, timestamp: new Date().toLocaleString(), note: 'Under review by the relevant department' }] : []),
        ],
      }, ...state.tickets],
    })),

  updateTicketStatus: (id, status) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              progress: status === 'Completed' || status === 'Approved' || status === 'Declined' ? 100 : 50,
              history: [
                ...(t.history || []),
                { status, timestamp: new Date().toLocaleString(), note: `Status updated to ${status}` },
              ],
            }
          : t
      ),
    })),

  addTicketFollowUp: (id: string, note: string) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id
          ? {
              ...t,
              history: [
                ...(t.history || []),
                { status: t.status, timestamp: new Date().toLocaleString(), note: `Follow-up: ${note}` },
              ],
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

  addConversation: (contactId: string, contactName: string, contactRole: string, category: 'Groups' | 'Lecturer' | 'All') => {
    // Check if conversation already exists with this contact
    const existing = get().conversations.find((c) => c.contactId === contactId);
    if (existing) return existing.id;

    const newId = generateConvId();
    const newConv: Conversation = {
      id: newId,
      contactId,
      contactName,
      contactRole,
      lastMessage: '',
      lastMessageTime: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      unread: 0,
      category,
      messages: [],
    };

    set((state) => ({
      conversations: [newConv, ...state.conversations],
    }));

    return newId;
  },

  // AI Chat
  chatMessages: [
    {
      id: 'welcome',
      text: 'Hello! 👋 I\'m the SmartCampus AI assistant. How can I help you today?\n\nYou can ask me about:\n• Recommendation letters\n• BEMKMSU applications\n• Academic calendar\n• Venue bookings\n• Filing complaints\n• Wi-Fi & IT issues\n• Maintenance requests\n• And much more!',
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
      // Try exact match first, then keyword match, then default
      let response = AI_RESPONSES[text];
      if (!response) {
        const lowerText = text.toLowerCase();
        for (const [key, val] of Object.entries(AI_RESPONSES)) {
          if (key !== 'default' && lowerText.includes(key.toLowerCase().split(' ').slice(2).join(' '))) {
            response = val;
            break;
          }
        }
        // Keyword-based matching
        if (!response) {
          if (lowerText.includes('wifi') || lowerText.includes('wi-fi') || lowerText.includes('internet') || lowerText.includes('password')) {
            response = AI_RESPONSES['How do I reset my campus Wi-Fi password?'];
          } else if (lowerText.includes('recommendation') || lowerText.includes('letter')) {
            response = AI_RESPONSES['How do I request a recommendation letter?'];
          } else if (lowerText.includes('bemkm') || lowerText.includes('bem km') || lowerText.includes('organization')) {
            response = AI_RESPONSES['How to apply for BEMKMSU?'];
          } else if (lowerText.includes('calendar') || lowerText.includes('academic') || lowerText.includes('semester')) {
            response = AI_RESPONSES['Where can I find the academic calendar?'];
          } else if (lowerText.includes('venue') || lowerText.includes('book') || lowerText.includes('room')) {
            response = AI_RESPONSES['How do I book a venue?'];
          } else if (lowerText.includes('complaint') || lowerText.includes('voicebox') || lowerText.includes('report')) {
            response = AI_RESPONSES['How to file a complaint?'];
          } else if (lowerText.includes('maintenance') || lowerText.includes('broken') || lowerText.includes('repair') || lowerText.includes('fix')) {
            response = AI_RESPONSES['How do I submit a maintenance request?'];
          } else if (lowerText.includes('office') || lowerText.includes('hours') || lowerText.includes('saa')) {
            response = AI_RESPONSES['What are the office hours for SAA?'];
          }
        }
      }
      if (!response) {
        response = AI_RESPONSES['default'];
      }

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
