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
    details: 'Requested a recommendation letter for graduate school application. Letter addressed to MIT Admissions Office.',
    history: [
      { status: 'Submitted', timestamp: '2026-05-08 09:15' },
      { status: 'In Review', timestamp: '2026-05-08 14:30', note: 'Assigned to Dr. Panji Darma' },
      { status: 'Completed', timestamp: '2026-05-09 10:00', note: 'Letter signed and uploaded to student portal' },
    ],
  },
  {
    id: 'SU-1025',
    title: 'TEDxSU Committee Meeting',
    type: 'venue_booking',
    submittedAt: '25-03-26',
    status: 'Approved',
    progress: 100,
    details: 'Booking Auditorium Hall A for TEDxSU Committee planning meeting. Expected 45 attendees.',
    venueName: 'Auditorium Hall A',
    venueDate: '2026-04-01',
    venueStartTime: '14:00',
    venueEndTime: '17:00',
    purpose: 'TEDxSU Committee planning meeting and speaker rehearsal',
    pic: 'Budi Speed',
    email: 'budi.speed@student.su.ac.id',
    history: [
      { status: 'Submitted', timestamp: '2026-03-25 11:00' },
      { status: 'In Review', timestamp: '2026-03-25 14:00', note: 'Checking venue availability' },
      { status: 'Approved', timestamp: '2026-03-26 09:30', note: 'Venue confirmed. Please arrive 30 minutes early for setup.' },
    ],
  },
  {
    id: 'SU-1030',
    title: 'Library Wi-Fi Not Working',
    type: 'complaint',
    submittedAt: 'Submitted 2 days ago',
    status: 'In Review',
    progress: 50,
    details: 'The Wi-Fi in the 3rd floor library study area has been intermittent since Monday. Multiple students affected. Cannot load research papers or access online materials.',
    history: [
      { status: 'Submitted', timestamp: '2026-05-08 16:45' },
      { status: 'In Review', timestamp: '2026-05-09 08:00', note: 'IT team notified and investigating' },
    ],
  },
  {
    id: 'SU-1031',
    title: 'Broken AC in Room WF-03',
    type: 'complaint',
    submittedAt: 'Submitted 3 days ago',
    status: 'Declined',
    progress: 100,
    details: 'Air conditioning in classroom WF-03 is not cooling properly. Room temperature reaches 32°C during afternoon classes.',
    location: 'Building WF, Room WF-03',
    category: 'AC/HVAC',
    history: [
      { status: 'Submitted', timestamp: '2026-05-07 10:30' },
      { status: 'In Review', timestamp: '2026-05-07 14:00', note: 'Facilities team dispatched' },
      { status: 'Declined', timestamp: '2026-05-08 11:00', note: 'AC unit scheduled for replacement next semester. Portable fans provided as temporary solution.' },
    ],
  },
];

