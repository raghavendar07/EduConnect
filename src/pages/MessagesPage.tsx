import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCheck,
  Image as ImageIcon,
  Paperclip,
  Search,
  Send,
  Smile,
} from "lucide-react";
import { Avatar } from "../components/ui/Avatar";
import { conversations, type Conversation, type Message } from "../data/messages";

export function MessagesPage({ onBack }: { onBack: () => void }) {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [local, setLocal] = useState<Record<string, Message[]>>({});

  const active = useMemo(
    () => conversations.find((c) => c.id === activeId)!,
    [activeId]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return conversations;
    const q = query.toLowerCase();
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q)
    );
  }, [query]);

  const combined = useMemo(
    () => [...active.messages, ...(local[active.id] ?? [])],
    [active, local]
  );

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const newMsg: Message = {
      id: `local-${Date.now()}`,
      fromMe: true,
      text,
      time: "Just now",
    };
    setLocal((prev) => ({
      ...prev,
      [active.id]: [...(prev[active.id] ?? []), newMsg],
    }));
    setDraft("");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-110px-30px)] w-full max-w-[1100px] flex-col">
      {/* Two-pane shell with 20px gap */}
      <div className="flex min-h-0 flex-1 gap-20">
        {/* Conversations list */}
        <aside className="flex w-[360px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-line bg-white">
          <div className="flex items-center gap-10 p-20">
            <button
              onClick={onBack}
              aria-label="Back"
              className="inline-flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-pill text-ink transition-colors hover:bg-canvas"
            >
              <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>
            <h2 className="truncate font-display text-xl text-ink">
              Messages
            </h2>
          </div>

          <div className="px-15 pb-15">
            <div className="flex h-[36px] items-center gap-10 rounded-pill border border-line bg-canvas px-15">
              <Search
                className="h-[14px] w-[14px] text-subtle"
                strokeWidth={1.8}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conversations"
                className="flex-1 bg-transparent text-xs text-ink placeholder:text-subtle focus:outline-none"
              />
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto p-10">
            {filtered.map((c) => (
              <ConversationRow
                key={c.id}
                conversation={c}
                active={c.id === activeId}
                onSelect={() => setActiveId(c.id)}
              />
            ))}
            {filtered.length === 0 && (
              <li className="p-20 text-center text-xs text-subtle">
                No conversations match "{query}".
              </li>
            )}
          </ul>
        </aside>

        {/* Active thread */}
        <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[20px] border border-line bg-white">
          <ThreadHeader conversation={active} />

          <div className="flex-1 overflow-y-auto bg-white px-25 py-20">
            <div className="flex flex-col gap-20">
              {combined.map((m, i) => {
                const prev = combined[i - 1];
                const showAvatar = !m.fromMe && (!prev || prev.fromMe);
                return (
                  <MessageBubble
                    key={m.id}
                    message={m}
                    author={active}
                    showAvatar={showAvatar}
                  />
                );
              })}
            </div>
          </div>

          <Composer value={draft} onChange={setDraft} onSend={send} />
        </section>
      </div>
    </div>
  );
}

/* ───────────── Conversation row ───────────── */

function ConversationRow({
  conversation,
  active,
  onSelect,
}: {
  conversation: Conversation;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        onClick={onSelect}
        className={`mb-5 flex w-full gap-15 rounded-md border p-15 text-left transition-colors ${
          active
            ? "border-line bg-canvas"
            : "border-transparent hover:bg-canvas/60"
        }`}
      >
        <Avatar
          name={conversation.name}
          src={conversation.avatar}
          tone={conversation.tone}
          size="md"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
          <div className="flex items-center justify-between gap-5">
            <p className="min-w-0 truncate text-sm font-semibold text-ink">
              {conversation.name}
            </p>
            <span className="shrink-0 text-[10px] font-medium text-subtle">
              {conversation.time} ago
            </span>
          </div>
          <div className="flex items-end justify-between gap-5">
            <p className="truncate text-xs text-muted leading-[1.4]">
              {conversation.preview}
            </p>
            <CheckCheck
              className={`h-[14px] w-[14px] shrink-0 ${
                conversation.unread ? "text-subtle/50" : "text-green-500"
              }`}
              strokeWidth={2}
            />
          </div>
        </div>
      </button>
    </li>
  );
}

/* ───────────── Thread header ───────────── */

function ThreadHeader({ conversation }: { conversation: Conversation }) {
  return (
    <div className="flex items-center justify-between gap-15 border-b border-line px-25 py-15">
      <div className="flex min-w-0 items-center gap-15">
        <Avatar
          name={conversation.name}
          src={conversation.avatar}
          tone={conversation.tone}
          size="md"
        />
        <div className="flex min-w-0 flex-col gap-[4px] leading-none">
          <p className="truncate text-base font-semibold text-ink">
            {conversation.name}
          </p>
          <span className="inline-flex items-center gap-5 text-xs font-medium text-subtle">
            <VerifiedBadge />
            {conversation.role}
          </span>
        </div>
      </div>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-pill bg-purple-700 text-white">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="h-[10px] w-[10px]"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

/* ───────────── Message bubble ───────────── */

function MessageBubble({
  message,
  author,
  showAvatar,
}: {
  message: Message;
  author: Conversation;
  showAvatar: boolean;
}) {
  const fromMe = message.fromMe;
  return (
    <div
      className={`flex items-end gap-10 ${
        fromMe ? "justify-end" : "justify-start"
      }`}
    >
      {!fromMe && (
        <div className="w-[32px] shrink-0">
          {showAvatar && (
            <Avatar
              name={author.name}
              src={author.avatar}
              tone={author.tone}
              size="sm"
            />
          )}
        </div>
      )}
      <div
        className={`flex max-w-[520px] flex-col gap-[6px] ${
          fromMe ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-[16px] bg-canvas px-15 py-[10px] text-sm leading-[1.5] text-ink ${
            fromMe ? "rounded-br-[4px]" : "rounded-bl-[4px]"
          }`}
        >
          {message.text}
        </div>
        <span className="inline-flex items-center gap-5 text-[10px] font-medium text-subtle">
          {message.time}
          {fromMe && (
            <CheckCheck
              className="h-[12px] w-[12px] text-green-500"
              strokeWidth={2}
            />
          )}
        </span>
      </div>
    </div>
  );
}

/* ───────────── Composer ───────────── */

function Composer({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="border-t border-line px-15 py-15">
      <div className="flex items-center gap-10 rounded-pill border border-line bg-canvas px-15 py-[6px]">
        <button
          aria-label="Attach file"
          className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-pill text-subtle transition-colors hover:bg-white hover:text-ink"
        >
          <Paperclip className="h-[16px] w-[16px]" strokeWidth={1.8} />
        </button>
        <button
          aria-label="Attach image"
          className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-pill text-subtle transition-colors hover:bg-white hover:text-ink"
        >
          <ImageIcon className="h-[16px] w-[16px]" strokeWidth={1.8} />
        </button>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Message..."
          className="flex-1 bg-transparent py-[6px] text-sm text-ink placeholder:text-subtle focus:outline-none"
        />
        <button
          aria-label="Emoji"
          className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-pill text-subtle transition-colors hover:bg-white hover:text-ink"
        >
          <Smile className="h-[16px] w-[16px]" strokeWidth={1.8} />
        </button>
        <button
          aria-label="Send"
          onClick={onSend}
          disabled={!value.trim()}
          className="inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-pill bg-purple-700 text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Send className="h-[16px] w-[16px]" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
