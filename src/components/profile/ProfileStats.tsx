import type { Profile } from "../../types/profile";

const labels: Array<{ key: keyof Profile["stats"]; label: string }> = [
  { key: "posts", label: "Posts" },
  { key: "followers", label: "Followers" },
  { key: "following", label: "Following" },
];

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return n.toString();
}

export function ProfileStats({ profile }: { profile: Profile }) {
  return (
    <div className="grid grid-cols-3 rounded-md border border-line bg-white p-20">
      {labels.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col items-center justify-center gap-5 border-r border-line last:border-r-0"
        >
          <p className="font-display text-2xl font-medium text-ink leading-none">
            {formatCount(profile.stats[key])}
          </p>
          <p className="text-xs font-medium uppercase tracking-eyebrow text-subtle">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ProfileHighlights({ profile }: { profile: Profile }) {
  const surfaces = {
    green: "bg-green-50 border-green-100",
    purple: "bg-purple-50 border-purple-200",
    sand: "bg-sand-100/70 border-sand-200",
  };
  return (
    <div className="flex flex-col gap-15 rounded-[20px] border border-line bg-white p-20">
      <h3 className="text-lg font-semibold text-ink leading-none">
        Highlights
      </h3>
      <div className="grid grid-cols-3 gap-10">
        {profile.highlights.map((h) => (
          <div
            key={h.label}
            className={`flex flex-col gap-5 rounded-md border p-15 ${surfaces[h.tone]}`}
          >
            <p className="font-display text-2xl font-medium text-ink leading-none">
              {h.value}
            </p>
            <p className="text-xs font-medium text-muted leading-none">
              {h.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
