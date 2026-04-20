import { useState } from "react";
import { ChevronRight, FileText } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Eyebrow } from "../ui/SectionHeader";
import { Icon } from "../ui/Icon";
import { teacherAvatars, studentAvatars } from "../../data/images";

const days = [
  { d: "Mon", n: "30" },
  { d: "Tue", n: "31" },
  { d: "Wed", n: "01" },
  { d: "Thu", n: "02", active: true },
  { d: "Fri", n: "03" },
  { d: "Sat", n: "04" },
  { d: "Sun", n: "05" },
];

const upcomingSessions = [
  { day: "WED", date: "01", title: "Cell Respiration Deep Dive", time: "2:00 – 3:00 PM", mode: "Online" },
  { day: "WED", date: "02", title: "AP Biology Lab Review", time: "2:00 – 3:00 PM", mode: "Online" },
  { day: "WED", date: "03", title: "AP Biology Lab Review", time: "2:00 – 3:00 PM", mode: "Online" },
];

const attention = [
  { tone: "green" as const, title: "3 Papers Awaiting Review", meta: "Aarav, Priya, Saanvi" },
  { tone: "purple" as const, title: "5 Lab Reports To Grade", meta: "Grade 10 · AP Biology" },
  { tone: "sand" as const, title: "2 Parent Messages", meta: "Sent by Rajesh Mehta" },
];

type Interest = {
  title: string;
  time: string;
  readers: string;
  category: string;
  posts: string;
  avatars: string[];
};

const interests: Interest[] = [
  {
    title: "CBSE drafts new inquiry-based framework for Grade 9–12 science",
    time: "8m ago",
    readers: "25,571 readers",
    category: "News",
    posts: "25.5K posts",
    avatars: [
      teacherAvatars.priyaSharma,
      teacherAvatars.rajeshMehta,
      teacherAvatars.ananyaReddy,
    ],
  },
  {
    title: "How 3 Delhi schools doubled lab engagement in one semester",
    time: "38m ago",
    readers: "12,904 readers",
    category: "Research",
    posts: "12.9K posts",
    avatars: [
      teacherAvatars.kavyaNair,
      teacherAvatars.vikramIyer,
      teacherAvatars.arjunKrishnan,
    ],
  },
  {
    title: "AI tutors in India — teachers share what's actually working",
    time: "21m ago",
    readers: "2,747 readers",
    category: "Community",
    posts: "2,747 posts",
    avatars: [
      teacherAvatars.arjunKrishnan,
      teacherAvatars.priyaSharma,
      studentAvatars.aaravPatel,
    ],
  },
  {
    title: "Grading rubrics that cut marking time in half",
    time: "21m ago",
    readers: "1,831 readers",
    category: "Teaching",
    posts: "1,831 posts",
    avatars: [
      teacherAvatars.ananyaReddy,
      teacherAvatars.vikramIyer,
      teacherAvatars.rajeshMehta,
    ],
  },
  {
    title: "Applications open for the 2026 NCERT mentorship cohort",
    time: "2d ago",
    readers: "1,578 readers",
    category: "Event",
    posts: "1,578 posts",
    avatars: [
      teacherAvatars.rajeshMehta,
      studentAvatars.emmaChen,
      teacherAvatars.kavyaNair,
    ],
  },
];

const connections = [
  {
    name: "Dr. Kavya Nair",
    role: "Physics Teacher · Modern Heights",
    tone: "green" as const,
    avatar: teacherAvatars.kavyaNair,
  },
  {
    name: "Ananya Reddy",
    role: "English Literature · DPS",
    tone: "purple" as const,
    avatar: teacherAvatars.ananyaReddy,
  },
  {
    name: "Vikram Iyer",
    role: "Mathematics · Greenfield Intl",
    tone: "sand" as const,
    avatar: teacherAvatars.vikramIyer,
  },
];

