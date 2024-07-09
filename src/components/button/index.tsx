"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export const BackLink = () => {
  const router = useRouter();
  const [isJsEnabled, setIsJsEnabled] = useState(false);
  useEffect(() => {
    document.documentElement.className = "js-enabled";
    setIsJsEnabled(true);
  }, []);
  return (
    <>
      {isJsEnabled && (
        <button
          type="button"
          onClick={() => router.back()}
          className="govuk-back-link back-button"
        >
          Back
        </button>
      )}
    </>
  );
};

export const Button = ({
  content,
  icon,
  className,
  type = "button",
  iconClass,
}: {
  iconClass?: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
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
