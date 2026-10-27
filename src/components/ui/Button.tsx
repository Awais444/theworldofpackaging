import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "link";
export type ButtonSize = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 font-medium whitespace-nowrap transition-[background-color,color,border-color] duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-fg text-surface hover:bg-accent hover:text-ink",
  secondary: "border border-line-strong text-fg hover:border-fg hover:bg-fg hover:text-surface",
  link: "text-fg underline decoration-line-strong underline-offset-[6px] hover:decoration-fg",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], className);
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[var(--ease-press)] group-hover/btn:translate-x-1"
      aria-hidden="true"
    >
      <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", arrow = false, children, className, ...rest } = props;
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...linkRest } = rest as Omit<LinkButtonProps, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
