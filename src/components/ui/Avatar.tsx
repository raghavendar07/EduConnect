import { useState } from "react";
import { cn } from "../../lib/cn";

type Size = "xs" | "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  xs: "h-[24px] w-[24px] text-[10px]",
  sm: "h-[32px] w-[32px] text-xs",
  md: "h-[40px] w-[40px] text-sm",
  lg: "h-[48px] w-[48px] text-base",
};

export function Avatar({
  name,
  src,
  size = "md",
  tone = "green",
  ring = false,
}: {
  name: string;
  src?: string;
  size?: Size;
  tone?: "green" | "purple" | "sand";
  ring?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const toneClass =
    tone === "purple"
      ? "bg-purple-700 text-white"
      : tone === "sand"
      ? "bg-sand-200 text-ink"
      : "bg-green-500 text-white";

  const showImage = src && !failed;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-pill font-medium shrink-0 overflow-hidden",
        sizes[size],
        ring && "ring-2 ring-white",
        toneClass
      )}
      aria-label={name}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

export function AvatarStack({
  people,
  size = "sm",
  max = 4,
}: {
  people: Array<{ name: string; src?: string; tone?: "green" | "purple" | "sand" }>;
  size?: Size;
  max?: number;
}) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  const stackSize: Record<Size, string> = {
    xs: "h-[24px] w-[24px] text-[10px]",
    sm: "h-[32px] w-[32px] text-xs",
    md: "h-[40px] w-[40px] text-sm",
    lg: "h-[48px] w-[48px] text-base",
  };
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((p, i) => (
        <Avatar key={i} name={p.name} src={p.src} size={size} tone={p.tone} ring />
      ))}
      {extra > 0 && (
        <div
          className={cn(
            "rounded-pill ring-2 ring-white bg-ink text-white font-medium inline-flex items-center justify-center",
            stackSize[size]
          )}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
