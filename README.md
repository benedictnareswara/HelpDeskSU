# 📱 SmartCampus — University Student Service Platform

A centralized cross-platform mobile app (iOS, Android, Web) for university students, built with React Native and Expo. SmartCampus provides AI-powered helpdesk, course scheduling, venue booking, form requests, messaging, and anonymous voicebox features — all in one beautiful app.

## 🎨 Design

The UI faithfully follows the HCI Smart Helpdesk Figma prototype with:
- **Primary**: Deep navy blue (`#1A2FA8`)
- **Accent**: Amber/gold for badges and room tags
- **Status colors**: Green (Completed/Approved), Navy (In Review), Gray (Declined)
- **5-tab bottom navigation**: Home, Schedule, Search/AI, Messages, Profile
- **Clean sans-serif typography** with white-on-navy headers and white content cards

## 📱 All 22 Screens

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Login** | Mock sign-in with name/SID |
| 2 | **Dashboard / Home** | Greeting, search bar, FAQ dropdown, announcement banner, Quick Access grid (8 icons), Progress Tracker |
| 3 | **Course Schedule** | Today's schedule with time blocks, room badges, links to full schedule, Academic Advisor |
| 4 | **Midterm Schedule** | Weekly view (Week 6) with all courses Mon-Fri |
| 5 | **Smart Campus Helpdesk (AI Chat)** | Full chat interface with AI responses, action buttons, disclaimer |
| 6 | **AI: Recommendation Letter** | AI step-by-step instructions + "Go to Request" shortcut |
| 7 | **AI: BEMKMSU Application** | AI contact info + "Go to Contacts" shortcut |
| 8 | **Messages List** | Search, filter tabs (All/Groups/Lecturer), conversation list |
| 9 | **Chat Thread** | Individual conversation with sent/received bubbles, attachment + mic icons |
| 10 | **Personal Page / Profile** | Avatar, student info (name/SID/major), ongoing requests |
| 11 | **Contacts Directory** | Search, filter tabs (All/SAA/Lecturer), alphabetically grouped list |
| 12 | **Calendar** | Academic calendar 2025-2026 in scrollable card |
| 13 | **SU Voicebox** | Anonymous complaint form, ongoing complaints with status badges |
| 14 | **Request Hub** | Two large cards: Venue Booking + Form Request, ongoing requests |
| 15 | **Venue Booking — Select** | Date/time pickers, available venues with capacity badges |
| 16 | **Venue Booking — Form** | Selected venue info, purpose/PIC/email fields |
| 17 | **Venue Booking — Success** | Green checkmark modal overlay |
| 18 | **Form Request** | Auto-filled student info, type dropdown (8 options), note, attachment |
| 19 | **Form Request — Dropdown** | Expanded dropdown showing all request types |
| 20 | **Form Request — Success** | Green checkmark modal overlay |
| 21 | **Maintenance Screen** | Wrench icon + "UNDER MAINTENANCE" message |
| 22 | **AI Default Response** | Generic AI help with multiple navigation shortcuts |

## ⚙️ Features

### Auth & User State
- Mock login flow with persisted user data (name, SID, major)
- All screens auto-populate student info from logged-in state

### Progress Tracker & Tickets
- Tickets with ID (SU-XXXX), title, type, timestamp, status, progress bar
- Synced across Dashboard, Profile, and Request screens
- Status badges: In Review, Completed, Approved, Declined

### AI Helpdesk
- Chat interface with user and AI message bubbles
- Pre-configured responses for common questions
- Inline action buttons deep-linking to other app sections
- "AI generated" disclaimer on every response

### Request System
- **Venue Booking**: date/time selection → available rooms → booking form → success modal → new ticket
- **Form Request**: 8 request types, auto-filled student data, notes, file attachment → success modal → new ticket

### Voicebox
- Anonymous complaint submission
- Complaints appear in ongoing list with status badges

### Messaging
- Conversation list with search and filter tabs
- Real-time chat UI (messages appear on send)

### Search & Navigation
- Global search bar with FAQ dropdown suggestions
- FAQ suggestions deep-link to AI Chat with question pre-filled
- Bottom nav bar on all screens (except modals)
- Back button on all sub-screens

## 🛠 Tech Stack

- **React Native** with **Expo** (SDK 54)
- **React Navigation** (native stack + bottom tabs)
- **Zustand** for global state management
- **TypeScript** for type safety
- **Ionicons** for icons

## 🚀 Setup & Running

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo Go app (for mobile testing)

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on specific platform
npx expo start --ios        # iOS Simulator
npx expo start --android    # Android Emulator
npx expo start --web        # Web browser
```

### Mobile Testing
1. Install **Expo Go** on your phone
2. Run `npx expo start`
3. Scan the QR code with your camera (iOS) or Expo Go (Android)

## 📁 Project Structure

```
HelpDeskSU/
├── App.tsx                         # Root component
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Reusable navy header with back button
│   │   ├── SearchBar.tsx           # Reusable search input
│   │   ├── TicketCard.tsx          # Ticket card with progress bar + status
│   │   └── SuccessModal.tsx        # Green checkmark success overlay
│   ├── data/
│   │   └── mockData.ts            # All mock data (user, tickets, contacts, schedule, etc.)
│   ├── navigation/
│   │   └── AppNavigator.tsx        # Full navigation (tabs + stacks)
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CourseScheduleScreen.tsx
│   │   ├── MidtermScheduleScreen.tsx
│   │   ├── AIChatScreen.tsx
│   │   ├── MessagesListScreen.tsx
│   │   ├── ChatThreadScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ContactsDirectoryScreen.tsx
│   │   ├── CalendarScreen.tsx
│   │   ├── VoiceboxScreen.tsx
│   │   ├── RequestHubScreen.tsx
│   │   ├── VenueBookingSelectScreen.tsx
│   │   ├── VenueBookingFormScreen.tsx
│   │   ├── FormRequestScreen.tsx
│   │   └── MaintenanceScreen.tsx
│   ├── store/
│   │   └── useAppStore.ts         # Zustand store (user, tickets, chat, conversations)
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   └── utils/
│       └── theme.ts               # Design system (colors, fonts, spacing, shadows)
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 Notes

- The app uses **mock AI responses** — to integrate a real LLM API, update the `sendAIMessage` function in `useAppStore.ts`
- File attachment buttons are visual-only placeholders (ready for `expo-document-picker` integration)
- The "Events", "Advising", "Payment", and "Clubs" Quick Access items route to the Maintenance screen as placeholder
