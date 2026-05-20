import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";

interface SharedProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

interface LinkButtonProps extends SharedProps {
  href: string;
  target?: string;
  rel?: string;
}

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
    target?: never;
    rel?: never;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-bg hover:bg-accent-hover",
  secondary: "bg-text text-bg hover:bg-muted",
  outline: "border border-border bg-bg-alt text-text hover:border-accent hover:text-accent"
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide shadow-sm transition-transform hover:-translate-x-0.5";

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const className = cn(baseStyles, variants[variant], props.className);

  if ("href" in props && typeof props.href === "string") {
    const { children, href, rel, target } = props;

    return (
      <Link className={className} href={href} rel={rel} target={target}>
        {children}
      </Link>
    );
  }

  const { children, className: _className, variant: _variant, ...buttonProps } = props;

  return (
    <button className={className} type={buttonProps.type ?? "button"} {...buttonProps}>
      {children}
    </button>
  );
}
