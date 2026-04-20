import { ArrowDown, ArrowUp, Paperclip } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { notifications } from "../../data/notifications";

export function NotificationPanel({
  onClose: _onClose,
  onSeeAll,
}: {
  onClose?: () => void;
  onSeeAll?: () => void;
}) {
  const preview = notifications.slice(0, 4);
  return (
    <div
      role="dialog"
      aria-label="Notifications"
      className="w-[420px] rounded-[20px] bg-white shadow-[0_24px_48px_-12px_rgba(16,24,40,0.18),0_4px_12px_rgba(16,24,40,0.06)] ring-1 ring-line"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-20 pt-20 pb-15">
        <h3 className="text-base font-semibold text-ink">Notifications</h3>
        <button className="text-xs font-semibold text-green-700 transition-colors hover:text-green-600">
          Mark all as read
        </button>
      </div>

      {/* List */}
      <ul className="flex flex-col px-20">
        {preview.map((n, i) => (
          <li
            key={n.id}
            className={`flex items-start gap-15 py-15 ${
              i !== preview.length - 1 ? "border-b border-line" : ""
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
                  <button className="rounded-pill bg-ink px-15 py-[6px] text-xs font-semibold text-white transition-colors hover:bg-black/85">
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

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-line px-20 py-15">
        <div className="flex items-center gap-[6px] text-xs text-subtle">
          <span>Use</span>
          <span className="inline-flex h-[20px] w-[20px] items-center justify-center rounded-sm border border-line bg-white text-ink">
            <ArrowUp className="h-[12px] w-[12px]" strokeWidth={2} />
          </span>
          <span className="inline-flex h-[20px] w-[20px] items-center justify-center rounded-sm border border-line bg-white text-ink">
            <ArrowDown className="h-[12px] w-[12px]" strokeWidth={2} />
          </span>
          <span>to navigate</span>
        </div>
        <button
          onClick={onSeeAll}
          className="rounded-pill border border-line bg-canvas px-15 py-[6px] text-xs font-medium text-ink hover:bg-line"
        >
          See All
        </button>
      </div>
    </div>
  );
}
