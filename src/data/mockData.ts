import { Contact, Conversation, CourseBlock, FAQItem, Ticket, UserProfile, Venue, Message } from '../types';

export const USER_PROFILE: UserProfile = {
  name: 'Budi Speed',
  sid: '2023900067',
  major: 'Computer Science',
};

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'SU-1024',
    title: 'Recommendation Letter Request',
    type: 'form_request',
    submittedAt: 'Submitted a day ago',
    status: 'Completed',
    progress: 100,
  },
  {
    id: 'SU-1025',
    title: 'TEDxSU Committee Meeting',
    type: 'venue_booking',
    submittedAt: '25-03-26',
    status: 'Approved',
    progress: 100,
  },
  {
    id: 'SU-1030',
    title: 'Library Wi-Fi Not Working',
    type: 'complaint',
    submittedAt: 'Submitted 2 days ago',
    status: 'In Review',
    progress: 50,
  },
  {
    id: 'SU-1031',
    title: 'Broken AC in Room WF-03',
    type: 'complaint',
    submittedAt: 'Submitted 3 days ago',
    status: 'Declined',
    progress: 100,
  },
];

export const CONTACTS: Contact[] = [
  { id: 'c1', name: 'Arry Ardiansyah', role: 'BEM KM President', category: 'SAA' },
  { id: 'c2', name: 'Ahmad Fauzi', role: 'SAA Staff', category: 'SAA' },
  { id: 'c3', name: 'Budi Santoso', role: 'SAA Staff', category: 'SAA' },
  { id: 'c4', name: 'Cut Mahalayati', role: 'Lecturer – HCI', category: 'Lecturer' },
  { id: 'c5', name: 'Dani Pratama', role: 'SAA Staff', category: 'SAA' },
  { id: 'c6', name: 'Gilang Raka Rayuda Dewa', role: 'Lecturer – Networking', category: 'Lecturer' },
  { id: 'c7', name: 'Panji Darma', role: 'Lecturer – Programming', category: 'Lecturer' },
  { id: 'c8', name: 'Rina Anggraini', role: 'Student Affairs', category: 'SAA' },
  { id: 'c9', name: 'Siti Nurhaliza', role: 'SAA Head', category: 'SAA' },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    contactId: 'c4',
    contactName: 'Cut Mahalayati',
    contactRole: 'Lecturer',
    lastMessage: 'Ms berarti buat HCI boleh diambil ngga ya? Soa...',
    lastMessageTime: '10:30',
    unread: 0,
    category: 'Lecturer',
    messages: [
      {
        id: 'm1',
        text: 'Ms berarti buat HCI boleh diambil ngga ya? Soalnya mau kelas sm sir panji',
        senderId: 'me',
        timestamp: '10:30',
        isMe: true,
      },
    ],
  },
  {
    id: 'conv2',
    contactId: 'c1',
    contactName: 'Arry Ardiansyah',
    contactRole: 'SAA',
    lastMessage: 'Mas Arry kalau saya mau jadi presiden BEM KM ...',
    lastMessageTime: '09:15',
    unread: 0,
    category: 'All',
    messages: [
      {
        id: 'm2',
        text: 'Mas Arry kalau saya mau jadi presiden BEM KM SU harus ngapain ya mas? Makasih',
        senderId: 'me',
        timestamp: '09:15',
        isMe: true,
      },
    ],
  },
];

export const TODAY_SCHEDULE: CourseBlock[] = [
  {
    id: 'cs1',
    startTime: '08:00',
    endTime: '09:30',
    courseName: 'Human Computer Interaction',
    lecturer: 'Panji Darma',
    room: 'WF-03',
    day: 'Mon',
  },
  {
    id: 'cs2',
    startTime: '10:00',
    endTime: '12:30',
    courseName: 'Operating System',
    lecturer: 'Panji Darma',
    room: 'WF-03',
    day: 'Tue',
  },
];

