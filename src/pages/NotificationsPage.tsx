import { useState } from "react";
import { ChevronLeft, Paperclip } from "lucide-react";
import { Avatar } from "../components/ui/Avatar";
import { notifications, type Notification } from "../data/notifications";

type Version = "v1" | "v2";

const toneDot: Record<"green" | "purple" | "sand", string> = {
  green: "bg-green-500",
  purple: "bg-purple-700",
  sand: "bg-sand-300",
};

export function NotificationsPage({ onBack }: { onBack: () => void }) {
  const [version, setVersion] = useState<Version>("v1");

  return (
    <div className="mx-auto flex w-full max-w-[780px] flex-col gap-15">
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex w-fit items-center gap-[6px] text-sm font-semibold text-ink transition-colors hover:text-subtle"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      {/* Version switcher */}
      <VersionSwitcher version={version} onChange={setVersion} />

      <section className="rounded-[20px] border border-line bg-white p-25">
        {/* Title */}
        <h1 className="font-display text-2xl text-ink leading-none">
          Notifications
        </h1>

        {/* List */}
        <ul className="mt-15 flex flex-col">
          {notifications.map((n, i) => (
            <li key={n.id}>
              {version === "v1" ? (
                <V1Row
                  notification={n}
                  isLast={i === notifications.length - 1}
                />
              ) : (
                <V2Row
                  notification={n}
                  isLast={i === notifications.length - 1}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ───────────── Version switcher ───────────── */

function VersionSwitcher({
  version,
  onChange,
}: {
  version: Version;
  onChange: (v: Version) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-15 rounded-pill border border-line bg-white px-15 py-[6px]">
      <div
        role="tablist"
        aria-label="Notifications layout"
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
        {version === "v1" ? "Activity stream" : "Titled feed"}
      </span>
    </div>
  );
}

/* ───────────── V1 — classic activity stream ───────────── */

function V1Row({
  notification,
  isLast,
}: {
  notification: Notification;
  isLast: boolean;
}) {
  return (
    <div
      className={`-mx-[8px] flex w-[calc(100%+16px)] items-start gap-15 rounded-md px-[8px] py-20 transition-colors hover:bg-canvas ${
        isLast ? "" : "border-b border-line"
      }`}
    >
      <Avatar
        name={notification.avatarName}
        src={notification.avatarSrc}
        tone={notification.avatarTone}
        size="md"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
        <p className="text-sm leading-[1.5]">{notification.body}</p>
        <span className="text-xs text-subtle">{notification.time}</span>

        {notification.variant === "invite" && (
          <div className="mt-5 flex items-center gap-10">
            <button className="rounded-pill border border-line bg-white px-15 py-[6px] text-xs font-medium text-ink hover:bg-canvas">
              Deny
            </button>
            <button className="rounded-pill bg-ink px-15 py-[6px] text-xs font-medium text-white hover:bg-black/85">
              Approve
            </button>
          </div>
        )}

        {notification.variant === "file" && (
          <button className="mt-5 inline-flex items-center gap-[6px] self-start rounded-pill border border-line bg-white px-10 py-[6px] text-xs text-ink hover:bg-canvas">
            <Paperclip className="h-[12px] w-[12px]" strokeWidth={2} />
            <span className="font-medium">{notification.file.name}</span>
            <span className="text-subtle">({notification.file.size})</span>
          </button>
        )}

        {notification.variant === "comment" && (
          <div className="mt-5 self-start rounded-md border border-line bg-canvas px-15 py-[8px] text-xs text-ink">
            {notification.comment}
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────── V2 — titled feed (inspiration layout) ───────────── */

function V2Row({
  notification,
  isLast,
}: {
  notification: Notification;
  isLast: boolean;
}) {
  return (
    <div
      className={`-mx-[8px] flex w-[calc(100%+16px)] items-start gap-15 rounded-md px-[8px] py-20 transition-colors hover:bg-canvas ${
        isLast ? "" : "border-b border-line"
      }`}
    >
      {/* Real profile avatar */}
      <Avatar
        name={notification.avatarName}
        src={notification.avatarSrc}
        tone={notification.avatarTone}
        size="md"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
        {/* Title row: bullet + title (left), time (right) */}
        <div className="flex items-start justify-between gap-10">
          <div className="flex min-w-0 items-center gap-[8px]">
            <span
              className={`h-[6px] w-[6px] shrink-0 rounded-pill ${
                toneDot[notification.avatarTone]
              }`}
            />
            <p className="truncate text-sm font-semibold text-ink leading-[1.2]">
              {notification.title}
            </p>
          </div>
          <span className="shrink-0 text-xs font-medium text-subtle leading-[1.2]">
            {notification.time}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-[1.5] text-muted">{notification.body}</p>

        {/* Variant-specific extras */}
        {notification.variant === "invite" && (
          <div className="mt-[4px] flex items-center gap-10">
            <button className="rounded-pill border border-line bg-white px-15 py-[6px] text-xs font-medium text-ink hover:bg-canvas">
              Deny
            </button>
            <button className="rounded-pill bg-ink px-15 py-[6px] text-xs font-medium text-white hover:bg-black/85">
              Approve
            </button>
          </div>
        )}

        {notification.variant === "file" && (
          <button className="mt-[4px] inline-flex items-center gap-[6px] self-start rounded-pill border border-line bg-white px-10 py-[6px] text-xs text-ink hover:bg-canvas">
            <Paperclip className="h-[12px] w-[12px]" strokeWidth={2} />
            <span className="font-medium">{notification.file.name}</span>
            <span className="text-subtle">({notification.file.size})</span>
          </button>
        )}

        {notification.variant === "comment" && (
          <div className="mt-[4px] self-start rounded-md border border-line bg-canvas px-15 py-[8px] text-xs text-ink">
            {notification.comment}
          </div>
        )}
      </div>
    </div>
  );
}
