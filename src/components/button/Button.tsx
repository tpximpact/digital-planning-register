// ============= New Button Components =============
import "./Button.scss";
import Link from "next/link";

// The types for the Button component are defined here
type ButtonElement = "button" | "link" | "span" | "div";
type ButtonVariant =
  | "primary"
  | "blue"
  | "default"
  | "start"
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
      case "start":
        return "govuk-button--start";
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

  // If it is a start button, we want to add the start icon svg
  const startIcon =
    variant === "start" ? (
      <svg
        className="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
      </svg>
    ) : null;

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
        {startIcon}
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
        {startIcon}
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
        {startIcon}
      </button>
    );
  }

  return null;
};

export const ButtonEmailSignUp = ({ href }: { href: string }) => (
  <Button
    element="link"
    href={href}
    variant="secondary"
    className="blue-button email-signup-button"
    ariaLabel="Sign up for email alerts"
  >
    <svg
      className="button-icon"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="18"
      width="18"
      viewBox="0 0 459.334 459.334"
      style={{ marginRight: "8px", verticalAlign: "middle" }}
    >
      <path
        fill="currentColor"
        d="M177.216 404.514c-.001.12-.009.239-.009.359
            0 30.078 24.383 54.461 54.461 54.461s54.461-24.383
            54.461-54.461c0-.12-.008-.239-.009-.359H175.216zM403.549
            336.438l-49.015-72.002v-89.83c0-60.581-43.144-111.079-100.381
            -122.459V24.485C254.152 10.963 243.19 0 229.667 0s-24.485
            10.963-24.485 24.485v27.663c-57.237 11.381-100.381
            61.879-100.381 122.459v89.83l-49.015 72.002a24.76
            24.76 0 0 0 20.468 38.693H383.08a24.761 24.761
            0 0 0 20.469-38.694z"
      />
    </svg>
    Sign up for email alerts
  </Button>
);