export const WEEKLY_SCHEDULE: CourseBlock[] = [
  {
    id: 'ws1',
    startTime: '08:00',
    endTime: '09:30',
    courseName: 'Human Computer Interaction',
    lecturer: 'Panji Darma',
    room: 'WF-03',
    day: 'Mon',
  },
  {
    id: 'ws2',
    startTime: '10:00',
    endTime: '12:30',
    courseName: 'Operating System',
    lecturer: 'Panji Darma',
    room: 'WF-03',
    day: 'Tue',
  },
  {
    id: 'ws3',
    startTime: '16:00',
    endTime: '17:30',
    courseName: 'Computer Network',
    lecturer: 'Gilang Raka Rayuda Dewa',
    room: 'WF-03',
    day: 'Wed',
  },
  {
    id: 'ws4',
    startTime: '10:00',
    endTime: '12:30',
    courseName: 'Microprocessor',
    lecturer: 'Gilang Raka Rayuda Dewa',
    room: 'WF-03',
    day: 'Thu',
  },
  {
    id: 'ws5',
    startTime: '10:00',
    endTime: '12:30',
    courseName: 'Data Structure',
    lecturer: 'Panji Darma',
    room: 'WF-03',
    day: 'Fri',
  },
];

export const VENUES: Venue[] = [
  { id: 'v1', name: '19F-C3 Classroom', location: 'Building 19F, Floor 3', maxCapacity: 40, available: true },
  { id: 'v2', name: 'Auditorium Hall A', location: 'Main Building, Floor 1', maxCapacity: 200, available: true },
  { id: 'v3', name: 'Meeting Room B2', location: 'Building 12, Floor 2', maxCapacity: 20, available: true },
  { id: 'v4', name: 'Seminar Room 5A', location: 'Building 5, Floor 1', maxCapacity: 60, available: false },
  { id: 'v5', name: 'Lab Computer 3', location: 'Building 7, Floor 3', maxCapacity: 35, available: true },
];

export const FAQ_ITEMS: FAQItem[] = [
  { question: 'How do I request a recommendation letter?' },
  { question: 'How to apply for BEMKMSU?' },
  { question: 'Where can I find the academic calendar?' },
  { question: 'How do I book a venue?' },
  { question: 'How to file a complaint?' },
  { question: 'What are the office hours for SAA?' },
];

export const FORM_REQUEST_TYPES = [
  'Recommendation Letter',
  'Cover Letter or Student Statement Letter',
  'Academic Document Request',
  'Request to Change Major',
  'Makeup Exam / Resit',
  'Student Withdrawal / Resignation',
  'Application for Academic Leave of Absence',
  'Research Permit Letter',
] as const;

export const AI_RESPONSES: Record<string, { text: string; actions?: { label: string; screen: string }[] }> = {
  'How do I request a recommendation letter?': {
    text: `Great question! Here's how to request a Recommendation Letter:\n\n**Step 1:** Go to the Request section\n**Step 2:** Select "Form Request"\n**Step 3:** Choose "Recommendation Letter" from the Type dropdown\n**Step 4:** Fill in the required details including your note and any supporting documents\n**Step 5:** Submit your request\n\nYour request will be reviewed by the Student Affairs office and you can track its progress in the Progress Tracker.`,
    actions: [{ label: 'Go to Request', screen: 'Request' }],
  },
  'How to apply for BEMKMSU?': {
    text: `To apply for **BEMKMSU**, follow these steps:\n\n**Step 1:** Contact the current BEM KM president for application requirements\n**Step 2:** Prepare your CV and motivation letter\n**Step 3:** Submit your application during the open registration period\n\nFor more details, you can contact:\n📧 **Arry Ardiansyah** – BEM KM President`,
    actions: [{ label: 'Go to Contacts', screen: 'Contacts' }],
  },
  default: {
    text: `I'd be happy to help you with that! Let me look into this for you.\n\nBased on your question, here are some helpful steps:\n\n**Step 1:** Check the relevant section in the app\n**Step 2:** If you need further assistance, contact the Student Affairs office\n**Step 3:** You can also file a request through the Request hub\n\nIs there anything else I can help you with?`,
    actions: [
      { label: 'Go to Request', screen: 'Request' },
      { label: 'Go to Contacts', screen: 'Contacts' },
    ],
  },
};
