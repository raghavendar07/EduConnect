import { ChevronLeft, MapPin } from "lucide-react";
import { Icon } from "../ui/Icon";
import { Tag } from "../ui/Tag";
import type { Profile } from "../../types/profile";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : n.toLocaleString();
}

const toneClasses: Record<"green" | "purple" | "sand", string> = {
  green: "bg-green-500 text-white",
  purple: "bg-purple-700 text-white",
  sand: "bg-sand-200 text-ink",
};

export function ProfileBanner({
  profile,
  onBack,
}: {
  profile: Profile;
  onBack?: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-[20px] border border-line bg-white">
      {/* Cover */}
      <div className="relative h-[180px] w-full bg-gradient-to-br from-green-100 via-sand-100 to-purple-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(74,140,92,0.15),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(69,28,163,0.12),transparent_50%)]" />
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-20 top-15 inline-flex h-[32px] items-center gap-5 rounded-pill bg-white/90 px-15 text-xs font-semibold text-ink shadow-soft backdrop-blur transition-colors hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to feed
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-20 p-20">
        {/* Top row: avatar (overlapping) + action buttons */}
        <div className="flex items-center justify-between">
          <div
            className={`relative z-10 -mt-[90px] inline-flex h-[130px] w-[130px] shrink-0 items-center justify-center overflow-hidden rounded-pill font-display text-[40px] font-medium ring-[5px] ring-white shadow-soft ${toneClasses[profile.tone]}`}
            aria-label={profile.name}
          >
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              getInitials(profile.name)
            )}
          </div>

          <div className="flex shrink-0 items-center gap-10">
            <button className="inline-flex h-[44px] items-center gap-10 rounded-pill border border-line-soft bg-white px-20 text-sm font-medium text-ink transition-colors hover:bg-canvas">
              <Icon name="bubbleChat" size={18} />
              Message
            </button>
            <button className="inline-flex h-[44px] items-center gap-10 rounded-pill bg-ink px-20 text-sm font-medium text-white transition-colors hover:bg-black/85">
              <Icon name="userAdd" size={18} />
              Follow
            </button>
            <button
              aria-label="More options"
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-pill border border-line-soft bg-white text-muted transition-colors hover:bg-canvas"
            >
              <Icon name="moreVertical" size={18} />
            </button>
          </div>
        </div>

        {/* Identity (below the avatar row) */}
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

          <div className="flex items-center gap-15 text-xs font-medium text-subtle pt-5">
            <span className="inline-flex items-center gap-5">
              <MapPin className="h-[14px] w-[14px]" /> {profile.location}
            </span>
            <span className="h-[4px] w-[4px] rounded-pill bg-subtle/40" />
            <span>{profile.joined}</span>
          </div>

          <p className="line-clamp-2 max-w-[640px] text-sm leading-[1.5] text-[#374151]">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-10 pt-5">
            {profile.tags.map((t) => (
              <Tag key={t} tone="neutral" size="md">
                {t}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
