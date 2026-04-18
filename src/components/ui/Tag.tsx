import { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Tone = "green" | "purple" | "sand" | "neutral";
type Size = "sm" | "md";

const tones: Record<Tone, string> = {
  green: "bg-green-200 text-green-600 border-transparent",
  purple: "bg-purple-100 text-purple-700 border-transparent",
  sand: "bg-sand-300 text-ink border-transparent",
  neutral: "bg-[#f6f6f6] text-[#6a707d] border-[#e1e5ef]",
};

const sizes: Record<Size, string> = {
  sm: "px-10 py-[4px]",
  md: "px-15 py-10",
};

export function Tag({
  tone = "neutral",
  size = "sm",
  children,
  className,
}: {
  tone?: Tone;
  size?: Size;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border text-xs font-medium leading-none",
        tones[tone],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({
  tone = "green",
  label = "Online",
}: {
  tone?: "green" | "purple";
  label?: string;
}) {
  const color = tone === "green" ? "text-green-500" : "text-purple-700";
  const bg = tone === "green" ? "bg-green-500" : "bg-purple-700";
  const halo = tone === "green" ? "bg-green-500/20" : "bg-purple-700/20";
  return (
    <span className={cn("inline-flex items-center gap-5 text-xs font-medium tracking-[0.24px]", color)}>
      <span className="relative inline-flex h-[10px] w-[10px] items-center justify-center">
        <span className={cn("absolute inset-0 rounded-pill", halo)} />
        <span className={cn("h-[4px] w-[4px] rounded-pill", bg)} />
      </span>
      {label}
    </span>
  );
}
