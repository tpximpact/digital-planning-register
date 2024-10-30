"use client";
import "./Button.scss";
import { StartIcon } from "../../../../public/icons";

interface ButtonProps {
  content: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "start" | "default" | "link";
  ariaLabel?: string;
  onClick?: () => void;
}

export const Button = ({
  content,
  className,
  type = "button",
  ariaLabel,
  onClick,
  variant,
}: ButtonProps) => {
  return (
    <button
      type={type}
      data-module="govuk-button"
      className={
        variant === "link"
          ? "govuk-link button-link-change"
          : variant === "start"
            ? "govuk-button govuk-button--start"
            : className
      }
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
      {variant === "start" && (
        <span style={{ marginLeft: "10px", verticalAlign: "middle" }}>
          <StartIcon />
        </span>
      )}
    </button>
  );
};
