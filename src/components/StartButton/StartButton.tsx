import { Button } from "../button";

interface StartButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  ariaLabel?: string;
}
export const StartButton = ({
  type = "submit",
  className = "",
  ariaLabel,
}: StartButtonProps) => (
  <Button
    element="button"
    type={type}
    className={`govuk-button--start ${className}`}
    ariaLabel={ariaLabel}
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
  </Button>
);
