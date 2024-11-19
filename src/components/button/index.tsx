"use client";
import "./Button.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

/** TODO need a version of this that works in non-js world */
export const BackLink = ({ link }: { link?: string }) => {
  const router = useRouter();
  const [isJsEnabled, setIsJsEnabled] = useState(false);

  useEffect(() => {
    document.documentElement.className = "js-enabled";
    setIsJsEnabled(true);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!link) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <>
      {isJsEnabled && (
        <Link
          href={link || "#"}
          onClick={handleClick}
          className="govuk-back-link back-button"
        >
          Back
        </Link>
      )}
    </>
  );
};

export const BackButton = ({ href }: { href: string }) => {
  return (
    <Link href={href} className="govuk-back-link back-button">
      Back
    </Link>
  );
};

export const StartButton = ({}) => {
  return (
    <button
      type="submit"
      className="govuk-button govuk-button--start"
      data-module="govuk-button"
    >
      Start now
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
    </button>
  );
};

export const ButtonLink = ({
  ariaLabel,
  onClick,
}: {
  ariaLabel: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="govuk-link button-link-change"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      Change
    </button>
  );
};

interface ButtonProps {
  iconClass?: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const Button = ({
  content,
  icon,
  className,
  type = "button",
  iconClass,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`govuk-button${className ? ` ${className}` : ""}`}
      data-module="govuk-button"
      onClick={onClick}
    >
      {content}
      {icon && (
        <span
          style={{ marginLeft: "10px", verticalAlign: "middle" }}
          className={`${iconClass}`}
        >
          {icon}
        </span>
      )}
    </button>
  );
};

export const LinkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      href={href}
      role="button"
      className="dpr-button dpr-button--secondary-blue"
      data-module="govuk-button"
    >
      {text}
    </Link>
  );
};

export const ButtonEmailSignUp = ({ href }: { href: string }) => (
  <Link
    href={href}
    role="button"
    className="govuk-button govuk-button--secondary blue-button email-signup-button"
    data-module="govuk-button"
  >
    <svg
      className="button-icon"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="18"
      width="18"
      viewBox="0 0 459.334 459.334"
    >
      <path
        fill="currentColor"
        d="M177.216 404.514c-.001.12-.009.239-.009.359 0 30.078 24.383 54.461 54.461 54.461s54.461-24.383 54.461-54.461c0-.12-.008-.239-.009-.359H175.216zM403.549 336.438l-49.015-72.002v-89.83c0-60.581-43.144-111.079-100.381-122.459V24.485C254.152 10.963 243.19 0 229.667 0s-24.485 10.963-24.485 24.485v27.663c-57.237 11.381-100.381 61.879-100.381 122.459v89.83l-49.015 72.002a24.76 24.76 0 0 0 20.468 38.693H383.08a24.761 24.761 0 0 0 20.469-38.694z"
      ></path>
    </svg>
    Sign up for email alerts
  </Link>
);
