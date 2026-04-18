import { ChevronRight, FileText } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Eyebrow } from "../ui/SectionHeader";
import { Icon } from "../ui/Icon";
import { teacherAvatars } from "../../data/images";

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
  return (
    <aside className="hidden w-[320px] shrink-0 bg-white border-l border-line p-20 xl:flex flex-col gap-[40px] sticky top-[110px] h-[calc(100vh-110px)] overflow-y-auto">
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
    </aside>
  );
}
