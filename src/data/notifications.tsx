import { ReactNode } from "react";
import {
  Calendar,
  FileText,
  Heart,
  MessageSquare,
  Reply,
  Users,
  type LucideIcon,
} from "lucide-react";
import { teacherAvatars } from "./images";

export type NotificationBucket = "today" | "week" | "earlier";

export type BaseNotification = {
  id: string;
  avatarName: string;
  avatarTone: "green" | "purple" | "sand";
  avatarSrc?: string;
  time: string;
  body: ReactNode;
  /** Short headline shown on the new NotificationsPage layout. */
  title: string;
  /** Icon rendered inside the circular tile on the new NotificationsPage. */
  icon: LucideIcon;
  /** Grouping for the Today / This Week / Earlier tabs. */
  bucket: NotificationBucket;
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
    title: "New session participant",
    icon: Users,
    bucket: "today",
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
    title: "Committee invitation",
    icon: Calendar,
    bucket: "today",
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
    title: "File shared with you",
    icon: FileText,
    bucket: "today",
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
    title: "New comment on your post",
    icon: MessageSquare,
    bucket: "week",
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
    title: "Your post got a like",
    icon: Heart,
    bucket: "week",
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
    title: "File shared with you",
    icon: FileText,
    bucket: "week",
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
    title: "New reply",
    icon: Reply,
    bucket: "week",
    body: (
      <>
        <span className="font-semibold text-ink">Vikram Iyer</span>{" "}
        <span className="text-muted">replied to your comment</span>
      </>
    ),
    comment: "Thanks for the clarification — the mitochondrion diagram really helped!",
  },
  {
    id: "8",
    variant: "default",
    avatarName: "Principal Rajesh Mehta",
    avatarTone: "purple",
    avatarSrc: teacherAvatars.rajeshMehta,
    time: "2 weeks ago",
    title: "Term-end review scheduled",
    icon: Calendar,
    bucket: "earlier",
    body: (
      <>
        <span className="font-semibold text-ink">Principal Mehta</span>{" "}
        <span className="text-muted">scheduled a review on</span>{" "}
        <span className="font-semibold text-ink">April 28, 3:00 PM</span>
      </>
    ),
  },
  {
    id: "9",
    variant: "file",
    avatarName: "Dr. Kavya Nair",
    avatarTone: "green",
    avatarSrc: teacherAvatars.kavyaNair,
    time: "3 weeks ago",
    title: "File shared with you",
    icon: FileText,
    bucket: "earlier",
    body: (
      <>
        <span className="font-semibold text-ink">Dr. Kavya Nair</span>{" "}
        <span className="text-muted">shared</span>{" "}
        <span className="font-semibold text-ink">optics-lab-brief.pdf</span>
      </>
    ),
    file: { name: "optics-lab-brief.pdf", size: "860kb" },
  },
];
