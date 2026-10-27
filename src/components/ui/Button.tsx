import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "accent" | "white" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-50";

// Text button with an underline that grows on hover.
const ghost =
  "rounded-md text-blue-600 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue",
  secondary: "border border-blue-600 bg-white text-blue-600 hover:-translate-y-0.5 hover:bg-blue-50",
  accent: "bg-orange-500 text-ink-900 hover:-translate-y-0.5 hover:bg-orange-600",
  white: "bg-white text-blue-600 hover:-translate-y-0.5 hover:bg-blue-50",
  ghost,
  link: ghost,
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  const textOnly = variant === "ghost" || variant === "link";
  return cn(base, variants[variant], !textOnly && sizes[size], className);
}

function Arrow() {
  return <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1" />;
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow that slides 4px on hover. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

/** Pill button (CLAUDE.md §4.4). Renders a Next link when given `href`. */
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
