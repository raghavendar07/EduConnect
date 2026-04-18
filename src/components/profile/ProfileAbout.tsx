import { useState } from "react";
import { ChevronDown, Mail, MapPin } from "lucide-react";
import { Icon } from "../ui/Icon";
import { SkillsOverflow } from "./SkillsOverflow";
import type {
  EducationItem,
  ExperienceItem,
  PersonalInfo,
  Profile,
} from "../../types/profile";

type TabKey = "experience" | "about";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "experience", label: "Experience & Education" },
  { key: "about", label: "About Me" },
];

const toneInitials = {
  green: "bg-green-500 text-white",
  purple: "bg-purple-700 text-white",
  sand: "bg-sand-200 text-ink",
} as const;

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProfileAbout({ profile }: { profile: Profile }) {
  const [active, setActive] = useState<TabKey>("experience");

  return (
    <section className="flex flex-col gap-20 rounded-md border border-line bg-white p-20">
      {/* Tabs */}
      <div className="flex items-center gap-30 border-b border-line">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`relative pb-15 text-sm font-medium transition-colors ${
                isActive ? "text-ink" : "text-subtle hover:text-ink"
              }`}
            >
              {t.label}
              {isActive && (
                <span className="absolute -bottom-px left-0 right-0 h-[2px] rounded-pill bg-ink" />
              )}
            </button>
          );
        })}
      </div>

      {active === "experience" ? (
        <ExperienceEducation
          experience={profile.experience}
          education={profile.education}
        />
      ) : (
        <AboutMe
          bio={profile.bio}
          skills={profile.tags}
          info={profile.personalInfo}
        />
      )}
    </section>
  );
}

/* ───────────────── Experience & Education ───────────────── */

function ExperienceEducation({
  experience,
  education,
}: {
  experience: ExperienceItem[];
  education: EducationItem[];
}) {
  const [expExpanded, setExpExpanded] = useState(false);
  const [eduExpanded, setEduExpanded] = useState(false);

  const visibleExp = expExpanded ? experience : experience.slice(0, 2);
  const visibleEdu = eduExpanded ? education : education.slice(0, 2);

  return (
    <div className="flex flex-col gap-30">
      {/* Experience */}
      <div className="flex flex-col gap-15">
        <h3 className="font-display text-2xl font-medium text-ink leading-none">
          Experience
        </h3>
        <div className="flex flex-col gap-10">
          {visibleExp.map((item, i) => (
            <RowCard
              key={i}
              initials={initialsOf(item.organization)}
              tone={item.tone}
              title={item.organization}
              subtitle={`${item.role} · ${item.employmentType}`}
              period={item.period}
              logo={item.logo}
            />
          ))}
        </div>
        {experience.length > 2 && (
          <SeeMore
            expanded={expExpanded}
            onToggle={() => setExpExpanded((v) => !v)}
          />
        )}
      </div>

      {/* Education */}
      <div className="flex flex-col gap-15">
        <h3 className="font-display text-2xl font-medium text-ink leading-none">
          Education
        </h3>
        <div className="flex flex-col gap-10">
          {visibleEdu.map((item, i) => (
            <RowCard
              key={i}
              initials={initialsOf(item.institution)}
              tone={item.tone}
              title={item.institution}
              subtitle={item.degree}
              period={item.period}
              logo={item.logo}
            />
          ))}
        </div>
        {education.length > 2 && (
          <SeeMore
            expanded={eduExpanded}
            onToggle={() => setEduExpanded((v) => !v)}
          />
        )}
      </div>
    </div>
  );
}

function RowCard({
  initials,
  tone,
  title,
  subtitle,
  period,
  logo,
}: {
  initials: string;
  tone: "green" | "purple" | "sand";
  title: string;
  subtitle: string;
  period: string;
  logo?: string;
}) {
  return (
    <div className="flex items-center gap-15 rounded-md border border-line bg-white p-15 transition-colors hover:bg-canvas">
      {logo ? (
        <span className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-pill border border-line bg-white">
          <img
            src={logo}
            alt={title}
            className="h-full w-full object-cover"
          />
        </span>
      ) : (
        <span
          className={`inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-pill text-sm font-semibold ${toneInitials[tone]}`}
        >
          {initials}
        </span>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <p className="truncate text-base font-semibold text-ink leading-none">
          {title}
        </p>
        <p className="truncate text-sm text-muted leading-none">{subtitle}</p>
      </div>
      <div className="inline-flex shrink-0 items-center gap-5 whitespace-nowrap text-sm font-medium text-muted">
        <Icon name="clock" size={16} />
        {period}
      </div>
    </div>
  );
}

function SeeMore({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex w-fit items-center gap-5 self-center text-sm font-medium text-green-500 transition-colors hover:text-green-600"
    >
      {expanded ? "See Less" : "See More"}
      <ChevronDown
        className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
        strokeWidth={2.2}
      />
    </button>
  );
}

/* ───────────────── About Me ───────────────── */

function AboutMe({
  bio,
  skills,
  info,
}: {
  bio: string;
  skills: string[];
  info: PersonalInfo;
}) {
  const [expanded, setExpanded] = useState(false);
  const preview = 260;
  const needsTruncate = bio.length > preview;
  const shown = !needsTruncate || expanded ? bio : bio.slice(0, preview) + "… ";

  return (
    <div className="flex flex-col gap-20">
      {/* Bio */}
      <div className="flex flex-col gap-15">
        <h3 className="font-display text-2xl font-medium text-ink leading-none">
          About Me
        </h3>
        <p className="text-sm leading-[1.4] text-[#374151]">
          {shown}
          {needsTruncate && (
            <>
              {" "}
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-sm font-semibold text-green-500 transition-colors hover:text-green-600"
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            </>
          )}
        </p>
      </div>

      {/* Skills · Location · Email — 3 columns with vertical dividers */}
      <div className="flex flex-wrap items-start gap-20 md:flex-nowrap">
        {/* Skills */}
        <div className="flex min-w-0 flex-1 flex-col gap-10 md:border-r md:border-line md:pr-20">
          <h4 className="font-display text-2xl font-medium text-ink leading-none">
            Skills
          </h4>
          <SkillsOverflow skills={skills} />
        </div>

        {/* Location */}
        <div className="flex w-full flex-col gap-10 md:w-[210px] md:shrink-0 md:border-r md:border-line md:pr-20">
          <h4 className="font-display text-2xl font-medium text-ink leading-none">
            Location
          </h4>
          <div className="inline-flex items-center gap-10 text-base font-medium text-ink">
            <MapPin className="h-[16px] w-[16px] shrink-0 text-subtle" strokeWidth={1.8} />
            {info.location}
          </div>
        </div>

        {/* Email */}
        <div className="flex w-full flex-col gap-10 md:w-[210px] md:shrink-0">
          <h4 className="font-display text-2xl font-medium text-ink leading-none">
            Email
          </h4>
          <div className="inline-flex items-center gap-10 text-base font-medium text-ink">
            <Mail className="h-[16px] w-[16px] shrink-0 text-subtle" strokeWidth={1.8} />
            <span className="truncate">{info.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
