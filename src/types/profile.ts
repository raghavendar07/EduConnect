import { Post } from "../components/cards/PostCard";

export type PersonalInfo = {
  email: string;
  phone: string;
  location: string;
  birthday: string;
  languages: string[];
  website: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  employmentType: string;
  period: string;
  description: string;
  tone: "green" | "purple" | "sand";
  current?: boolean;
  logo?: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  description: string;
  grade?: string;
  tone: "green" | "purple" | "sand";
  logo?: string;
};

export type Profile = {
  id: string;
  name: string;
  role: string;
  school: string;
  avatar?: string;
  bio: string;
  location: string;
  joined: string;
  tone: "green" | "purple" | "sand";
  tags: string[];
  stats: {
    posts: number;
    followers: number;
    following: number;
    classes: number;
  };
  highlights: Array<{ label: string; value: string; tone: "green" | "purple" | "sand" }>;
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  posts: Post[];
};
