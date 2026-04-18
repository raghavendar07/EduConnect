import { ReactNode } from "react";

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="font-display text-2xl font-medium text-ink">{title}</h2>
      {action}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-eyebrow text-subtle">
      {children}
    </p>
  );
}
