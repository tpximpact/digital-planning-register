// ============= New Button Components =============
import "./Button.scss";
import Link from "next/link";

// The types for the Button component are defined here
type ButtonElement = "button" | "link" | "span" | "div";
type ButtonVariant =
  | "primary"
  | "blue"
  | "default"
  | "secondary"
  | "warning"
  | "text-only";

type LinkHref =
  | string
  | {
      pathname: string;
      query?: Record<string, string>;
    };

interface ButtonProps {
  children: React.ReactNode;
  element?: ButtonElement;
  type?: "button" | "submit" | "reset";
  href?: LinkHref;
  className?: string;
  onClick?: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement | HTMLDivElement
  >;
  ariaLabel?: string;
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  element = "button",
  type = "button",
  href,
  className = "",
  onClick,
  ariaLabel,
  variant = "default",
}: ButtonProps) => {
  const getVariantClass = (variant: ButtonVariant) => {
    switch (variant) {
      case "primary":
        return "govuk-button--primary";
      case "secondary":
        return "govuk-button--secondary";
      case "warning":
        return "govuk-button--warning";
      case "blue":
        return "govuk-button--secondary blue-button";
      case "text-only":
        return "govuk-link";
      default:
        return "";
    }
  };

  // If it is text-only variant, we don't want to add the govuk-button class
  const baseClassName = `${
    variant === "text-only" ? "" : "govuk-button"
  } ${getVariantClass(variant)} ${className}`.trim();

  if (element === "link" && href) {
    return (
      <Link
        href={href}
        className={baseClassName}
        aria-label={ariaLabel}
        onClick={onClick}
        role={variant === "text-only" ? undefined : "button"}
        data-module={variant === "text-only" ? undefined : "govuk-button"}
      >
        {children}
      </Link>
    );
  }

  if (element === "span" || element === "div") {
    const Element = element;
    return (
      <Element
        className={baseClassName}
        onClick={onClick}
        aria-label={ariaLabel}
        role="button"
      >
        {children}
      </Element>
    );
  }

  if (element === "button") {
    return (
      <button
        type={type}
        className={baseClassName}
        onClick={onClick}
        aria-label={ariaLabel}
        data-module={variant === "text-only" ? undefined : "govuk-button"}
        data-prevent-double-click="true"
      >
        {children}
      </button>
    );
  }

  return null;
};
