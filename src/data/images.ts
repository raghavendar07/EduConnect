// Centralized image URLs. All sources are free-to-use with no watermarks.
// - Unsplash (images.unsplash.com) — free license, no watermark.
// - Pravatar (i.pravatar.cc) — free avatar placeholder service, deterministic by id.

const unsplashFace = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=facearea&facepad=2.5&w=300&h=300&q=80`;

const unsplashWide = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=70`;

// ——— Teacher / Educator portraits (Indian context) ———
// Local files in /public/teachers/ — no external requests, no watermarks.
export const teacherAvatars = {
  priyaSharma: "/teachers/priya-sharma.jpg",
  rajeshMehta: "/teachers/rajesh-mehta.jpg",
  ananyaReddy: "/teachers/ananya-reddy.jpg",
  vikramIyer: "/teachers/vikram-iyer.jpg",
  kavyaNair: "/teachers/kavya-nair.jpg",
  arjunKrishnan: "/teachers/arjun-krishnan.jpg",
};

// ——— Student portraits (younger, Indian context) ———
export const studentAvatars = {
  aaravPatel: "https://i.pravatar.cc/300?img=15",
  emmaChen: "https://i.pravatar.cc/300?img=47",
  alexKumar: "https://i.pravatar.cc/300?img=33",
  liamPatel: "https://i.pravatar.cc/300?img=68",
  sophiaWilliams: "https://i.pravatar.cc/300?img=23",
  priyaStudent: "https://i.pravatar.cc/300?img=44",
  grouMate1: "https://i.pravatar.cc/300?img=12",
  grouMate2: "https://i.pravatar.cc/300?img=52",
  grouMate3: "https://i.pravatar.cc/300?img=29",
  grouMate4: "https://i.pravatar.cc/300?img=5",
};

// ——— School / Institution logos (local files in /public/schools/) ———
export const schoolLogos = {
  dps: "/schools/dps.avif",
  greenfield: "/schools/greenfield.png",
  delhiUniversity: "/schools/delhi-university.png",
  jntu: "/schools/jntu.jpg",
};

// ——— Feed images (Indian classrooms, students, teachers) ———
// Local files in /public/feed/ — no external requests, no watermarks.
export const feedImages = {
  studentsAtDesks: "/feed/students-at-desks.jpg",
  girlsClassroom: "/feed/girls-classroom.jpg",
  handsRaised: "/feed/hands-raised.jpg",
  teacherClassroom: "/feed/teacher-classroom.jpg",
};