export const CONTACTS: Contact[] = [
  { id: 'c1', name: 'Arry Ardiansyah', role: 'BEM KM President', category: 'SAA', email: 'arry.a@su.ac.id', phone: '+62 812-3456-7890', department: 'Student Organization' },
  { id: 'c2', name: 'Ahmad Fauzi', role: 'SAA Staff', category: 'SAA', email: 'ahmad.f@su.ac.id', phone: '+62 813-2345-6789', department: 'Student Affairs' },
  { id: 'c3', name: 'Budi Santoso', role: 'SAA Staff', category: 'SAA', email: 'budi.s@su.ac.id', phone: '+62 814-3456-7890', department: 'Student Affairs' },
  { id: 'c4', name: 'Cut Mahalayati', role: 'Lecturer – HCI', category: 'Lecturer', email: 'cut.m@su.ac.id', phone: '+62 815-4567-8901', department: 'Computer Science' },
  { id: 'c5', name: 'Dani Pratama', role: 'SAA Staff', category: 'SAA', email: 'dani.p@su.ac.id', phone: '+62 816-5678-9012', department: 'Student Affairs' },
  { id: 'c6', name: 'Gilang Raka Rayuda Dewa', role: 'Lecturer – Networking', category: 'Lecturer', email: 'gilang.r@su.ac.id', phone: '+62 817-6789-0123', department: 'Computer Science' },
  { id: 'c7', name: 'Panji Darma', role: 'Lecturer – Programming', category: 'Lecturer', email: 'panji.d@su.ac.id', phone: '+62 818-7890-1234', department: 'Computer Science' },
  { id: 'c8', name: 'Rina Anggraini', role: 'Student Affairs', category: 'SAA', email: 'rina.a@su.ac.id', phone: '+62 819-8901-2345', department: 'Student Affairs' },
  { id: 'c9', name: 'Siti Nurhaliza', role: 'SAA Head', category: 'SAA', email: 'siti.n@su.ac.id', phone: '+62 820-9012-3456', department: 'Student Affairs' },
  { id: 'c10', name: 'Hendra Wijaya', role: 'IT Support Lead', category: 'SAA', email: 'hendra.w@su.ac.id', phone: '+62 821-0123-4567', department: 'IT Services' },
  { id: 'c11', name: 'Teguh Prasetyo', role: 'IT Helpdesk Staff', category: 'SAA', email: 'teguh.p@su.ac.id', phone: '+62 822-1234-5678', department: 'IT Services' },
  { id: 'c12', name: 'Wawan Kurniawan', role: 'Facilities Manager', category: 'SAA', email: 'wawan.k@su.ac.id', phone: '+62 823-2345-6789', department: 'Facilities' },
  { id: 'c13', name: 'Yanti Susanti', role: 'Facilities Coordinator', category: 'SAA', email: 'yanti.s@su.ac.id', phone: '+62 824-3456-7890', department: 'Facilities' },
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
  {
    id: 'conv3',
    contactId: 'c10',
    contactName: 'Hendra Wijaya',
    contactRole: 'SAA',
    lastMessage: 'Hi, I need help with my campus Wi-Fi account...',
    lastMessageTime: '08:45',
    unread: 1,
    category: 'All',
    messages: [
      {
        id: 'm3',
        text: 'Hi, I need help with my campus Wi-Fi account. It keeps disconnecting.',
        senderId: 'me',
        timestamp: '08:30',
        isMe: true,
      },
      {
        id: 'm4',
        text: 'Hi Budi! I can help with that. Have you tried resetting your password through the student portal? Go to portal.su.ac.id/wifi-reset. If that doesn\'t work, visit the IT helpdesk at Building 7, Ground Floor.',
        senderId: 'c10',
        timestamp: '08:45',
        isMe: false,
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
  { question: 'How do I reset my campus Wi-Fi password?' },
  { question: 'How do I submit a maintenance request?' },
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

export const MAINTENANCE_CATEGORIES = [
  'Electrical',
  'Plumbing',
  'AC/HVAC',
  'Furniture',
  'IT Equipment',
  'Cleaning',
  'Safety/Security',
  'Other',
] as const;

export const CAMPUS_LOCATIONS = [
  'Building 5 – Lecture Hall',
  'Building 7 – Computer Lab',
  'Building 12 – Meeting Rooms',
  'Building 19F – Classrooms',
  'Main Building – Auditorium',
  'Main Building – Lobby',
  'Library – 1st Floor',
  'Library – 2nd Floor',
  'Library – 3rd Floor',
  'Cafeteria',
  'Student Center',
  'Sports Complex',
  'Parking Area',
  'Other',
] as const;

export const FEEDBACK_CATEGORIES = [
  'App Experience',
  'AI Helpdesk',
  'Request System',
  'Venue Booking',
  'Course Schedule',
  'General',
  'Other',
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
  'How do I reset my campus Wi-Fi password?': {
    text: `Here's how to reset your campus Wi-Fi password:\n\n**Step 1:** Go to **portal.su.ac.id/wifi-reset** in your browser\n**Step 2:** Log in with your Student ID (SID)\n**Step 3:** Click "Reset Wi-Fi Password"\n**Step 4:** Enter your new password (minimum 8 characters, must include a number)\n**Step 5:** Reconnect to the **SU-Campus** network using your new password\n\n**Still having issues?**\n• Visit the IT Helpdesk at **Building 7, Ground Floor** (Mon–Fri, 08:00–16:00)\n• Contact **Hendra Wijaya** (IT Support Lead) via the Contacts directory\n• Or call the IT hotline: **+62 821-0123-4567**\n\n💡 **Tip:** If your device keeps disconnecting, try "forgetting" the network first, then reconnecting.`,
    actions: [
      { label: 'Go to Contacts', screen: 'Contacts' },
    ],
  },
  'Where can I find the academic calendar?': {
    text: `You can find the **Academic Calendar 2025-2026** right here in the app!\n\n**Step 1:** Go to the Home screen\n**Step 2:** Tap "Calendar" in the Quick Access grid\n\nKey dates to remember:\n📅 **Oct 6-10** — Midterm Exams (Week 6)\n📅 **Dec 8-19** — Final Exams\n📅 **Jan 5** — Spring Semester Begins\n📅 **Mar 16-20** — Spring Break\n📅 **May 20** — Commencement`,
    actions: [{ label: 'Go to Calendar', screen: 'Calendar' }],
  },
  'How do I book a venue?': {
    text: `Here's how to book a venue on campus:\n\n**Step 1:** Go to the Request section\n**Step 2:** Select "Venue Booking"\n**Step 3:** Choose your preferred date and time\n**Step 4:** Browse available venues and select one\n**Step 5:** Fill in the booking form (purpose, PIC, email)\n**Step 6:** Submit your request\n\nYou'll receive a confirmation once your booking is approved. You can track the status in the Progress Tracker on your Home screen or Profile page.`,
    actions: [{ label: 'Go to Request', screen: 'Request' }],
  },
  'How to file a complaint?': {
    text: `To file a complaint through the **SU Voicebox**:\n\n**Step 1:** Go to the Home screen\n**Step 2:** Tap "Voicebox" in the Quick Access grid\n**Step 3:** Describe your complaint in the text area\n**Step 4:** Optionally attach a voice note using the mic button\n**Step 5:** Tap the send button to submit\n\nYour complaint is filed **anonymously** — your identity is protected. You can track the status of your complaints at the bottom of the Voicebox screen.\n\n💡 You can also submit maintenance issues through the Request → Maintenance Request option.`,
    actions: [{ label: 'Go to Voicebox', screen: 'Voicebox' }],
  },
  'How do I submit a maintenance request?': {
    text: `To submit a maintenance request:\n\n**Step 1:** Go to the Request section from the Home screen\n**Step 2:** Select "Maintenance Request"\n**Step 3:** Choose the building/location of the issue\n**Step 4:** Select the issue category (Electrical, Plumbing, AC, etc.)\n**Step 5:** Describe the problem in detail\n**Step 6:** Set the urgency level\n**Step 7:** Submit your request\n\nYou'll receive a ticket number for tracking. The facilities team typically responds within 24-48 hours for non-urgent requests.`,
    actions: [{ label: 'Go to Request', screen: 'Request' }],
  },
  'What are the office hours for SAA?': {
    text: `The **Student Affairs & Administration (SAA)** office hours are:\n\n🕐 **Monday – Friday:** 08:00 – 16:00\n🕐 **Saturday:** 08:00 – 12:00 (limited services)\n🚫 **Sunday:** Closed\n\n📍 **Location:** Main Building, 2nd Floor, Room 201\n\n**Key contacts:**\n• **Siti Nurhaliza** — SAA Head\n• **Ahmad Fauzi** — General inquiries\n• **Rina Anggraini** — Student affairs\n\n💡 For urgent matters outside office hours, use the SmartCampus AI helpdesk or the SU Voicebox.`,
    actions: [{ label: 'Go to Contacts', screen: 'Contacts' }],
  },
  default: {
    text: `I'd be happy to help you with that! Let me look into this for you.\n\nBased on your question, here are some helpful resources:\n\n**📋 Submit a Request** — For letters, documents, or venue bookings\n**🔧 Maintenance** — Report facility issues through the Request hub\n**📞 Contacts** — Find staff and lecturer contact info\n**📅 Calendar** — Check the academic calendar\n**💬 Voicebox** — File anonymous complaints\n\nYou can also try asking me more specific questions like:\n• "How do I reset my campus Wi-Fi password?"\n• "How do I book a venue?"\n• "How do I submit a maintenance request?"\n\nIs there anything else I can help you with?`,
    actions: [
      { label: 'Go to Request', screen: 'Request' },
      { label: 'Go to Contacts', screen: 'Contacts' },
    ],
  },
};
