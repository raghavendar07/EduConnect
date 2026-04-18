import { ReactNode } from "react";
import { teacherAvatars } from "./images";

export type BaseNotification = {
  id: string;
  avatarName: string;
  avatarTone: "green" | "purple" | "sand";
  avatarSrc?: string;
  time: string;
  body: ReactNode;
};

export type Notification =
  | (BaseNotification & { variant: "default" })
  | (BaseNotification & { variant: "invite" })
  | (BaseNotification & {
      variant: "file";
      file: { name: string; size: string };
    })
  | (BaseNotification & { variant: "comment"; comment: string });

export const notifications: Notification[] = [
  {
    id: "1",
    variant: "default",
    avatarName: "Ananya Reddy",
    avatarTone: "purple",
    avatarSrc: teacherAvatars.ananyaReddy,
    time: "8 min ago",
    body: (
      <>
        <span className="font-semibold text-ink">Ananya Reddy</span>{" "}
        <span className="text-muted">joined your session</span>{" "}
        <span className="font-semibold text-ink">Cell Respiration Deep Dive</span>
      </>
    ),
  },
  {
    id: "2",
    variant: "invite",
    avatarName: "Principal Rajesh Mehta",
    avatarTone: "purple",
    avatarSrc: teacherAvatars.rajeshMehta,
    time: "2 hours ago",
    body: (
      <>
        <span className="font-semibold text-ink">Principal Mehta</span>{" "}
        <span className="text-muted">invites you to the</span>{" "}
        <span className="font-semibold text-ink">Science Fair Committee</span>
      </>
    ),
  },
  {
    id: "3",
    variant: "file",
    avatarName: "Vikram Iyer",
    avatarTone: "sand",
    avatarSrc: teacherAvatars.vikramIyer,
    time: "3 hours ago",
    body: (
      <>
        <span className="font-semibold text-ink">Vikram Iyer</span>{" "}
        <span className="text-muted">shared</span>{" "}
        <span className="font-semibold text-ink">grade-10-mock-paper.pdf</span>
      </>
    ),
    file: { name: "grade-10-mock-paper.pdf", size: "2.4mb" },
  },
  {
    id: "4",
    variant: "comment",
    avatarName: "Dr. Kavya Nair",
    avatarTone: "green",
    avatarSrc: teacherAvatars.kavyaNair,
    time: "2 days ago",
    body: (
      <>
        <span className="font-semibold text-ink">Dr. Kavya Nair</span>{" "}
        <span className="text-muted">commented on your post</span>
      </>
    ),
    comment: "Fantastic work with the students — let's connect this week!",
  },
  {
    id: "5",
    variant: "default",
    avatarName: "Arjun Krishnan",
    avatarTone: "green",
    avatarSrc: teacherAvatars.arjunKrishnan,
    time: "Yesterday",
    body: (
      <>
        <span className="font-semibold text-ink">Arjun Krishnan</span>{" "}
        <span className="text-muted">liked your post</span>{" "}
        <span className="font-semibold text-ink">Three Students Selected for Regional Science Symposium</span>
      </>
    ),
  },
  {
    id: "6",
    variant: "file",
    avatarName: "Ananya Reddy",
    avatarTone: "purple",
    avatarSrc: teacherAvatars.ananyaReddy,
    time: "Yesterday",
    body: (
      <>
        <span className="font-semibold text-ink">Ananya Reddy</span>{" "}
        <span className="text-muted">shared</span>{" "}
        <span className="font-semibold text-ink">photosynthesis-notes.pdf</span>
      </>
    ),
    file: { name: "photosynthesis-notes.pdf", size: "1.2mb" },
  },
  {
    id: "7",
    variant: "comment",
    avatarName: "Vikram Iyer",
    avatarTone: "sand",
    avatarSrc: teacherAvatars.vikramIyer,
    time: "3 days ago",
    body: (
      <>
        <span className="font-semibold text-ink">Vikram Iyer</span>{" "}
        <span className="text-muted">replied to your comment</span>
      </>
    ),
    comment: "Thanks for the clarification — the mitochondrion diagram really helped!",
  },
];
