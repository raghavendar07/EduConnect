import { CheckCircle2 } from "lucide-react";
import type { ExperienceItem, EducationItem } from "../../types/profile";

type Tone = "green" | "purple" | "sand";

const toneSurface: Record<Tone, string> = {
  green: "bg-green-50 border-green-100",
  purple: "bg-purple-50 border-purple-200",
  sand: "bg-sand-100/70 border-sand-200",
};

const toneAccent: Record<Tone, string> = {
  green: "text-green-600",
  purple: "text-purple-700",
  sand: "text-[#b18720]",
};

const toneBadge: Record<Tone, string> = {
  green: "bg-white/70 border-green-100 text-green-600",
  purple: "bg-white/70 border-purple-200 text-purple-700",
  sand: "bg-white/70 border-sand-200 text-[#b18720]",
};

const toneInitials: Record<Tone, string> = {
  green: "bg-green-500 text-white",
  purple: "bg-purple-700 text-white",
  sand: "bg-sand-200 text-ink",
};

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function SectionHeading({
  eyebrow,
  title,
  caption,
}: {
  eyebrow: string;
  title: string;
  caption: string;
}) {
  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-5">
        <span className="text-xs font-semibold uppercase tracking-eyebrow text-subtle">
          {eyebrow}
        </span>
        <h2 className="font-display text-2xl font-medium text-ink leading-none">
          {title}
        </h2>
      </div>
      <span className="text-xs font-medium text-subtle">{caption}</span>
    </div>
  );
}

function StoryCard({
  tone,
  period,
  current,
  title,
  org,
  description,
  logo,
  tail,
}: {
  tone: Tone;
  period: string;
  current?: boolean;
  title: string;
  org: string;
  description: string;
  logo?: string;
  tail?: React.ReactNode;
}) {
  return (
    <article
      className={`relative flex h-full flex-col gap-15 overflow-hidden rounded-md border p-20 transition-transform duration-200 hover:-translate-y-[2px] ${toneSurface[tone]}`}
    >
      {/* Decorative corner blur */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[40px] -right-[40px] h-[120px] w-[120px] rounded-pill bg-white/40 blur-2xl"
      />

      {/* Header: period + optional current badge */}
      <div className="flex items-center justify-between gap-10">
        <span
          className={`inline-flex items-center rounded-pill border px-10 py-[6px] text-[11px] font-semibold uppercase tracking-eyebrow ${toneBadge[tone]}`}
        >
          {period}
        </span>
        {current && (
          <span className="inline-flex items-center gap-5 rounded-pill bg-ink px-10 py-[4px] text-[10px] font-semibold uppercase tracking-eyebrow text-white">
            <CheckCircle2 className="h-3 w-3" strokeWidth={2.4} />
            Current
          </span>
        )}
      </div>

      {/* Org logo/initials + title */}
      <div className="flex items-start gap-15">
        {logo ? (
          <span className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-pill bg-white ring-[3px] ring-white">
            <img
              src={logo}
              alt={org}
              className="h-full w-full object-cover"
            />
          </span>
        ) : (
          <span
            className={`inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-pill text-sm font-semibold ring-[3px] ring-white ${toneInitials[tone]}`}
          >
            {initialsOf(org)}
          </span>
        )}
        <div className="flex flex-col gap-[4px] min-w-0">
          <h3 className="font-display text-lg font-medium text-ink leading-[1.2]">
            {title}
          </h3>
          <p className={`text-xs font-semibold ${toneAccent[tone]}`}>{org}</p>
        </div>
      </div>

      <p className="text-sm leading-[1.5] text-[#374151]">{description}</p>

      {tail && <div className="mt-auto">{tail}</div>}
    </article>
  );
}

export function ExperienceSection({ items }: { items: ExperienceItem[] }) {
  return (
    <section className="flex flex-col gap-20">
      <SectionHeading
        eyebrow="Journey"
        title="Experience"
        caption={`${items.length} roles`}
      />
      <div className="grid grid-cols-1 gap-15 md:grid-cols-2">
        {items.map((item, i) => (
          <StoryCard
            key={i}
            tone={item.tone}
            period={item.period}
            current={item.current}
            title={item.role}
            org={item.organization}
            description={item.description}
            logo={item.logo}
          />
        ))}
      </div>
    </section>
  );
}

export function EducationSection({ items }: { items: EducationItem[] }) {
  return (
    <section className="flex flex-col gap-20">
      <SectionHeading
        eyebrow="Foundation"
        title="Education"
        caption={`${items.length} qualifications`}
      />
      <div className="grid grid-cols-1 gap-15 md:grid-cols-2">
        {items.map((item, i) => (
          <StoryCard
            key={i}
            tone={item.tone}
            period={item.period}
            title={item.degree}
            org={item.institution}
            description={item.description}
            logo={item.logo}
            tail={
              item.grade ? (
                <span className="inline-flex items-center rounded-pill border border-white/80 bg-white px-10 py-[6px] text-xs font-semibold text-ink">
                  <span className="mr-5 text-[10px] font-semibold uppercase tracking-eyebrow text-subtle">
                    Grade
                  </span>
                  {item.grade}
                </span>
              ) : null
            }
          />
        ))}
      </div>
    </section>
  );
}