export function RightSidebar() {
  const [interestVersion, setInterestVersion] = useState<"v1" | "v2">("v1");
  const shown = interests.slice(0, 3);

  return (
    <aside className="hidden w-[320px] shrink-0 bg-white border-l border-line p-20 xl:flex flex-col gap-[40px] sticky top-[var(--nav-h,110px)] h-[calc(100vh-var(--nav-h,110px))] overflow-y-auto">
      {/* You might be interested in */}
      <div className="flex flex-col gap-15">
        <div className="flex items-center justify-between">
          <Eyebrow>You might be interested in</Eyebrow>
          <div
            role="tablist"
            aria-label="Interest layout"
            className="inline-flex items-center rounded-pill border border-line bg-canvas p-[2px]"
          >
            {(["v1", "v2"] as const).map((v) => {
              const active = v === interestVersion;
              return (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setInterestVersion(v)}
                  className={`inline-flex h-[20px] items-center rounded-pill px-[8px] text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                    active ? "bg-white text-ink shadow-soft" : "text-subtle hover:text-ink"
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>

        {interestVersion === "v1" ? (
          <ul className="flex flex-col">
            {shown.map((item, i) => (
              <li key={i}>
                <button
                  type="button"
                  className="-mx-[6px] flex w-[calc(100%+12px)] flex-col gap-[4px] rounded-md px-[6px] py-[10px] text-left transition-colors hover:bg-canvas"
                >
                  <p className="line-clamp-1 text-sm font-semibold text-ink leading-[1.35]">
                    {item.title}
                  </p>
                  <p className="text-xs font-medium text-subtle leading-none">
                    {item.time} · {item.readers}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-col">
            {shown.map((item, i) => (
              <li key={i}>
                <button
                  type="button"
                  className="-mx-[6px] flex w-[calc(100%+12px)] flex-col gap-[8px] rounded-md px-[6px] py-[12px] text-left transition-colors hover:bg-canvas"
                >
                  <p className="line-clamp-2 text-sm font-semibold text-ink leading-[1.3]">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-10">
                    <AvatarStack avatars={item.avatars} />
                    <p className="text-xs font-medium text-subtle leading-none">
                      {item.time} · {item.category} · {item.posts}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        <button className="inline-flex w-full items-center justify-center gap-5 rounded-pill bg-green-50 px-15 py-[10px] text-xs font-medium text-green-500 transition-colors hover:bg-green-100">
          See All <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Calendar */}
      <div className="flex flex-col gap-20">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-base text-ink leading-none">April 2026</h3>
          <div className="flex items-center gap-5">
            <button
              aria-label="Previous month"
              className="inline-flex h-[20px] w-[20px] items-center justify-center text-subtle hover:text-ink"
            >
              <Icon name="caretLeft" size={16} />
            </button>
            <button
              aria-label="Next month"
              className="inline-flex h-[20px] w-[20px] items-center justify-center text-subtle hover:text-ink"
            >
              <Icon name="caretRight" size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {days.map((d) => (
            <div key={d.n} className="flex flex-col items-center gap-5">
              <span className="text-xs font-medium text-subtle leading-none">{d.d}</span>
              <span
                className={`inline-flex h-[30px] w-[30px] items-center justify-center rounded-pill text-sm font-medium ${
                  d.active ? "bg-ink text-white" : "text-ink"
                }`}
              >
                {d.n}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="flex flex-col gap-20">
        <Eyebrow>Upcoming Sessions</Eyebrow>
        <div className="flex flex-col gap-15">
          {upcomingSessions.map((s, i) => (
            <div key={i} className="flex items-center gap-15">
              {/* Date block */}
              <div className="flex w-[30px] shrink-0 flex-col items-start">
                <span className="text-[10px] font-medium uppercase text-subtle leading-none">
                  {s.day}
                </span>
                <span className="mt-[4px] text-base font-semibold text-ink leading-none">
                  {s.date}
                </span>
              </div>
              {/* Vertical green divider */}
              <span className="h-[36px] w-[2px] shrink-0 rounded-pill bg-green-500" />
              {/* Title + meta */}
              <div className="flex flex-col gap-5 min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink truncate leading-none">
                  {s.title}
                </p>
                <p className="inline-flex items-center gap-5 text-xs font-medium text-muted leading-none">
                  <span>{s.time}</span>
                  <span className="inline-flex items-center gap-5 text-green-500">
                    <span className="h-[4px] w-[4px] rounded-pill bg-green-500" />
                    {s.mode}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* People you may know */}
      <div className="flex flex-col gap-20">
        <Eyebrow>People you may know</Eyebrow>
        <div className="flex flex-col gap-20">
          {connections.map((c, i) => (
            <div key={i} className="flex items-center gap-10">
              <div className="shrink-0">
                <Avatar name={c.name} src={c.avatar} tone={c.tone} size="md" />
              </div>
              <div className="flex flex-col gap-5 min-w-0 flex-1">
                <p className="text-sm font-medium text-ink truncate leading-none">
                  {c.name}
                </p>
                <p className="text-xs font-medium text-subtle truncate leading-none">
                  {c.role}
                </p>
              </div>
              <button className="rounded-sm border border-green-500/20 bg-green-500/10 px-[12px] py-[6px] text-xs font-medium text-green-500 transition-colors hover:bg-green-500/15">
                Connect
              </button>
            </div>
          ))}
        </div>
        <button className="inline-flex w-full items-center justify-center gap-5 rounded-pill bg-green-50 px-15 py-[10px] text-xs font-medium text-green-500 transition-colors hover:bg-green-100">
          See All <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Needs your attention */}
      <div className="flex flex-col gap-20">
        <Eyebrow>Needs your attention</Eyebrow>
        <div className="flex flex-col gap-15">
          {attention.map((item, i) => {
            const surfaces = {
              green: "bg-green-50 border-green-100",
              purple: "bg-purple-50 border-purple-200",
              sand: "bg-sand-100/70 border-sand-200",
            }[item.tone];
            const iconBg = {
              green: "bg-green-700/20 text-green-700",
              purple: "bg-purple-300 text-purple-700",
              sand: "bg-sand-300 text-[#b18720]",
            }[item.tone];
            return (
              <div
                key={i}
                className={`flex items-center gap-15 rounded-md border p-15 ${surfaces}`}
              >
                <div
                  className={`inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-pill ${iconBg}`}
                >
                  <FileText className="h-[20px] w-[20px]" />
                </div>
                <div className="flex flex-col gap-5 min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink truncate leading-none">
                    {item.title}
                  </p>
                  <p className="text-xs font-medium text-muted leading-none">
                    {item.meta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

/* ───────────── Small stack of circular avatars ───────────── */

function AvatarStack({ avatars }: { avatars: string[] }) {
  return (
    <div className="flex items-center -space-x-2">
      {avatars.slice(0, 3).map((src, i) => (
        <span
          key={i}
          className="inline-flex h-[20px] w-[20px] overflow-hidden rounded-pill ring-2 ring-white bg-canvas"
        >
          <img src={src} alt="" className="h-full w-full object-cover" />
        </span>
      ))}
    </div>
  );
}
