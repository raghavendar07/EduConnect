import { Plus } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { SessionCard, Session } from "./SessionCard";
import { Icon } from "../ui/Icon";
import { useRef } from "react";

export function SessionCarousel({ sessions }: { sessions: Session[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col gap-15">
      <SectionHeader
        title="Upcoming Session"
        action={
          <div className="flex items-center gap-20">
            <button className="inline-flex items-center gap-5 text-sm font-medium text-green-500 transition-colors hover:text-green-600">
              <Plus className="h-4 w-4" strokeWidth={2.2} />
              Create Session
            </button>
            <div className="flex items-center gap-10">
              <IconBtn onClick={() => scroll(-1)} label="Previous session">
                <Icon name="caretLeft" size={16} />
              </IconBtn>
              <IconBtn onClick={() => scroll(1)} label="Next session">
                <Icon name="caretRight" size={16} />
              </IconBtn>
            </div>
          </div>
        }
      />
      <div
        ref={trackRef}
        className="flex gap-20 overflow-x-auto scroll-smooth pb-5 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sessions.map((s, i) => (
          <SessionCard key={i} session={s} />
        ))}
      </div>
    </section>
  );
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-pill border border-line-soft bg-surface text-ink transition-colors hover:bg-canvas"
    >
      {children}
    </button>
  );
}
