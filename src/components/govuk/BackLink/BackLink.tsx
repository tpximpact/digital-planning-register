"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export const BackLink = ({ href }: { href?: string }) => {
  const router = useRouter();
  const [isJsEnabled, setIsJsEnabled] = useState(false);

  useEffect(() => {
    document.documentElement.className = "js-enabled";
    setIsJsEnabled(true);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <>
      {isJsEnabled && (
        <Link
          href={href || "#"}
          onClick={handleClick}
          className="govuk-back-link back-button"
        >
          Back
        </Link>
      )}
    </>
  );
};
