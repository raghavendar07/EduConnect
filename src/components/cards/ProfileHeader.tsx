import { PenSquare } from "lucide-react";
import { Button } from "../ui/Button";

export function ProfileHeader({
  date,
  name,
  meta,
}: {
  date: { day: string; full: string };
  name: string;
  meta: { count: string; message: string };
}) {
  return (
    <section className="flex items-center gap-20 rounded-md border border-sand-200/80 bg-sand-100 p-20 shadow-card">
      <div className="flex flex-1 flex-col gap-20 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
          <span>{date.day}, </span>
          <span className="text-ink">{date.full}</span>
        </p>
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-[40px] leading-[1.1] text-ink">
            Your day at a glance, {name}
          </h1>
          <p className="text-base text-muted leading-[1.5]">
            <span className="font-medium text-ink">{meta.count}</span>{" "}
            {meta.message}
          </p>
        </div>
      </div>
      <Button variant="primary" size="md" leftIcon={<PenSquare className="h-4 w-4" />}>
        Post Update
      </Button>
    </section>
  );
}
