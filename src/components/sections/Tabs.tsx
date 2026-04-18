import { useState } from "react";
import { cn } from "../../lib/cn";

export function Tabs({
  tabs,
  defaultValue,
  onChange,
}: {
  tabs: string[];
  defaultValue?: string;
  onChange?: (tab: string) => void;
}) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]);

  return (
    <div className="flex items-center gap-15">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => {
              setActive(tab);
              onChange?.(tab);
            }}
            className={cn(
              "rounded-pill border px-20 py-10 text-sm font-medium transition-colors",
              isActive
                ? "border-ink bg-ink text-surface"
                : "border-line bg-surface text-ink hover:border-ink/30"
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
