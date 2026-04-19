import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Bookmark,
  ChevronRight,
  Crown,
  HelpCircle,
  LifeBuoy,
  LogOut,
  Pencil,
  Settings,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

type PanelVersion = "v1" | "v2";

export function ProfilePanel({
  open,
  onClose,
  onViewProfile,
}: {
  open: boolean;
  onClose: () => void;
  onViewProfile: () => void;
}) {
  const [version, setVersion] = useState<PanelVersion>("v1");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const openProfile = () => {
    onClose();
    onViewProfile();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Profile"
      className="fixed inset-0 z-[100]"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 animate-[fadeIn_120ms_ease-out]"
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col overflow-y-auto bg-white shadow-[0_24px_48px_-12px_rgba(16,24,40,0.25)] animate-[slideInRight_180ms_ease-out]">
        {/* Version switcher — for design review */}
        <VersionSwitcher version={version} onChange={setVersion} onClose={onClose} />

        {version === "v1" ? (
          <VersionOne onClose={onClose} onOpenProfile={openProfile} />
        ) : (
          <VersionTwo onClose={onClose} onOpenProfile={openProfile} />
        )}
      </aside>
    </div>
  );
}

/* ───────────── Version switcher ───────────── */

function VersionSwitcher({
  version,
  onChange,
  onClose,
}: {
  version: PanelVersion;
  onChange: (v: PanelVersion) => void;
  onClose: () => void;
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-10 border-b border-line bg-white/95 px-15 py-[10px] backdrop-blur">
      <div
        role="tablist"
        aria-label="Design version"
        className="inline-flex items-center rounded-pill border border-line bg-canvas p-[2px]"
      >
        {(["v1", "v2"] as const).map((v) => {
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
        {version === "v1" ? "Classic dashboard" : "Branded & activity"}
      </span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-pill text-muted transition-colors hover:bg-canvas hover:text-ink"
      >
        <X className="h-[18px] w-[18px]" strokeWidth={2} />
      </button>
    </div>
  );
}

/* ───────────── Animated progress ring ───────────── */

function AnimatedProgressRing({
  percent,
  size = 88,
  stroke = 4,
  durationMs = 1100,
  src = "https://i.pravatar.cc/300?img=48",
  alt = "Sarah Iyer",
}: {
  percent: number;
  size?: number;
  stroke?: number;
  durationMs?: number;
  src?: string;
  alt?: string;
}) {
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const target = Math.max(0, Math.min(100, percent));
  const targetOffset = circumference * (1 - target / 100);

  const [count, setCount] = useState(0);

  // Count the percentage label up to `target` over `durationMs`.
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // ease-out cubic so the numbers slow down near the end, matching the ring's ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  const avatarSize = size - (stroke * 2 + 4);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(90deg) scaleX(-1)" }}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f0efeb"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2d7f44"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={targetOffset}
          style={
            {
              ["--ring-circumference" as string]: circumference,
              animation: `ringFill ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            } as React.CSSProperties
          }
        />
      </svg>
      <div
        className="relative overflow-hidden rounded-pill bg-sand-200"
        style={{ width: avatarSize, height: avatarSize, margin: stroke + 2 }}
        aria-hidden={false}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
      <span
        aria-live="polite"
        className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 rounded-pill bg-white px-[6px] text-[10px] font-semibold text-green-700 shadow-soft"
        style={{ minWidth: 32, textAlign: "center" }}
      >
        {count}%
      </span>
      <span className="sr-only">Profile {target}% complete</span>
    </div>
  );
}

/* ───────────── V1: classic dashboard (original) ───────────── */

function VersionOne({
  onClose: _onClose,
  onOpenProfile,
}: {
  onClose: () => void;
  onOpenProfile: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      {/* Identity */}
      <div className="flex items-start gap-15 px-25 pt-25 pb-20">
        <AnimatedProgressRing percent={100} />

        <div className="flex min-w-0 flex-1 flex-col gap-[6px] pt-[4px]">
          <h2 className="truncate font-display text-2xl font-semibold text-ink leading-[1.15]">
            Sarah Iyer
          </h2>
          <p className="text-sm text-muted">
            Biology Teacher at Delhi Public School
          </p>
          <button
            type="button"
            onClick={onOpenProfile}
            className="mt-[4px] w-fit text-sm font-semibold text-purple-700 transition-opacity hover:opacity-80"
          >
            View &amp; Update Profile
          </button>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="px-25">
        <button
          type="button"
          className="flex w-full items-center gap-15 rounded-pill border border-sand-200 bg-gradient-to-r from-sand-50 via-sand-100 to-sand-50 px-20 py-[10px] text-left transition-colors hover:from-sand-100 hover:via-sand-100 hover:to-sand-100"
        >
          <span className="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-pill bg-gradient-to-br from-[#8b6d2f] to-[#5b4520] text-white">
            <Crown className="h-[14px] w-[14px]" strokeWidth={2} />
          </span>
          <span className="flex-1 text-sm font-semibold text-ink">
            Upgrade to EduConnect Pro
          </span>
          <ChevronRight className="h-[16px] w-[16px] text-ink" strokeWidth={2} />
        </button>
      </div>

      <div className="my-20 h-px bg-line" />

      {/* Profile performance */}
      <div className="flex flex-col gap-15 px-25">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-lg font-semibold text-ink leading-none">
            Your profile performance
          </h3>
          <span className="text-xs text-subtle">Last 90 days</span>
        </div>

        <div className="flex items-stretch rounded-[16px] bg-purple-50">
          <V1Stat label="Profile Views" value="128" />
          <div className="my-15 w-px bg-line" />
          <V1Stat label="Student Messages" value="42" />
        </div>
      </div>

      {/* Menu */}
      <nav className="mt-25 flex flex-1 flex-col px-[10px] pb-20">
        <V1MenuRow
          icon={<BookOpen className="h-[18px] w-[18px]" strokeWidth={1.8} />}
          label="EduConnect Blog"
        />
        <V1MenuRow
          icon={<Settings className="h-[18px] w-[18px]" strokeWidth={1.8} />}
          label="Settings"
        />
        <V1MenuRow
          icon={<HelpCircle className="h-[18px] w-[18px]" strokeWidth={1.8} />}
          label="FAQs"
        />
        <V1MenuRow
          icon={<LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />}
          label="Logout"
          tone="danger"
        />
      </nav>
    </div>
  );
}

function V1Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-5 px-15 py-15">
      <span className="relative font-display text-[32px] font-semibold leading-none text-ink">
        {value}
        <span className="absolute -right-[8px] top-[4px] inline-block h-[6px] w-[6px] rounded-pill bg-[#c0392b]" />
      </span>
      <span className="text-sm font-medium text-ink">{label}</span>
      <button
        type="button"
        className="text-xs font-semibold text-purple-700 transition-opacity hover:opacity-80"
      >
        View all
      </button>
    </div>
  );
}

function V1MenuRow({
  icon,
  label,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  tone?: "default" | "danger";
}) {
  const colors =
    tone === "danger"
      ? "text-[#c0392b] hover:bg-[#fdecea]"
      : "text-ink hover:bg-canvas";
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-15 rounded-md px-15 py-[12px] text-sm font-medium transition-colors ${colors}`}
    >
      <span className="inline-flex h-[20px] w-[20px] items-center justify-center text-subtle">
        {icon}
      </span>
      {label}
    </button>
  );
}

/* ───────────── V2: branded & activity (current) ───────────── */

function VersionTwo({
  onClose: _onClose,
  onOpenProfile,
}: {
  onClose: () => void;
  onOpenProfile: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      {/* Branded hero cover */}
      <div className="relative h-[110px] w-full bg-gradient-to-br from-green-100 via-sand-100 to-purple-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(74,140,92,0.18),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(69,28,163,0.14),transparent_50%)]" />
      </div>

      {/* Identity */}
      <div className="flex flex-col gap-15 px-25 pb-20">
        <div className="-mt-[48px] flex items-start gap-15">
          <div className="relative shrink-0">
            <div className="h-[88px] w-[88px] overflow-hidden rounded-pill bg-sand-200 ring-[4px] ring-white shadow-soft">
              <img
                src="https://i.pravatar.cc/300?img=48"
                alt="Sarah Iyer"
                className="h-full w-full object-cover"
              />
            </div>
            <span
              aria-label="Verified educator"
              className="absolute bottom-[2px] right-[2px] inline-flex h-[24px] w-[24px] items-center justify-center rounded-pill bg-purple-700 text-white ring-2 ring-white"
            >
              <BadgeCheck className="h-[14px] w-[14px]" strokeWidth={2} />
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[4px] pt-[52px]">
            <h2 className="truncate font-display text-2xl font-semibold text-ink leading-[1.15]">
              Sarah Iyer
            </h2>
            <p className="truncate text-xs font-medium text-subtle">
              Biology Teacher · Delhi Public School
            </p>
          </div>
        </div>

        {/* Profile strength */}
        <div className="flex flex-col gap-[6px] rounded-md border border-line bg-canvas px-15 py-[10px]">
          <div className="flex items-center justify-between text-xs font-medium text-ink">
            <span>Profile strength</span>
            <span className="text-green-700">Excellent · 100%</span>
          </div>
          <div className="h-[6px] w-full overflow-hidden rounded-pill bg-line">
            <div className="h-full w-full rounded-pill bg-gradient-to-r from-green-500 to-green-700" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-10">
          <button
            type="button"
            onClick={onOpenProfile}
            className="inline-flex h-[40px] flex-1 items-center justify-center gap-[6px] rounded-pill bg-ink px-20 text-sm font-medium text-white transition-colors hover:bg-black/85"
          >
            View profile
            <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={onOpenProfile}
            className="inline-flex h-[40px] items-center justify-center gap-[6px] rounded-pill border border-line-soft bg-white px-20 text-sm font-medium text-ink transition-colors hover:bg-canvas"
          >
            <Pencil className="h-[14px] w-[14px]" strokeWidth={1.8} />
            Edit
          </button>
        </div>
      </div>

      {/* Upgrade CTA — branded */}
      <div className="px-25">
        <button
          type="button"
          className="group relative flex w-full items-center gap-15 overflow-hidden rounded-[16px] border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-purple-50 p-15 text-left transition-colors hover:border-purple-200"
        >
          <span className="absolute -right-[20px] -top-[20px] h-[80px] w-[80px] rounded-pill bg-purple-100/70 blur-2xl" />
          <span className="relative inline-flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-md bg-purple-700 text-white">
            <Sparkles className="h-[18px] w-[18px]" strokeWidth={2} />
          </span>
          <span className="relative flex flex-1 flex-col gap-[2px]">
            <span className="text-sm font-semibold text-ink leading-none">
              Get EduConnect Pro
            </span>
            <span className="text-xs text-muted">
              Mentor matching &amp; lesson analytics
            </span>
          </span>
          <span className="relative inline-flex h-[28px] items-center rounded-pill border border-purple-200 bg-white px-[10px] text-[11px] font-semibold text-purple-700">
            Try free
          </span>
        </button>
      </div>

      <div className="my-20 h-px bg-line" />

      {/* Activity */}
      <div className="flex flex-col gap-15 px-25">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-lg font-semibold text-ink leading-none">
            Your activity
          </h3>
          <span className="text-[11px] font-medium text-subtle">Last 30 days</span>
        </div>

        <div className="grid grid-cols-3 gap-10">
          <V2Stat label="Profile views" value="128" delta="+12%" tone="green" />
          <V2Stat label="Messages" value="42" delta="+4%" tone="purple" />
          <V2Stat label="Class reach" value="1.2k" delta="+8%" tone="sand" />
        </div>
      </div>

      {/* Menu */}
      <nav className="mt-25 flex flex-1 flex-col px-[10px] pb-25">
        <V2MenuRow
          icon={<Bookmark className="h-[16px] w-[16px]" strokeWidth={1.8} />}
          iconTone="green"
          label="Saved classes"
          hint="23"
        />
        <V2MenuRow
          icon={<Settings className="h-[16px] w-[16px]" strokeWidth={1.8} />}
          iconTone="purple"
          label="Settings & privacy"
        />
        <V2MenuRow
          icon={<LifeBuoy className="h-[16px] w-[16px]" strokeWidth={1.8} />}
          iconTone="sand"
          label="Help center"
        />
        <V2MenuRow
          icon={<HelpCircle className="h-[16px] w-[16px]" strokeWidth={1.8} />}
          iconTone="sand"
          label="FAQs"
        />
        <div className="my-[4px] mx-15 h-px bg-line" />
        <V2MenuRow
          icon={<LogOut className="h-[16px] w-[16px]" strokeWidth={1.8} />}
          iconTone="danger"
          label="Sign out"
          tone="danger"
        />
      </nav>
    </div>
  );
}

function V2Stat({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "green" | "purple" | "sand";
}) {
  const deltaClass =
    tone === "green"
      ? "text-green-700 bg-green-50"
      : tone === "purple"
      ? "text-purple-700 bg-purple-50"
      : "text-ink bg-sand-50";
  return (
    <div className="flex flex-col gap-5 rounded-md border border-line bg-white p-15">
      <span
        className={`inline-flex w-fit items-center gap-[3px] rounded-pill px-[6px] py-[2px] text-[10px] font-semibold ${deltaClass}`}
      >
        <TrendingUp className="h-[10px] w-[10px]" strokeWidth={2.2} />
        {delta}
      </span>
      <span className="font-display text-[22px] font-semibold leading-none text-ink">
        {value}
      </span>
      <span className="text-[11px] font-medium text-subtle">{label}</span>
    </div>
  );
}

function V2MenuRow({
  icon,
  label,
  hint,
  tone = "default",
  iconTone = "ink",
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  tone?: "default" | "danger";
  iconTone?: "ink" | "green" | "purple" | "sand" | "danger";
}) {
  const rowColors =
    tone === "danger"
      ? "text-[#c0392b] hover:bg-[#fdecea]"
      : "text-ink hover:bg-canvas";

  const iconColors = {
    ink: "bg-canvas text-ink",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    sand: "bg-sand-50 text-ink",
    danger: "bg-[#fdecea] text-[#c0392b]",
  }[iconTone];

  return (
    <button
      type="button"
      className={`flex w-full items-center gap-15 rounded-md px-15 py-[10px] text-sm font-medium transition-colors ${rowColors}`}
    >
      <span
        className={`inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md ${iconColors}`}
      >
        {icon}
      </span>
      <span className="flex-1 text-left">{label}</span>
      {hint && <span className="text-[11px] font-medium text-subtle">{hint}</span>}
    </button>
  );
}
