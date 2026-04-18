import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const chipClass =
  "inline-flex h-[26px] items-center justify-center rounded-pill border border-[#e1e5ef] bg-[#f6f6f6] px-15 text-xs font-medium text-[#6a707d] whitespace-nowrap shrink-0";

export function SkillsOverflow({ skills }: { skills: string[] }) {
  const measureRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipWrapRef = useRef<HTMLDivElement>(null);
  const [fitCount, setFitCount] = useState(skills.length);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const recompute = useCallback(() => {
    const measureEl = measureRef.current;
    const containerEl = containerRef.current;
    if (!measureEl || !containerEl) return;

    const chips = Array.from(
      measureEl.querySelectorAll<HTMLElement>("[data-chip]")
    );
    const overflow = measureEl.querySelector<HTMLElement>("[data-overflow]");
    if (chips.length === 0) return;

    const available = containerEl.clientWidth;
    const gap = 10;
    const overflowWidth = overflow ? overflow.offsetWidth : 44;

    // Try to fit all without the overflow chip first
    const allWidth = chips.reduce(
      (sum, c, i) => sum + c.offsetWidth + (i > 0 ? gap : 0),
      0
    );
    if (allWidth <= available) {
      setFitCount(skills.length);
      return;
    }

    // Otherwise, fit as many as possible and reserve space for overflow chip
    let used = 0;
    let count = 0;
    for (let i = 0; i < chips.length; i++) {
      const chipW = chips[i].offsetWidth;
      const addend = chipW + (count > 0 ? gap : 0);
      const withOverflow = used + addend + gap + overflowWidth;
      if (withOverflow <= available) {
        used += addend;
        count++;
      } else {
        break;
      }
    }
    setFitCount(count);
  }, [skills.length]);

  useLayoutEffect(() => {
    recompute();
  }, [recompute, skills]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => recompute());
    ro.observe(el);
    return () => ro.disconnect();
  }, [recompute]);

  // Close tooltip on outside click / Escape
  useEffect(() => {
    if (!tooltipOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!tooltipWrapRef.current?.contains(e.target as Node)) {
        setTooltipOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTooltipOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [tooltipOpen]);

  const visible = skills.slice(0, fitCount);
  const hidden = skills.slice(fitCount);
  const hasOverflow = hidden.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Invisible measurement row — absolutely positioned, not in flow */}
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 flex gap-10 overflow-hidden"
      >
        {skills.map((s, i) => (
          <span key={i} data-chip className={chipClass}>
            {s}
          </span>
        ))}
        <span data-overflow className={chipClass}>
          +{skills.length}
        </span>
      </div>

      {/* Visible row */}
      <div className="flex flex-nowrap items-center gap-10">
        {visible.map((s) => (
          <span key={s} className={chipClass}>
            {s}
          </span>
        ))}
        {hasOverflow && (
          <div ref={tooltipWrapRef} className="relative">
            <button
              type="button"
              aria-label={`${hidden.length} more skills`}
              aria-expanded={tooltipOpen}
              onClick={() => setTooltipOpen((v) => !v)}
              className={`${chipClass} cursor-pointer transition-colors hover:bg-line`}
            >
              +{hidden.length}
            </button>
            {tooltipOpen && (
              <div
                role="tooltip"
                className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[180px] animate-[fadeIn_120ms_ease-out] rounded-md border border-line bg-white p-15 shadow-[0_12px_32px_-8px_rgba(16,24,40,0.16),0_2px_8px_rgba(16,24,40,0.06)]"
              >
                <p className="mb-10 text-[10px] font-semibold uppercase tracking-eyebrow text-subtle">
                  More skills
                </p>
                <div className="flex flex-wrap gap-5">
                  {hidden.map((s) => (
                    <span key={s} className={chipClass}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
