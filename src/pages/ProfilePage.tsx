import { useLayoutEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Briefcase,
  ChevronLeft,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Send,
  Share2,
  User,
} from "lucide-react";
import { ProfileBanner } from "../components/profile/ProfileBanner";
import { ProfileStats } from "../components/profile/ProfileStats";
import { ProfileAbout } from "../components/profile/ProfileAbout";
import {
  EditProfileModal,
  type ProfileEditablePatch,
} from "../components/profile/EditProfileModal";
import { Tabs } from "../components/sections/Tabs";
import { PostCard, type Post } from "../components/cards/PostCard";
import { Icon } from "../components/ui/Icon";
import { Tag } from "../components/ui/Tag";
import type { Profile } from "../types/profile";

export type PageVersion = "v1" | "v2" | "v3";

export function ProfilePage({
  profile,
  onBack,
  isSelf = false,
  onUpdate,
  version: versionProp,
  onVersionChange,
}: {
  profile: Profile;
  onBack: () => void;
  isSelf?: boolean;
  onUpdate?: (patch: Partial<Profile>) => void;
  version?: PageVersion;
  onVersionChange?: (v: PageVersion) => void;
}) {
  const [editing, setEditing] = useState(false);
  // v1 and v2 are hidden for now — v3 is the only layout shown.
  void versionProp;
  void onVersionChange;

  const handleSave = (patch: ProfileEditablePatch) => {
    if (!onUpdate) return;
    const { personalInfo, ...rest } = patch;
    const merged: Partial<Profile> = { ...rest };
    if (personalInfo) {
      merged.personalInfo = { ...profile.personalInfo, ...personalInfo };
    }
    onUpdate(merged);
  };

  return (
    <div className="flex flex-col gap-20">
      <ProfileV3
        profile={profile}
        onBack={onBack}
        isSelf={isSelf}
        onEdit={isSelf ? () => setEditing(true) : undefined}
      />

      {editing && isSelf && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

/* ───────────── Version switcher ───────────── */

function VersionSwitcher({
  version,
  onChange,
}: {
  version: PageVersion;
  onChange: (v: PageVersion) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-15 rounded-pill border border-line bg-white px-15 py-[6px]">
      <div
        role="tablist"
        aria-label="Profile layout"
        className="inline-flex items-center rounded-pill border border-line bg-canvas p-[2px]"
      >
        {(["v1", "v2", "v3"] as const).map((v) => {
          const active = v === version;
          return (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(v)}
              className={`inline-flex h-[26px] items-center rounded-pill px-[12px] text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                active
                  ? "bg-white text-ink shadow-soft"
                  : "text-subtle hover:text-ink"
              }`}
            >
              {v}
            </button>
          );
        })}
      </div>
      <span className="hidden text-[11px] font-medium text-subtle md:inline">
        {version === "v1"
          ? "Detailed profile"
          : version === "v2"
          ? "Link-in-bio style"
          : "Portfolio cover"}
      </span>
    </div>
  );
}

/* ───────────── V2 — link-in-bio style ───────────── */

const POST_TONES: Array<"green" | "purple" | "sand"> = ["green", "purple", "sand"];
const toneSurface: Record<"green" | "purple" | "sand", string> = {
  green: "bg-green-100",
  purple: "bg-purple-100",
  sand: "bg-sand-100",
};
const toneInk: Record<"green" | "purple" | "sand", string> = {
  green: "text-green-700",
  purple: "text-purple-700",
  sand: "text-ink",
};

function handleFromProfile(profile: Profile): string {
  const first = (profile.personalInfo.email || profile.name).split("@")[0];
  return "@" + first.replace(/[^a-z0-9.]/gi, "").toLowerCase();
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString();
}

function ProfileV2({
  profile,
  onBack,
  isSelf,
  onEdit,
}: {
  profile: Profile;
  onBack?: () => void;
  isSelf?: boolean;
  onEdit?: () => void;
}) {
  const posts = profile.posts.slice(0, 3);
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-25">
      {/* Back */}
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex w-fit items-center gap-[6px] text-sm font-semibold text-ink transition-colors hover:text-subtle"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}

      {/* Identity card — white background */}
      <section className="flex flex-col gap-25 rounded-[20px] border border-line bg-white p-25">
      {/* Avatar */}
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-pill bg-sand-200 shadow-soft">
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="inline-flex h-full w-full items-center justify-center font-display text-2xl text-ink">
            {initials(profile.name)}
          </span>
        )}
      </div>

      {/* Name + handle */}
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-center gap-[8px]">
          <h1 className="font-display text-[34px] font-semibold text-ink leading-[1.1]">
            {profile.name}
          </h1>
          <VerifiedCheck />
        </div>
        <span className="text-sm text-subtle">{handleFromProfile(profile)}</span>
      </div>

      {/* Stats + actions row */}
      <div className="flex flex-wrap items-end justify-between gap-20">
        <div className="flex items-end gap-[40px]">
          <Stat value={formatCount(profile.stats.followers)} label="Followers" />
          <Stat value={formatCount(profile.stats.following)} label="Following" />
        </div>
        <div className="flex flex-wrap items-center gap-10">
          {isSelf ? (
            <>
              <button
                onClick={onEdit}
                className="inline-flex h-[40px] items-center gap-[8px] rounded-pill bg-ink px-20 text-sm font-medium text-white transition-colors hover:bg-black/85"
              >
                Edit profile
              </button>
              <button className="inline-flex h-[40px] items-center gap-[8px] rounded-pill border border-line bg-white px-20 text-sm font-medium text-ink transition-colors hover:bg-canvas">
                Share profile
              </button>
            </>
          ) : (
            <>
              <button className="inline-flex h-[40px] items-center gap-[8px] rounded-pill bg-ink px-20 text-sm font-medium text-white transition-colors hover:bg-black/85">
                <Icon name="userAdd" size={16} />
                Follow
              </button>
              <button className="inline-flex h-[40px] items-center gap-[8px] rounded-pill border border-line bg-white px-20 text-sm font-medium text-ink transition-colors hover:bg-canvas">
                <Icon name="bubbleChat" size={16} />
                Message
              </button>
            </>
          )}
          <button
            aria-label="More options"
            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-pill border border-line bg-white text-muted transition-colors hover:bg-canvas"
          >
            <MoreHorizontal className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-[4px]">
        <p
          className={`w-full text-sm leading-[1.5] text-[#374151] ${
            bioExpanded ? "" : "line-clamp-2"
          }`}
        >
          {profile.bio}
        </p>
        <button
          type="button"
          onClick={() => setBioExpanded((v) => !v)}
          className="w-fit text-sm font-semibold text-green-500 transition-colors hover:text-green-600"
        >
          {bioExpanded ? "Read less" : "Read more"}
        </button>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-10 text-xs font-medium text-subtle">
        <span>{profile.joined}</span>
        <span className="h-[4px] w-[4px] rounded-pill bg-subtle/40" />
        <span className="inline-flex items-center gap-5">
          <MapPin className="h-[14px] w-[14px]" /> {profile.location}
        </span>
        {profile.school && (
          <>
            <span className="h-[4px] w-[4px] rounded-pill bg-subtle/40" />
            <span>{profile.school}</span>
          </>
        )}
      </div>

      {/* Tags */}
      {profile.tags.length > 0 && (
        <div className="flex flex-wrap gap-[8px]">
          {profile.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="inline-flex h-[28px] items-center rounded-pill border border-line bg-canvas px-[12px] text-[10px] font-semibold uppercase tracking-[0.1em] text-subtle"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      </section>

      {/* Posts card */}
      <section className="flex flex-col gap-20 rounded-[20px] border border-line bg-white p-25">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink leading-none">
            Posts
          </h2>
          <button className="inline-flex h-[32px] items-center rounded-pill border border-line bg-white px-15 text-xs font-semibold text-ink transition-colors hover:bg-canvas">
            See all
          </button>
        </div>
        {posts.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-line bg-canvas/60 p-30 text-center text-sm text-muted">
            {isSelf
              ? "You haven't posted anything yet."
              : "No posts yet."}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <PostTile key={i} post={p} tone={POST_TONES[i % POST_TONES.length]} />
            ))}
          </div>
        )}
      </section>

      {/* About / Experience / Education — tabbed, white card */}
      <section className="rounded-[20px] border border-line bg-white p-25">
        <AboutExpEduTabs profile={profile} />
      </section>
    </div>
  );
}

