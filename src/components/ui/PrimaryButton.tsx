import { NavLink } from "react-router-dom";
import { invariant } from "@/lib/assert";

const baseClasses =
  "inline-flex items-center justify-center rounded-md bg-electric text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]";

const sizeClasses = {
  default: "px-6 py-3",
  compact: "px-4 py-2 font-medium",
  compactSm: "px-3 py-2 font-medium",
} as const;

interface PrimaryButtonBaseProps {
  children: React.ReactNode;
  size?: keyof typeof sizeClasses;
  className?: string;
}

interface PrimaryButtonLinkProps extends PrimaryButtonBaseProps {
  to: string;
  href?: never;
}

interface PrimaryButtonAnchorProps extends PrimaryButtonBaseProps {
  href: string;
  to?: never;
}

type PrimaryButtonProps = PrimaryButtonLinkProps | PrimaryButtonAnchorProps;

export function PrimaryButton({ children, size = "default", className = "", ...props }: PrimaryButtonProps) {
  const hasTo = "to" in props && Boolean(props.to);
  const hasHref = "href" in props && Boolean(props.href);
  invariant(hasTo !== hasHref, "PrimaryButton requires exactly one of `to` or `href`");

  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`.trim();

  if (hasTo) {
    const { to } = props as PrimaryButtonLinkProps;
    return (
      <NavLink to={to} className={classes}>
        {children}
      </NavLink>
    );
  }

  const { href } = props as PrimaryButtonAnchorProps;
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
