import Link from "next/link";
import "./InfoIcon.scss";

interface InfoIconProps {
  href: string;
  title: string;
  ariaLabel?: string;
}

export const InfoIcon = ({ href, title, ariaLabel }: InfoIconProps) => {
  if (!href) {
    return null;
  }

  if (!ariaLabel) {
    ariaLabel = title;
  }

  return (
    <Link
      className="info-icon"
      href={href}
      title={title}
      aria-label={ariaLabel}
    >
      <span aria-label={ariaLabel}>i</span>
    </Link>
  );
};