/* ───────────── Tabbed About / Experience / Education ───────────── */

type V2Tab = "about" | "experience" | "education";

function AboutExpEduTabs({ profile }: { profile: Profile }) {
  const [active, setActive] = useState<V2Tab>("about");
  const tabs: Array<{ key: V2Tab; label: string; icon: React.ReactNode }> = [
    { key: "about", label: "About", icon: <User className="h-[16px] w-[16px]" strokeWidth={1.5} /> },
    {
      key: "experience",
      label: "Experience",
      icon: <Briefcase className="h-[16px] w-[16px]" strokeWidth={1.5} />,
    },
    {
      key: "education",
      label: "Education",
      icon: <GraduationCap className="h-[16px] w-[16px]" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="flex flex-col gap-20">
      {/* Tabs — pill style matching the feed */}
      <div
        role="tablist"
        aria-label="Profile details"
        className="flex flex-wrap items-center gap-15"
      >
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.key)}
              className={`inline-flex items-center gap-[8px] rounded-pill border px-20 py-10 text-sm font-medium transition-colors ${
                isActive
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink hover:border-ink/30"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {active === "about" && (
        <div className="flex flex-col gap-15">
          <h3 className="font-display text-2xl font-semibold text-ink leading-none">
            About
          </h3>
          <p className="text-sm leading-[1.6] text-[#374151]">{profile.bio}</p>
        </div>
      )}

      {active === "experience" && (
        <div className="flex flex-col">
          {profile.experience.length === 0 ? (
            <p className="text-sm text-muted">No experience added yet.</p>
          ) : (
            profile.experience.map((item, i) => (
              <EntryRow
                key={i}
                title={item.role}
                subtitle={`${item.employmentType} · ${item.organization}`}
                period={item.period}
                description={item.description}
                logo={item.logo}
                tone={item.tone}
                initialsOf={item.organization}
                isLast={i === profile.experience.length - 1}
              />
            ))
          )}
        </div>
      )}

      {active === "education" && (
        <div className="flex flex-col">
          {profile.education.length === 0 ? (
            <p className="text-sm text-muted">No education added yet.</p>
          ) : (
            profile.education.map((item, i) => (
              <EntryRow
                key={i}
                title={item.degree}
                subtitle={
                  item.grade ? `${item.grade} · ${item.institution}` : item.institution
                }
                period={item.period}
                description={item.description}
                logo={item.logo}
                tone={item.tone}
                initialsOf={item.institution}
                isLast={i === profile.education.length - 1}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ───────────── Entry row for experience / education ───────────── */

function EntryRow({
  title,
  subtitle,
  period,
  description,
  logo,
  tone,
  initialsOf,
  isLast,
}: {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  logo?: string;
  tone: "green" | "purple" | "sand";
  initialsOf: string;
  isLast: boolean;
}) {
  const toneClass = {
    green: "bg-green-500 text-white",
    purple: "bg-purple-700 text-white",
    sand: "bg-sand-200 text-ink",
  }[tone];
  const initials = initialsOf
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`flex gap-15 py-20 ${isLast ? "" : "border-b border-line"}`}
    >
      {logo ? (
        <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center overflow-hidden rounded-pill border border-line bg-white">
          <img src={logo} alt={title} className="h-full w-full object-cover" />
        </span>
      ) : (
        <span
          className={`inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-pill text-sm font-semibold ring-2 ring-white ${toneClass}`}
        >
          {initials}
        </span>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
        <div className="flex items-baseline justify-between gap-15">
          <p className="text-base font-semibold text-ink leading-[1.25]">
            {title}
          </p>
          <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-ink">
            {period}
          </span>
        </div>
        <p className="text-sm text-muted leading-[1.3]">{subtitle}</p>
        {description && (
          <p className="line-clamp-2 text-sm leading-[1.5] text-muted/90">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-start gap-[4px] leading-none">
      <span className="font-display text-[22px] font-semibold text-ink">{value}</span>
      <span className="text-xs font-medium text-subtle">{label}</span>
    </div>
  );
}

function VerifiedCheck() {
  return (
    <span
      aria-label="Verified"
      className="inline-flex h-[20px] w-[20px] items-center justify-center rounded-pill bg-purple-700 text-white"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="h-[12px] w-[12px]"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function PostTile({
  post,
  tone,
}: {
  post: Post;
  tone: "green" | "purple" | "sand";
}) {
  const cover = post.images && post.images[0];
  return (
    <button
      type="button"
      className={`group relative flex h-[180px] w-full flex-col justify-between overflow-hidden rounded-[16px] p-15 text-left transition-transform hover:-translate-y-[2px] ${
        cover ? "bg-ink text-white" : `${toneSurface[tone]} ${toneInk[tone]}`
      }`}
    >
      {cover && (
        <>
          <img
            src={cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />
        </>
      )}

      <div className="relative flex items-start justify-between">
        <span
          className={`inline-flex h-[28px] items-center rounded-pill px-[10px] text-[10px] font-semibold uppercase tracking-[0.08em] ${
            cover
              ? "bg-white/90 text-ink"
              : "bg-white/70 text-ink"
          }`}
        >
          Post
        </span>
        <span
          className={`inline-flex h-[28px] w-[28px] items-center justify-center rounded-pill transition-transform group-hover:-translate-y-[1px] ${
            cover ? "bg-white text-ink" : "bg-white text-ink"
          }`}
        >
          <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={2} />
        </span>
      </div>

      <div className="relative flex flex-col gap-[4px]">
        <p
          className={`line-clamp-2 text-sm font-semibold leading-[1.3] ${
            cover ? "text-white" : ""
          }`}
        >
          {post.title}
        </p>
        <p
          className={`text-[11px] font-medium ${
            cover ? "text-white/80" : "text-muted"
          }`}
        >
          {post.time} · {post.stats.likes} likes
        </p>
      </div>
    </button>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ───────────── V3 — portfolio cover style ───────────── */

type V3Tab = "posts" | "comments" | "resources";

function ProfileV3({
  profile,
  onBack,
  isSelf,
  onEdit,
}: {
  profile: Profile;
  onBack?: () => void;
  isSelf?: boolean;
  onEdit?: () => void;
}) {
  const [active, setActive] = useState<V3Tab>("posts");
  const tabs: Array<{ key: V3Tab; label: string }> = [
    { key: "posts", label: "Posts" },
    { key: "comments", label: "Comments" },
    { key: "resources", label: "Resources" },
  ];
  return (
    <div className="-mx-30 flex flex-col bg-white pb-45">
      {/* Cover banner — centered, 1300px */}
      <div className="mx-auto w-full max-w-[1300px]">
        <div className="relative h-[260px] overflow-hidden rounded-[24px] bg-[linear-gradient(120deg,#eef7f0_0%,#f1f1ea_55%,#f5f0e6_100%)]">
          {/* Back button */}
          {onBack && (
            <button
              onClick={onBack}
              className="absolute left-20 top-20 inline-flex h-[36px] items-center gap-[6px] rounded-pill bg-white/95 px-15 text-sm font-semibold text-ink shadow-soft transition-colors hover:bg-white"
            >
              <ChevronLeft className="h-[16px] w-[16px]" strokeWidth={2} />
              Back to feed
            </button>
          )}
        </div>
      </div>

      {/* Body — centered */}
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-[440px_1fr] gap-[60px]">
        {/* Sidebar — shifted 80px right */}
        <aside className="flex flex-col gap-25 pl-[80px] pt-20">
          {/* Avatar overlapping banner — image aligned to top so face shows */}
          <div className="relative z-10 -mt-[120px] inline-flex h-[180px] w-[180px] overflow-hidden rounded-pill bg-sand-200 ring-[6px] ring-white">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <span className="inline-flex h-full w-full items-center justify-center font-display text-[40px] text-ink">
                {initials(profile.name)}
              </span>
            )}
          </div>

          {/* Identity — mirrors v1 layout */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <h1 className="font-display text-4xl leading-[1.1] text-ink">
                {profile.name}
              </h1>
              <p className="text-base text-muted">
                <span className="font-medium text-ink">{profile.role}</span>
                <span className="mx-5 text-subtle/60">·</span>
                <span>{profile.school}</span>
              </p>
            </div>

            <p className="text-sm text-muted">
              <span className="font-semibold text-ink">
                {formatCount(profile.stats.followers)}
              </span>{" "}
              Followers
              <span className="mx-10" />
              <span className="font-semibold text-ink">
                {formatCount(profile.stats.following)}
              </span>{" "}
              Following
            </p>

            <div className="flex flex-wrap items-center gap-10 pt-5 text-xs font-medium text-subtle">
              <span className="inline-flex items-center gap-5">
                <MapPin className="h-[14px] w-[14px]" /> {profile.location}
              </span>
              <span className="h-[4px] w-[4px] rounded-pill bg-subtle/40" />
              <span>{profile.joined}</span>
            </div>

            <p className="line-clamp-2 text-sm leading-[1.5] text-[#374151]">
              {profile.bio}
            </p>

            {profile.tags.length > 0 && (
              <SidebarTagRow tags={profile.tags} />
            )}
          </div>

          {/* Actions — matches v1 styles */}
          <div className="flex flex-col gap-10">
            {isSelf ? (
              <>
                <button
                  onClick={onEdit}
                  className="inline-flex h-[44px] items-center justify-center gap-10 rounded-pill bg-ink px-20 text-sm font-medium text-white transition-colors hover:bg-black/85"
                >
                  <Pencil className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  Edit profile
                </button>
                <button className="inline-flex h-[44px] items-center justify-center gap-10 rounded-pill border border-line-soft bg-white px-20 text-sm font-medium text-ink transition-colors hover:bg-canvas">
                  <Share2 className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  Share profile
                </button>
              </>
            ) : (
              <>
                <button className="inline-flex h-[44px] items-center justify-center gap-10 rounded-pill bg-ink px-20 text-sm font-medium text-white transition-colors hover:bg-black/85">
                  <Icon name="userAdd" size={18} />
                  Follow
                </button>
                <button className="inline-flex h-[44px] items-center justify-center gap-10 rounded-pill border border-line-soft bg-white px-20 text-sm font-medium text-ink transition-colors hover:bg-canvas">
                  <Icon name="bubbleChat" size={18} />
                  Message
                </button>
              </>
            )}
          </div>

          {/* Experience */}
          <SidebarList
            title="Experience"
            emptyLabel="No experience added yet."
            items={profile.experience.map((e) => ({
              title: e.role,
              subtitle: e.organization,
              period: e.period,
              tone: e.tone,
              initialsOf: e.organization,
              logo: e.logo,
            }))}
          />

          {/* Education */}
          <SidebarList
            title="Education"
            emptyLabel="No education added yet."
            items={profile.education.map((e) => ({
              title: e.degree,
              subtitle: e.institution,
              period: e.period,
              tone: e.tone,
              initialsOf: e.institution,
              logo: e.logo,
            }))}
          />
        </aside>

        {/* Main content — fixed 680px */}
        <main className="flex pt-30">
          <div className="flex w-[680px] max-w-full flex-col gap-25">
            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Profile content"
              className="flex items-center gap-30 border-b border-line"
            >
              {tabs.map((t) => {
                const isActive = t.key === active;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(t.key)}
                    className={`relative -mb-[1px] pb-[14px] text-base font-semibold transition-colors ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {t.label}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[2px] rounded-pill bg-ink"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            {active === "posts" && <WorkGrid profile={profile} isSelf={isSelf} />}
            {active === "comments" && <EmptyGridState label="comments" />}
            {active === "resources" && <EmptyGridState label="resources" />}
          </div>
        </main>
      </div>
    </div>
  );
}

