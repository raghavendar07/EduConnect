import { AvatarStack } from "../ui/Avatar";
import { StatusDot, Tag } from "../ui/Tag";
import { Icon } from "../ui/Icon";
import { cn } from "../../lib/cn";

type Tone = "green" | "purple" | "sand";

const surfaces: Record<Tone, string> = {
  green: "bg-green-50 border-green-100",
  purple: "bg-purple-50 border-purple-200",
  sand: "bg-sand-100/70 border-sand-200",
};

const dividers: Record<Tone, string> = {
  green: "border-green-100",
  purple: "border-purple-200",
  sand: "border-sand-200",
};

export type Session = {
  type: string;
  title: string;
  course: string;
  grade: string;
  duration: string;
  time: string;
  mode: "Online" | "In Person";
  tone: Tone;
  attendees: Array<{ name: string; tone?: Tone; src?: string }>;
};

export function SessionCard({ session }: { session: Session }) {
  const tone = session.tone;
  const tagTone: "green" | "purple" | "sand" = tone;
  return (
    <article
      className={cn(
        "flex w-[300px] shrink-0 flex-col justify-center gap-20 rounded-lg border p-15 transition-transform duration-150 hover:-translate-y-[2px]",
        surfaces[tone]
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Tag tone={tagTone}>{session.type}</Tag>
        <StatusDot tone={tone === "purple" ? "purple" : "green"} label={session.mode} />
      </div>

      {/* Title + meta */}
      <div className="flex flex-col gap-10">
        <h3 className="text-lg font-semibold text-ink truncate">
          {session.title}
        </h3>
        <div className="flex items-center gap-5 text-xs font-medium text-muted">
          <span>{session.course}</span>
          <Dot />
          <span>{session.grade}</span>
          <Dot />
          <span>{session.duration}</span>
        </div>
      </div>

      {/* Footer */}
      <div
        className={cn(
          "flex items-center justify-between border-t pt-10",
          dividers[tone]
        )}
      >
        <div className="flex items-center gap-5 text-sm font-medium text-muted">
          <Icon name="clock" size={16} />
          {session.time}
        </div>
        <AvatarStack
          people={session.attendees.map((a) => ({
            name: a.name,
            src: a.src,
            tone: a.tone ?? (tone === "purple" ? "purple" : "green"),
          }))}
          max={4}
        />
      </div>
    </article>
  );
}

function Dot() {
  return <span className="h-[4px] w-[4px] rounded-pill bg-muted/60" />;
}
