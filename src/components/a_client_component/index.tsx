"use client";

import { trackClient } from "@/lib/DprAnalytics";

interface AClientComponentProps {
  text: string;
  type?: "button" | "submit" | "reset";
}

export const AClientComponent = ({
  text,
  type = "button",
}: AClientComponentProps) => {
  return (
    <button
      type={type}
      className={`govuk-button`}
      data-module="govuk-button"
      onClick={() => {
        trackClient("Button clicked");
      }}
    >
      {text}
    </button>
  );
};
