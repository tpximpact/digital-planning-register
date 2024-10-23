"use client";
import "./Button.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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
}

export const Button = ({
  content,
  icon,
  className,
  type = "button",
  iconClass,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`govuk-button ${className}`}
      data-module="govuk-button"
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
