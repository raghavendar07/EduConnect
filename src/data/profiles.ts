import { Profile } from "../types/profile";
import { posts } from "./mock";
import { teacherAvatars, schoolLogos } from "./images";

export const profiles: Record<string, Profile> = {
  "dr-priya-sharma": {
    id: "dr-priya-sharma",
    name: "Dr. Priya Sharma",
    role: "Biology Teacher",
    school: "Delhi Public School",
    avatar: teacherAvatars.priyaSharma,
    bio: "I adapt my teaching style based on different learning needs, ensuring every student feels supported and included. By encouraging curiosity, critical thinking, and consistent practice, I aim to create an environment where students not only learn but also grow with confidence. Over 15+ years, I've guided young researchers through cell respiration deep dives, regional science symposiums, and research-led inquiry projects — helping 230+ students find their voice in biology. Outside of class, I mentor early-career teachers on curriculum design and lead a weekend science club that connects students with working scientists across India.",
    location: "New Delhi, India",
    joined: "Joined March 2019",
    tone: "sand",
    tags: ["AP Biology", "Cell Biology", "Research Mentor", "Science Fair Coach"],
    stats: {
      posts: 142,
      followers: 2340,
      following: 186,
      classes: 6,
    },
    highlights: [
      { label: "Students Mentored", value: "230+", tone: "green" },
      { label: "Research Projects", value: "48", tone: "purple" },
      { label: "Awards Won", value: "12", tone: "sand" },
    ],
    personalInfo: {
      email: "priya.sharma@dps.edu.in",
      phone: "+91 98765 43210",
      location: "New Delhi, India",
      birthday: "March 14, 1984",
      languages: ["English", "Hindi", "Sanskrit"],
      website: "priyasharma.edu",
    },
    experience: [
      {
        role: "Senior Biology Teacher",
        organization: "Delhi Public School",
        employmentType: "Full Time",
        period: "Aug 2019 — Present",
        description:
          "Leading AP Biology program with 180+ students annually. Redesigned cell biology curriculum to include research-based inquiry, resulting in 3× increase in science fair participation.",
        tone: "green",
        current: true,
        logo: schoolLogos.dps,
      },
      {
        role: "Biology Teacher & Research Coordinator",
        organization: "Greenfield International School",
        employmentType: "Full Time",
        period: "Jun 2014 — Jul 2019",
        description:
          "Mentored 12 award-winning regional science symposium projects. Piloted the school's first AP Biology track, now considered a flagship program.",
        tone: "purple",
        logo: schoolLogos.greenfield,
      },
      {
        role: "Assistant Biology Teacher",
        organization: "Modern Heights Academy",
        employmentType: "Full Time",
        period: "Jul 2010 — May 2014",
        description:
          "Co-authored the Grade 9-12 Biology workbook still in use across the district. Coached Junior Science Olympiad teams to state-level podium finishes.",
        tone: "sand",
      },
    ],
    education: [
      {
        degree: "Ph.D. in Molecular & Cellular Biology",
        institution: "Jawaharlal Nehru Technological University, Hyderabad",
        period: "2006 — 2010",
        description:
          "Thesis focused on mitochondrial respiration pathways and their role in student learning models of cellular metabolism.",
        grade: "Awarded with Distinction",
        tone: "purple",
        logo: schoolLogos.jntu,
      },
      {
        degree: "M.Sc. in Biology Education",
        institution: "University of Delhi",
        period: "2004 — 2006",
        description:
          "Specialized in curriculum design for secondary biology. Graduate teaching assistant for general biology labs.",
        grade: "9.1 / 10 GPA",
        tone: "green",
        logo: schoolLogos.delhiUniversity,
      },
      {
        degree: "B.Sc. in Biology (Honours)",
        institution: "Miranda House, University of Delhi",
        period: "2001 — 2004",
        description:
          "Minored in chemistry with a focus on biochemistry. President of the college science club.",
        grade: "First Class with Distinction",
        tone: "sand",
        logo: schoolLogos.delhiUniversity,
      },
    ],
    posts,
  },
};

export function getProfile(id: string): Profile | undefined {
  return profiles[id];
}
