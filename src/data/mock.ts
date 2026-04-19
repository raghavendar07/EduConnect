import { Session } from "../components/cards/SessionCard";
import { Post } from "../components/cards/PostCard";
import { teacherAvatars, feedImages } from "./images";

const sarahAuthor = {
  id: "sarah-iyer",
  name: "Sarah Iyer",
  role: "Biology Teacher",
  school: "Delhi Public School",
  tone: "purple" as const,
  avatar: "https://i.pravatar.cc/300?img=48",
};

export const sessions: Session[] = [
  {
    type: "1:1 Session",
    title: "Cell Respiration Deep Dive",
    course: "AP Biology",
    grade: "Grade 10",
    duration: "1 Hr",
    time: "Tomorrow, 6 PM",
    mode: "Online",
    tone: "green",
    attendees: [
      { name: "Dr. Kavya Nair", tone: "green", src: teacherAvatars.kavyaNair },
    ],
  },
  {
    type: "Group Session",
    title: "Faculty Curriculum Workshop",
    course: "AP Biology",
    grade: "Grade 10",
    duration: "1 Hr",
    time: "Friday, 6 PM",
    mode: "Online",
    tone: "purple",
    attendees: [
      { name: "Ananya Reddy", tone: "purple", src: teacherAvatars.ananyaReddy },
      { name: "Vikram Iyer", tone: "sand", src: teacherAvatars.vikramIyer },
      { name: "Arjun Krishnan", tone: "green", src: teacherAvatars.arjunKrishnan },
      { name: "Rajesh Mehta", tone: "purple", src: teacherAvatars.rajeshMehta },
    ],
  },
  {
    type: "1:1 Session",
    title: "Cell Respiration Kickoff",
    course: "AP Biology",
    grade: "Grade 10",
    duration: "1 Hr",
    time: "Friday, 6 PM",
    mode: "Online",
    tone: "sand",
    attendees: [
      { name: "Ananya Reddy", tone: "sand", src: teacherAvatars.ananyaReddy },
    ],
  },
];

