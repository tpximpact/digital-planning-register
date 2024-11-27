"use client";
import "./BackButton.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../Button";

// ============= Legacy Components (To be deprecated) =============

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

/** @deprecated Use Button with element="link" instead */
export const OldBackButton = ({ href }: { href: string }) => {
  return (
    <Link href={href} className="govuk-back-link back-button">
      Back
    </Link>
  );
};

/** New components */

interface BackButtonProps {
  baseUrl: string;
  searchParams?: Record<string, string>;
  className?: string;
}

export const BackButton = ({
  baseUrl,
  searchParams,
  className = "",
}: BackButtonProps) => {
  const href = baseUrl
    ? searchParams
      ? {
          pathname: baseUrl,
          query: searchParams,
        }
      : baseUrl
    : "#";

  return (
    <Button
      element="link"
      href={href}
      className={`govuk-back-link back-button ${className}`.trim()}
      variant="text-only"
    >
      Back
    </Button>
  );
};