function WorkGrid({ profile, isSelf }: { profile: Profile; isSelf?: boolean }) {
  const posts = profile.posts;
  if (posts.length === 0) {
    return (
      <div className="rounded-[20px] border border-dashed border-line bg-canvas/60 p-30 text-center text-sm text-muted">
        {isSelf ? "You haven't published any work yet." : "No work to show yet."}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-20">
      {posts.map((p, i) => (
        <V3FeedCard key={i} post={p} />
      ))}
    </div>
  );
}

function SidebarTagRow({ tags }: { tags: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;
    const compute = () => {
      const width = container.offsetWidth;
      if (width === 0) return;
      const tagEls = Array.from(
        measure.querySelectorAll<HTMLElement>("[data-tag]")
      );
      const moreEl = measure.querySelector<HTMLElement>("[data-more]");
      const moreWidth = moreEl?.offsetWidth ?? 0;
      const gap = 10;
      let used = 0;
      let count = 0;
      for (let i = 0; i < tagEls.length; i++) {
        const w = tagEls[i].offsetWidth;
        const nextUsed = count === 0 ? w : used + gap + w;
        const remaining = tagEls.length - (i + 1);
        const reserve = remaining > 0 ? moreWidth + gap : 0;
        if (nextUsed + reserve <= width) {
          used = nextUsed;
          count = i + 1;
        } else break;
      }
      setVisibleCount(count);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    return () => ro.disconnect();
  }, [tags]);

  const hiddenCount = Math.max(0, tags.length - visibleCount);
  return (
    <div
      ref={containerRef}
      className="relative flex flex-nowrap items-center gap-10 pt-5"
    >
      {/* Measurement layer — invisible, absolutely positioned */}
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 flex items-center gap-10 whitespace-nowrap"
      >
        {tags.map((t) => (
          <span key={t} data-tag>
            <Tag tone="neutral" size="md" className="shrink-0 whitespace-nowrap">
              {t}
            </Tag>
          </span>
        ))}
        <span data-more>
          <Tag tone="neutral" size="md" className="shrink-0 whitespace-nowrap">
            +{tags.length}
          </Tag>
        </span>
      </div>
      {/* Visible tags */}
      {tags.slice(0, visibleCount).map((t) => (
        <Tag
          key={t}
          tone="neutral"
          size="md"
          className="shrink-0 whitespace-nowrap"
        >
          {t}
        </Tag>
      ))}
      {hiddenCount > 0 && (
        <Tag tone="neutral" size="md" className="shrink-0 whitespace-nowrap">
          +{hiddenCount}
        </Tag>
      )}
    </div>
  );
}

function V3FeedCard({ post }: { post: Post }) {
  const images = post.images ?? [];
  const cover = images[0];
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="flex flex-col gap-15 rounded-[20px] border border-line bg-white p-15">
      <div className="flex flex-col gap-10 px-5 pt-5">
        <h3 className="font-display text-xl leading-[1.2] text-ink">
          {post.title}
        </h3>

        <div className="flex flex-col items-start gap-5">
          <p
            className={`text-sm leading-[1.55] text-muted ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {post.excerpt}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-sm font-semibold text-ink transition-colors hover:text-subtle"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </div>
      </div>

      {cover && (
        <div className="relative h-[360px] w-full overflow-hidden rounded-[16px] bg-canvas">
          <img src={cover} alt="" className="h-full w-full object-cover" />
          {images.length > 1 && (
            <div className="absolute bottom-15 left-1/2 flex -translate-x-1/2 items-center gap-[6px]">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={
                    i === 0
                      ? "h-[6px] w-[20px] rounded-pill bg-white"
                      : "h-[6px] w-[6px] rounded-pill bg-white/60"
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reaction footer — matches v1 PostCard */}
      <footer className="flex items-center justify-between border-t border-line px-5 pt-10">
        <div className="flex items-center gap-15">
          <button className="inline-flex items-center gap-5 text-sm font-semibold text-subtle transition-colors hover:text-ink">
            <Heart className="h-[20px] w-[20px] fill-[#e57373] text-[#e57373]" />
            <span>{post.stats.likes}</span>
          </button>
          <button className="inline-flex items-center gap-5 text-sm font-semibold text-subtle transition-colors hover:text-ink">
            <MessageCircle className="h-[20px] w-[20px]" strokeWidth={1.8} />
            <span>{post.stats.comments}</span>
          </button>
          <button
            aria-label="Share"
            className="inline-flex h-[24px] w-[24px] items-center justify-center text-subtle transition-colors hover:text-ink"
          >
            <Send className="h-[20px] w-[20px]" strokeWidth={1.8} />
          </button>
        </div>
        <div className="flex items-center gap-10">
          <button
            aria-label="Bookmark"
            className="inline-flex h-[24px] w-[24px] items-center justify-center text-subtle transition-colors hover:text-ink"
          >
            <Bookmark className="h-[20px] w-[20px]" strokeWidth={1.8} />
          </button>
          <button
            aria-label="More options"
            className="inline-flex h-[20px] w-[20px] items-center justify-center text-subtle transition-colors hover:text-ink"
          >
            <MoreHorizontal className="h-[20px] w-[20px]" strokeWidth={1.8} />
          </button>
        </div>
      </footer>
    </article>
  );
}

function WorkTile({
  post,
  tone,
}: {
  post: Post;
  tone: "green" | "purple" | "sand";
}) {
  const cover = post.images && post.images[0];
  return (
    <button
      type="button"
      className={`group relative flex h-[300px] w-full flex-col justify-end overflow-hidden rounded-[16px] text-left transition-transform hover:-translate-y-[2px] ${
        cover ? "bg-ink text-white" : `${toneSurface[tone]} ${toneInk[tone]}`
      }`}
    >
      {cover && (
        <>
          <img
            src={cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        </>
      )}
      <div className="relative flex items-end justify-between gap-15 p-20">
        <div className="flex min-w-0 flex-col gap-[4px]">
          <p
            className={`line-clamp-2 text-base font-semibold leading-[1.3] ${
              cover ? "text-white" : ""
            }`}
          >
            {post.title}
          </p>
          <p
            className={`text-[12px] font-medium ${
              cover ? "text-white/80" : "text-muted"
            }`}
          >
            {post.time} · {post.stats.likes} likes
          </p>
        </div>
        <span
          className={`inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-pill transition-transform group-hover:-translate-y-[2px] ${
            cover ? "bg-white text-ink" : "bg-white text-ink"
          }`}
        >
          <ArrowUpRight className="h-[16px] w-[16px]" strokeWidth={2} />
        </span>
      </div>
    </button>
  );
}

function EmptyGridState({ label }: { label: string }) {
  return (
    <div className="rounded-[20px] border border-dashed border-line bg-canvas/60 p-30 text-center text-sm text-muted">
      No {label} yet.
    </div>
  );
}

type SidebarListItem = {
  title: string;
  subtitle: string;
  period: string;
  tone: "green" | "purple" | "sand";
  initialsOf: string;
  logo?: string;
};

function SidebarList({
  title,
  items,
  emptyLabel,
}: {
  title: string;
  items: SidebarListItem[];
  emptyLabel: string;
}) {
  return (
    <section className="flex flex-col gap-10">
      <h3 className="font-display text-xl leading-none text-ink">{title}</h3>
      {items.length === 0 ? (
        <p className="text-xs text-subtle">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col">
          {items.map((it, i) => (
            <SidebarListRow key={i} item={it} isLast={i === items.length - 1} />
          ))}
        </ul>
      )}
    </section>
  );
}

function SidebarListRow({
  item,
  isLast,
}: {
  item: SidebarListItem;
  isLast: boolean;
}) {
  const toneClass = {
    green: "bg-green-500 text-white",
    purple: "bg-purple-700 text-white",
    sand: "bg-sand-200 text-ink",
  }[item.tone];
  const init = item.initialsOf
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <li className={`flex gap-10 py-10 ${isLast ? "" : "border-b border-line"}`}>
      {item.logo ? (
        <span className="inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-pill border border-line bg-white">
          <img src={item.logo} alt={item.title} className="h-full w-full object-cover" />
        </span>
      ) : (
        <span
          className={`inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-pill text-[11px] font-semibold ${toneClass}`}
        >
          {init}
        </span>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <p className="truncate text-sm font-semibold leading-[1.25] text-ink">
          {item.title}
        </p>
        <p className="truncate text-xs text-muted">{item.subtitle}</p>
        <p className="text-[11px] font-medium text-subtle">{item.period}</p>
      </div>
    </li>
  );
}
