import { teacherAvatars } from "./images";

export type Message = {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  tone: "green" | "purple" | "sand";
  online?: boolean;
  lastActive?: string;
  preview: string;
  time: string;
  unread?: number;
  messages: Message[];
};

export const conversations: Conversation[] = [
  {
    id: "priya",
    name: "Dr. Priya Sharma",
    role: "Biology Teacher · DPS",
    avatar: teacherAvatars.priyaSharma,
    tone: "sand",
    online: true,
    preview: "Perfect — I'll forward the rubric before class.",
    time: "2m",
    unread: 2,
    messages: [
      { id: "m1", fromMe: false, text: "Hi Sarah! Did you get a chance to look at the Grade 10 lab rubric?", time: "10:02 AM" },
      { id: "m2", fromMe: true, text: "Yes, just finished reading it. The inquiry rubric section is fantastic — very clear criteria.", time: "10:18 AM" },
      { id: "m3", fromMe: false, text: "So glad it resonated. I spent two weekends on that one 😅", time: "10:20 AM" },
      { id: "m4", fromMe: true, text: "It shows. Would you be okay if I adapt it for AP Bio next term?", time: "10:22 AM" },
      { id: "m5", fromMe: false, text: "Of course, please do. Adapt anything you need.", time: "10:24 AM" },
      { id: "m6", fromMe: false, text: "Perfect — I'll forward the rubric before class.", time: "10:25 AM" },
    ],
  },
  {
    id: "rajesh",
    name: "Principal Mehta",
    role: "Principal · Greenfield Intl",
    avatar: teacherAvatars.rajeshMehta,
    tone: "purple",
    online: false,
    lastActive: "1h ago",
    preview: "Let's meet Thursday to finalize the committee list.",
    time: "1h",
    messages: [
      { id: "m1", fromMe: false, text: "Sarah, great work on the student symposium proposal.", time: "Yesterday 4:10 PM" },
      { id: "m2", fromMe: true, text: "Thank you, sir. The students did most of the heavy lifting.", time: "Yesterday 4:22 PM" },
      { id: "m3", fromMe: false, text: "Let's meet Thursday to finalize the committee list.", time: "Yesterday 4:25 PM" },
    ],
  },
  {
    id: "kavya",
    name: "Dr. Kavya Nair",
    role: "Physics · Modern Heights",
    avatar: teacherAvatars.kavyaNair,
    tone: "green",
    online: true,
    preview: "Sharing the optics lab notes with you now 📎",
    time: "3h",
    unread: 1,
    messages: [
      { id: "m1", fromMe: true, text: "Kavya — how did the optics lab go last week?", time: "Mon 2:30 PM" },
      { id: "m2", fromMe: false, text: "Went really well. Students caught two textbook errors, which was a highlight.", time: "Mon 6:18 PM" },
      { id: "m3", fromMe: false, text: "Sharing the optics lab notes with you now 📎", time: "Mon 6:20 PM" },
    ],
  },
  {
    id: "ananya",
    name: "Ananya Reddy",
    role: "English Literature · DPS",
    avatar: teacherAvatars.ananyaReddy,
    tone: "purple",
    online: false,
    lastActive: "Yesterday",
    preview: "Can I borrow your Grade 10 reading list for inspiration?",
    time: "Yesterday",
    messages: [
      { id: "m1", fromMe: false, text: "Quick question — can I borrow your Grade 10 reading list for inspiration?", time: "Yesterday 11:02 AM" },
      { id: "m2", fromMe: true, text: "Of course! I'll drop it in our shared drive this evening.", time: "Yesterday 11:15 AM" },
    ],
  },
  {
    id: "vikram",
    name: "Vikram Iyer",
    role: "Mathematics · Greenfield Intl",
    avatar: teacherAvatars.vikramIyer,
    tone: "sand",
    online: false,
    lastActive: "2 days ago",
    preview: "Thanks! Board-prep worksheet saved my week.",
    time: "2d",
    messages: [
      { id: "m1", fromMe: true, text: "Passing along the board-prep worksheet I mentioned.", time: "Sat 9:45 AM" },
      { id: "m2", fromMe: false, text: "Thanks! Board-prep worksheet saved my week.", time: "Sat 10:02 AM" },
    ],
  },
  {
    id: "arjun",
    name: "Arjun Krishnan",
    role: "Social Studies · Modern Heights",
    avatar: teacherAvatars.arjunKrishnan,
    tone: "green",
    online: false,
    lastActive: "3 days ago",
    preview: "Debate format worked beautifully. Loved the scaffolded prompts.",
    time: "3d",
    messages: [
      { id: "m1", fromMe: false, text: "Debate format worked beautifully. Loved the scaffolded prompts.", time: "Thu 5:30 PM" },
    ],
  },
];
