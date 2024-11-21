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

interface ButtonProps {
  content: string;
  href: string;
}
export const SecondaryButton = ({ content, href }: ButtonProps) => {
  return (
    <Link href={href} className="govuk-button govuk-button--secondary">
      {content}
    </Link>
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
