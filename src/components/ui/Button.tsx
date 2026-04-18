import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-5 font-medium rounded-pill transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-black/80 active:bg-black focus-visible:ring-ink/30",
  secondary:
    "bg-green-500 text-white hover:bg-green-600 active:bg-green-700",
  ghost: "text-ink hover:bg-line",
  outline:
    "border border-line-soft bg-surface text-ink hover:bg-canvas",
};

const sizes: Record<Size, string> = {
  sm: "h-[32px] px-15 text-xs",
  md: "h-[40px] px-20 text-sm",
  lg: "h-[48px] px-25 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

export function IconButton({
  className,
  children,
  tone = "default",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "default" | "green" | "purple" | "dark";
}) {
  const tones = {
    default:
      "bg-surface border border-line-soft text-ink hover:bg-canvas",
    green: "bg-green-500 text-white hover:bg-green-600",
    purple: "bg-purple-700 text-white hover:bg-purple-700/90",
    dark: "bg-ink text-white hover:bg-black/80",
  } as const;
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center h-[30px] w-[30px] rounded-pill transition-colors",
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
