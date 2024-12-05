import { Button } from "../button";
import "./TextButton.scss";

type TextButtonElement = "button" | "link";
type TextButtonVariant = "default" | "plain";

interface TextButtonProps {
  children: React.ReactNode;
  element?: TextButtonElement;
  href?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant?: TextButtonVariant;
  ariaLabel?: string;
}

export const TextButton = ({
  children,
  element = "link",
  href = "#",
  className = "",
  onClick,
  variant = "default",
  ariaLabel,
}: TextButtonProps) => (
  <Button
    element={element}
    href={href}
    className={`dpr-text-button ${variant === "plain" ? "dpr-text-button--plain" : ""} ${className}`}
    onClick={onClick}
    ariaLabel={ariaLabel}
    variant="text-only"
  >
    {children}
  </Button>
);
