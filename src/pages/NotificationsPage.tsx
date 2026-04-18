import { ArrowLeft, Paperclip } from "lucide-react";
import { Avatar } from "../components/ui/Avatar";
import { notifications } from "../data/notifications";

export function NotificationsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-[780px] flex-col">
      <div className="rounded-[20px] border border-line bg-white">
        <div className="flex items-start justify-between gap-15 border-b border-line px-25 py-20">
          <div className="flex min-w-0 flex-col gap-5">
            <div className="flex items-center gap-10">
              <button
                onClick={onBack}
                aria-label="Back"
                className="inline-flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-pill text-ink transition-colors hover:bg-canvas"
              >
                <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2} />
              </button>
              <h1 className="font-display text-2xl text-ink leading-none">
                Notifications
              </h1>
            </div>
            <p className="pl-[42px] text-xs text-subtle">
              {notifications.length} updates
            </p>
          </div>
          <button className="mt-[4px] shrink-0 text-xs font-medium text-purple-700 hover:underline">
            Mark all as read
          </button>
        </div>

        <ul className="flex flex-col px-25">
          {notifications.map((n, i) => (
            <li
              key={n.id}
              className={`flex items-start gap-15 py-20 ${
                i !== notifications.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <Avatar name={n.avatarName} src={n.avatarSrc} tone={n.avatarTone} size="md" />
              <div className="flex flex-1 flex-col gap-[6px] min-w-0">
                <p className="text-sm leading-[1.4]">{n.body}</p>
                <span className="text-xs text-subtle">{n.time}</span>

                {n.variant === "invite" && (
                  <div className="mt-5 flex items-center gap-10">
                    <button className="rounded-pill border border-line bg-white px-15 py-[6px] text-xs font-medium text-ink hover:bg-canvas">
                      Deny
                    </button>
                    <button className="rounded-pill bg-purple-700 px-15 py-[6px] text-xs font-medium text-white hover:opacity-90">
                      Approve
                    </button>
                  </div>
                )}

                {n.variant === "file" && (
                  <button className="mt-5 inline-flex items-center gap-[6px] self-start rounded-pill border border-line bg-white px-10 py-[6px] text-xs text-ink hover:bg-canvas">
                    <Paperclip className="h-[12px] w-[12px]" strokeWidth={2} />
                    <span className="font-medium">{n.file.name}</span>
                    <span className="text-subtle">({n.file.size})</span>
                  </button>
                )}

                {n.variant === "comment" && (
                  <div className="mt-5 self-start rounded-md border border-line bg-canvas px-15 py-[8px] text-xs text-ink">
                    {n.comment}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