export const posts: Post[] = [
  {
    author: {
      id: "dr-priya-sharma",
      name: "Dr. Priya Sharma",
      role: "Biology Teacher",
      school: "Delhi Public School",
      tone: "sand",
      avatar: teacherAvatars.priyaSharma,
    },
    title: "Three Students Selected for Regional Science Symposium",
    excerpt:
      "Our cell biology unit has produced remarkable student research. The quality of hypothesis formulation and data analysis exceeded…",
    time: "Today, 6 PM",
    images: [feedImages.studentsAtDesks],
    stats: { likes: 50, comments: 50 },
  },
  {
    author: {
      id: "dr-priya-sharma",
      name: "Dr. Priya Sharma",
      role: "Biology Teacher",
      school: "Delhi Public School",
      tone: "sand",
      avatar: teacherAvatars.priyaSharma,
    },
    title: "Snapshots from Our Weekend Science Club",
    excerpt:
      "A peek into the weekend lab sessions — microscope work, peer reviews, and a lot of curious questions from our Grade 10 cohort.",
    time: "Today, 6 PM",
    images: [
      feedImages.teacherClassroom,
      feedImages.handsRaised,
      feedImages.girlsClassroom,
      feedImages.studentsAtDesks,
      feedImages.teacherClassroom,
    ],
    stats: { likes: 50, comments: 50 },
  },
  {
    author: {
      id: "dr-priya-sharma",
      name: "Dr. Priya Sharma",
      role: "Biology Teacher",
      school: "Delhi Public School",
      tone: "sand",
      avatar: teacherAvatars.priyaSharma,
    },
    title: "How Do You Balance Academics with Extracurriculars?",
    excerpt:
      "Has anyone found effective strategies for helping their children balance extracurricular activities with the increased academic workload this semester? With CBSE board practicals approaching and the inter-school science quiz on the calendar, I'm seeing several students stretched thin. I've been experimenting with a two-week rolling schedule where academic sprints alternate with lighter club-work windows, and the early results look promising — fewer missed deadlines, and students reporting better sleep. Curious what approaches other teachers and parents are trying.",
    time: "Today, 6 PM",
    stats: { likes: 50, comments: 50 },
  },
  {
    author: {
      name: "Rajesh Mehta",
      role: "Principal",
      school: "Greenfield International School",
      tone: "purple",
      avatar: teacherAvatars.rajeshMehta,
    },
    title: "Parent-Teacher Meet — Reworked for Grade 9 & 10",
    excerpt:
      "Based on feedback from last term's PTMs, we're moving to 20-minute slotted windows per family instead of the open-house format. Each slot will now include a short academic review, a wellbeing check-in, and a space for parents to raise questions ahead of time via the EduConnect portal. Homeroom teachers will share the signup link by Friday — please encourage parents to book early as slots tend to fill on the first day.",
    time: "Today, 2 PM",
    stats: { likes: 87, comments: 23 },
  },
  {
    author: {
      name: "Dr. Kavya Nair",
      role: "Physics Teacher",
      school: "Modern Heights Academy",
      tone: "green",
      avatar: teacherAvatars.kavyaNair,
    },
    title: "Building an Affordable Optics Lab — Lessons from Term One",
    excerpt:
      "When we set out to build a hands-on optics lab for Grade 11 on a shoestring budget, I wasn't sure how far we'd get. Eight weeks in, students have assembled their own slit apparatus, measured diffraction patterns with laser pointers repurposed from the robotics kit, and — most satisfyingly — caught two textbook errors in the process. Three takeaways: start with problems, not equipment; let students design the jig; and budget more time for documentation than you think you need.",
    time: "Yesterday",
    images: [feedImages.handsRaised, feedImages.girlsClassroom],
    stats: { likes: 142, comments: 38 },
  },
  {
    author: {
      name: "Ananya Reddy",
      role: "English Literature Teacher",
      school: "Delhi Public School",
      tone: "purple",
      avatar: teacherAvatars.ananyaReddy,
    },
    title: "Students' Original Poetry Anthology — Open for Submissions",
    excerpt:
      "We're collecting original student poetry for the annual anthology. Themes this year: belonging, the monsoon, and the city at night. Submissions open until April 28 — please route through your English faculty.",
    time: "Yesterday",
    stats: { likes: 64, comments: 12 },
  },
  {
    author: {
      name: "Arjun Krishnan",
      role: "Social Studies Teacher",
      school: "Modern Heights Academy",
      tone: "green",
      avatar: teacherAvatars.arjunKrishnan,
    },
    title: "Classroom Debate: Who Really Benefits from a Two-Party System?",
    excerpt:
      "Had a cracking debate in Grade 11 today — I opened with a single question and within ten minutes the room had split into four self-organised camps. What surprised me most wasn't the energy, it was the specificity: students were citing state-level examples from their own districts, not textbook talking points. A few takeaways I'm planning to share at the faculty meeting — scaffolded prompts work better than big open questions, letting students move physically between camps keeps the debate honest, and quieter students contribute more in writing than in voice. Happy to share the prompt set if useful.",
    time: "2 days ago",
    stats: { likes: 118, comments: 54 },
  },
  {
    author: {
      name: "Vikram Iyer",
      role: "Mathematics Teacher",
      school: "Greenfield International School",
      tone: "sand",
      avatar: teacherAvatars.vikramIyer,
    },
    title: "Grade 10 Board Prep — Common Mistakes Worth Flagging Early",
    excerpt:
      "Three patterns I keep seeing in mock papers this month, and how I've been addressing them in class. First: sign errors in quadratic word problems, usually because students rush to setup before re-reading. Second: over-reliance on formulas in trigonometry at the expense of building the geometric intuition. Third: careless rounding in mensuration. The fix in all three cases has been the same — slow down the first read, draw before computing, and always state the unit. Happy to share the worksheet I'm using if it's useful.",
    time: "2 days ago",
    images: [feedImages.teacherClassroom],
    stats: { likes: 96, comments: 41 },
  },
  {
    author: sarahAuthor,
    title: "AP Biology Lab Refresh — Moving from Recipe to Inquiry",
    excerpt:
      "Rewrote the Grade 10 cell respiration lab over the break. Instead of the step-by-step recipe, students now get the question, the constraints, and the raw materials — they design the procedure in pairs before we converge on a shared protocol. First run went better than I hoped: four groups independently arrived at a control condition I didn't prompt, and two asked to extend the run over lunch. Writing up the notes for anyone who wants to borrow the structure.",
    time: "Today, 10 AM",
    images: [feedImages.girlsClassroom],
    stats: { likes: 38, comments: 14 },
  },
  {
    author: sarahAuthor,
    title: "Science Olympiad Coaching — Week 3 Recap",
    excerpt:
      "Three weeks into the Olympiad cycle and the team is finding its rhythm. We closed the gap on cell structure and are moving into respiration next week. A parent asked how they can support at home without doing the work for the student — the short answer is: ask them to teach you. If they can explain glycolysis to a non-biologist, they understand it.",
    time: "Yesterday",
    stats: { likes: 52, comments: 9 },
  },
  {
    author: sarahAuthor,
    title: "Weekend Field Trip — Riverside Ecology Walk",
    excerpt:
      "Thirty students, two parent volunteers, six notebooks of observations, and one surprise bird sighting. Sharing a few photos from yesterday's walk along the river — the kind of afternoon that's hard to replicate inside a classroom.",
    time: "2 days ago",
    images: [feedImages.handsRaised, feedImages.studentsAtDesks],
    stats: { likes: 74, comments: 18 },
  },
];

/** Posts authored by a given profile id. */
export function postsByAuthor(authorId: string): Post[] {
  return posts.filter((p) => p.author.id === authorId);
}
