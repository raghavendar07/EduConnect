import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCheck,
  Download,
  FileText,
  Image as ImageIcon,
  MoreHorizontal,
  MoreVertical,
  Paperclip,
  Search,
  Send,
  Smile,
} from "lucide-react";
import { Avatar } from "../components/ui/Avatar";
import { conversations, type Conversation, type Message } from "../data/messages";

type Version = "v1" | "v2";

export function MessagesPage({ onBack }: { onBack: () => void }) {
  const [version, setVersion] = useState<Version>("v1");
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
    <div className="mx-auto flex h-[calc(100vh-var(--nav-h,110px)-30px)] w-full max-w-[1100px] flex-col gap-15">
      <VersionSwitcher version={version} onChange={setVersion} />

      {version === "v1" ? (
        <V1Layout
          conversations={filtered}
          active={active}
          activeId={activeId}
          setActiveId={setActiveId}
          query={query}
          setQuery={setQuery}
          combined={combined}
          draft={draft}
          setDraft={setDraft}
          send={send}
          onBack={onBack}
        />
      ) : (
        <V2Layout
          conversations={filtered}
          active={active}
          activeId={activeId}
          setActiveId={setActiveId}
          query={query}
          setQuery={setQuery}
          combined={combined}
          draft={draft}
          setDraft={setDraft}
          send={send}
          onBack={onBack}
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
  version: Version;
  onChange: (v: Version) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-15 rounded-pill border border-line bg-white px-15 py-[6px]">
      <div
        role="tablist"
        aria-label="Messages layout"
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
                active ? "bg-white text-ink shadow-soft" : "text-subtle hover:text-ink"
              }`}
            >
              {v}
            </button>
          );
        })}
      </div>
      <span className="hidden text-[11px] font-medium text-subtle md:inline">
        {version === "v1" ? "Classic inbox" : "Rich chat"}
      </span>
    </div>
  );
}

type ShellProps = {
  conversations: Conversation[];
  active: Conversation;
  activeId: string;
  setActiveId: (id: string) => void;
  query: string;
  setQuery: (q: string) => void;
  combined: Message[];
  draft: string;
  setDraft: (d: string) => void;
  send: () => void;
  onBack: () => void;
};

/* ════════════════════════════════════════════════════════════════════
   V1 — classic inbox
   ════════════════════════════════════════════════════════════════════ */

function V1Layout({
  conversations: list,
  active,
  activeId,
  setActiveId,
  query,
  setQuery,
  combined,
  draft,
  setDraft,
  send,
  onBack,
}: ShellProps) {
  return (
    <div className="flex min-h-0 flex-1 gap-20">
      <aside className="flex w-[360px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-line bg-white">
        <div className="flex items-center gap-10 p-20">
          <button
            onClick={onBack}
            aria-label="Back"
            className="inline-flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-pill text-ink transition-colors hover:bg-canvas"
          >
            <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
          <h2 className="truncate font-display text-xl text-ink">Messages</h2>
        </div>

        <div className="px-15 pb-15">
          <div className="flex h-[36px] items-center gap-10 rounded-pill border border-line bg-canvas px-15">
            <Search className="h-[14px] w-[14px] text-subtle" strokeWidth={1.8} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conversations"
              className="flex-1 bg-transparent text-xs text-ink placeholder:text-subtle focus:outline-none"
            />
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto p-10">
          {list.map((c) => (
            <V1ConversationRow
              key={c.id}
              conversation={c}
              active={c.id === activeId}
              onSelect={() => setActiveId(c.id)}
            />
          ))}
          {list.length === 0 && (
            <li className="p-20 text-center text-xs text-subtle">
              No conversations match "{query}".
            </li>
          )}
        </ul>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[20px] border border-line bg-white">
        <V1ThreadHeader conversation={active} />

        <div className="flex-1 overflow-y-auto bg-white px-25 py-20">
          <div className="flex flex-col gap-20">
            {combined.map((m, i) => {
              const prev = combined[i - 1];
              const showAvatar = !m.fromMe && (!prev || prev.fromMe);
              return (
                <V1MessageBubble
                  key={m.id}
                  message={m}
                  author={active}
                  showAvatar={showAvatar}
                />
              );
            })}
          </div>
        </div>

        <V1Composer value={draft} onChange={setDraft} onSend={send} />
      </section>
    </div>
  );
}

function V1ConversationRow({
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
          active ? "border-line bg-canvas" : "border-transparent hover:bg-canvas/60"
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

function V1ThreadHeader({ conversation }: { conversation: Conversation }) {
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
            {conversation.role}
          </span>
        </div>
      </div>
    </div>
  );
}

function V1MessageBubble({
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
      className={`flex items-end gap-10 ${fromMe ? "justify-end" : "justify-start"}`}
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
            <CheckCheck className="h-[12px] w-[12px] text-green-500" strokeWidth={2} />
          )}
        </span>
      </div>
    </div>
  );
}

function V1Composer({
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

/* ════════════════════════════════════════════════════════════════════
   V2 — rich chat
   ════════════════════════════════════════════════════════════════════ */

function handle(name: string): string {
  const first = name
    .replace(/^Dr\.\s+|^Principal\s+/, "")
    .split(" ")
    .map((w) => w.toLowerCase())
    .join(".")
    .replace(/[^a-z0-9.]/g, "");
  return "@" + first;
}

function V2Layout({
  conversations: list,
  active,
  activeId,
  setActiveId,
  query,
  setQuery,
  combined,
  draft,
  setDraft,
  send,
  onBack,
}: ShellProps) {
  // Show the 5 most recent conversations as "Active".
  const activeUsers = conversations.slice(0, 5);

  return (
    <div className="flex min-h-0 flex-1 gap-20">
      {/* Left panel */}
      <aside className="flex w-[360px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-line bg-white">
        {/* Back + search */}
        <div className="flex flex-col gap-15 p-20 pb-15">
          <button
            onClick={onBack}
            aria-label="Back"
            className="inline-flex w-fit items-center gap-[6px] text-sm font-semibold text-ink transition-colors hover:text-subtle"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex h-[40px] items-center gap-10 rounded-md border border-line bg-white px-15">
            <Search className="h-[16px] w-[16px] text-subtle" strokeWidth={1.8} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-sm text-ink placeholder:text-subtle focus:outline-none"
            />
          </div>
        </div>

        {/* Active row */}
        <div className="flex flex-col gap-10 px-20 pb-15">
          <h3 className="font-display text-2xl text-ink leading-none">
            Active
          </h3>
          <div className="flex items-center gap-[10px]">
            {activeUsers.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setActiveId(u.id)}
                className="shrink-0 rounded-pill"
                aria-label={`Active: ${u.name}`}
              >
                <span className="relative inline-block h-[40px] w-[40px]">
                  <Avatar name={u.name} src={u.avatar} tone={u.tone} size="md" />
                  <span className="absolute bottom-0 right-0 h-[10px] w-[10px] rounded-pill bg-green-500 ring-2 ring-white" />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-line" />

        {/* Messages list header */}
        <div className="flex items-center justify-between px-20 pt-15 pb-10">
          <h3 className="font-display text-2xl text-ink leading-none">
            Messages
          </h3>
        </div>

        {/* Conversations */}
        <ul className="flex-1 overflow-y-auto px-10 pb-10">
          {list.map((c) => (
            <V2ConversationRow
              key={c.id}
              conversation={c}
              active={c.id === activeId}
              onSelect={() => setActiveId(c.id)}
            />
          ))}
          {list.length === 0 && (
            <li className="p-20 text-center text-xs text-subtle">
              No conversations match "{query}".
            </li>
          )}
        </ul>
      </aside>

      {/* Right panel */}
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[20px] border border-line bg-white">
        <V2ThreadHeader conversation={active} />

        <div className="flex-1 overflow-y-auto bg-white px-25 py-20">
          <V2Timeline messages={combined} author={active} />
        </div>

        <V2Composer value={draft} onChange={setDraft} onSend={send} />
      </section>
    </div>
  );
}

function V2ConversationRow({
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
        className={`mb-[4px] flex w-full gap-15 rounded-md p-15 text-left transition-colors ${
          active ? "bg-canvas" : "hover:bg-canvas/60"
        }`}
      >
        <Avatar
          name={conversation.name}
          src={conversation.avatar}
          tone={conversation.tone}
          size="md"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
          <div className="flex items-start justify-between gap-5">
            <div className="flex min-w-0 flex-col gap-[2px] leading-none">
              <p className="truncate text-sm font-semibold text-ink">
                {conversation.name}
              </p>
              <span className="truncate text-xs font-medium text-subtle">
                {handle(conversation.name)}
              </span>
            </div>
            <span className="shrink-0 text-[11px] font-medium text-subtle">
              {conversation.time} ago
            </span>
          </div>
          <p className="line-clamp-1 text-xs text-muted leading-[1.4]">
            {conversation.preview}
          </p>
        </div>
      </button>
    </li>
  );
}

function V2ThreadHeader({ conversation }: { conversation: Conversation }) {
  return (
    <div className="flex items-center justify-between gap-15 border-b border-line px-25 py-15">
      <div className="flex min-w-0 items-center gap-15">
        <span className="relative inline-block h-[40px] w-[40px] shrink-0">
          <Avatar
            name={conversation.name}
            src={conversation.avatar}
            tone={conversation.tone}
            size="md"
          />
          {conversation.online && (
            <span className="absolute bottom-0 right-0 h-[10px] w-[10px] rounded-pill bg-green-500 ring-2 ring-white" />
          )}
        </span>
        <div className="flex min-w-0 flex-col gap-[4px] leading-none">
          <p className="truncate text-base font-semibold text-ink">
            {conversation.name}
          </p>
          <span className="truncate text-xs font-medium text-subtle">
            {handle(conversation.name)}
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-label="More options"
        className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-md text-muted transition-colors hover:bg-canvas hover:text-ink"
      >
        <MoreVertical className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </button>
    </div>
  );
}

function V2Timeline({
  messages,
  author,
}: {
  messages: Message[];
  author: Conversation;
}) {
  // Split into "earlier" vs "today" for the divider — use the last few as "today".
  const splitIdx = Math.max(0, messages.length - 2);
  const earlier = messages.slice(0, splitIdx);
  const today = messages.slice(splitIdx);

  return (
    <div className="flex flex-col gap-20">
      {earlier.map((m, i) => (
        <V2Message
          key={m.id}
          message={m}
          author={author}
          // Attach a mock PDF to the second message from Priya (first non-self message after a greeting)
          attachment={
            author.id === "priya" && !m.fromMe && i === 0
              ? { name: "Tech requirements.pdf", size: "1.2 MB" }
              : undefined
          }
        />
      ))}

      {earlier.length > 0 && today.length > 0 && <TodayDivider />}

      {today.map((m, i) => (
        <V2Message
          key={m.id}
          message={m}
          author={author}
          // Reactions on the last user-sent message
          reactions={
            m.fromMe && i === today.length - 1 ? ["❤️", "👍"] : undefined
          }
        />
      ))}

      {/* Typing indicator */}
      {!messages[messages.length - 1]?.fromMe ? null : (
        <TypingRow author={author} />
      )}
    </div>
  );
}

function V2Message({
  message,
  author,
  attachment,
  reactions,
}: {
  message: Message;
  author: Conversation;
  attachment?: { name: string; size: string };
  reactions?: string[];
}) {
  const fromMe = message.fromMe;

  return (
    <div
      className={`flex items-start gap-10 ${fromMe ? "justify-end" : "justify-start"}`}
    >
      {!fromMe && (
        <Avatar
          name={author.name}
          src={author.avatar}
          tone={author.tone}
          size="sm"
        />
      )}

      <div
        className={`flex max-w-[540px] flex-col gap-[6px] ${
          fromMe ? "items-end" : "items-start"
        }`}
      >
        <div className="flex items-baseline gap-[8px]">
          <span
            className={`text-sm font-semibold ${
              fromMe ? "text-green-700" : "text-ink"
            }`}
          >
            {fromMe ? "You" : author.name}
          </span>
          <span
            className={`text-[11px] font-medium ${
              fromMe ? "text-green-700/70" : "text-subtle"
            }`}
          >
            {message.time}
          </span>
        </div>

        {/* Bubble */}
        <div
          className={`rounded-[12px] px-15 py-[10px] text-sm leading-[1.5] ${
            fromMe
              ? "bg-green-700 text-white rounded-tr-[4px]"
              : "bg-canvas text-ink rounded-tl-[4px]"
          }`}
        >
          {message.text}
        </div>

        {/* Attachment card */}
        {attachment && (
          <button
            type="button"
            className="flex w-[320px] items-center gap-10 rounded-[12px] border border-line bg-white p-[10px] text-left transition-colors hover:bg-canvas"
          >
            <span className="inline-flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-md border border-line bg-canvas text-ink">
              <FileText className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-[2px] leading-none">
              <p className="truncate text-sm font-semibold text-ink">
                {attachment.name}
              </p>
              <p className="text-xs font-medium text-subtle">{attachment.size}</p>
            </div>
            <span className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-pill text-subtle transition-colors hover:bg-canvas hover:text-ink">
              <Download className="h-[16px] w-[16px]" strokeWidth={1.8} />
            </span>
          </button>
        )}

        {/* Reactions */}
        {reactions && reactions.length > 0 && (
          <div className="flex items-center gap-5">
            {reactions.map((r) => (
              <span
                key={r}
                className="inline-flex h-[22px] items-center rounded-pill border border-line bg-white px-[8px] text-xs"
              >
                {r}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TodayDivider() {
  return (
    <div className="flex items-center gap-10">
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs font-medium text-subtle">Today</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

function TypingRow({ author }: { author: Conversation }) {
  return (
    <div className="flex items-start gap-10">
      <Avatar name={author.name} src={author.avatar} tone={author.tone} size="sm" />
      <div className="flex flex-col gap-[6px]">
        <span className="text-sm font-semibold text-ink">{author.name}</span>
        <div className="inline-flex items-center gap-[4px] rounded-[12px] rounded-tl-[4px] border border-line bg-canvas px-[12px] py-[10px]">
          <span className="h-[6px] w-[6px] rounded-pill bg-subtle/60 animate-pulse" />
          <span
            className="h-[6px] w-[6px] rounded-pill bg-subtle/60 animate-pulse"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-[6px] w-[6px] rounded-pill bg-subtle/60 animate-pulse"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}

function V2Composer({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="border-t border-line px-25 py-20">
      <div className="flex flex-col gap-[8px] rounded-[12px] border border-line bg-white px-15 py-[12px] focus-within:border-green-500">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Send a message"
          className="w-full bg-transparent text-sm text-ink placeholder:text-subtle focus:outline-none"
        />
        <div className="flex items-center justify-end gap-[6px]">
          <button
            type="button"
            aria-label="Emoji"
            className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-pill text-subtle transition-colors hover:bg-canvas hover:text-ink"
          >
            <Smile className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            aria-label="More"
            className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-pill text-subtle transition-colors hover:bg-canvas hover:text-ink"
          >
            <MoreHorizontal className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={onSend}
            disabled={!value.trim()}
            className="inline-flex h-[36px] items-center gap-[6px] rounded-md bg-green-500 px-15 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
