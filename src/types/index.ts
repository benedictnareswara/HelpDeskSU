// SmartCampus Type Definitions

export type TicketStatus = 'In Review' | 'Completed' | 'Approved' | 'Declined';

export interface Ticket {
  id: string;
  title: string;
  type: 'complaint' | 'venue_booking' | 'form_request';
  submittedAt: string;
  status: TicketStatus;
  progress: number; // 0-100
  details?: string;
}

export interface UserProfile {
  name: string;
  sid: string;
  major: string;
  avatar?: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  category: 'SAA' | 'Lecturer' | 'All';
  avatar?: string;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  contactRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  category: 'Groups' | 'Lecturer' | 'All';
  messages: Message[];
}

export interface CourseBlock {
  id: string;
  startTime: string;
  endTime: string;
  courseName: string;
  lecturer: string;
  room: string;
  day: string;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  maxCapacity: number;
  available: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  actions?: ChatAction[];
}

export interface ChatAction {
  label: string;
  screen: string;
}

export type FormRequestType =
  | 'Recommendation Letter'
  | 'Cover Letter or Student Statement Letter'
  | 'Academic Document Request'
  | 'Request to Change Major'
  | 'Makeup Exam / Resit'
  | 'Student Withdrawal / Resignation'
  | 'Application for Academic Leave of Absence'
  | 'Research Permit Letter';

export interface FAQItem {
  question: string;
  route?: string;
}
