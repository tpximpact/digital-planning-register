"use client";
import { SkipLink as GovUkSkipLink, createAll } from "govuk-frontend";
import { useState, useEffect } from "react";
import "./SkipLink.scss";

export interface SkipLinkProps {
  href: string;
}

export const SkipLink = ({ href }: Required<SkipLinkProps>) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    createAll(GovUkSkipLink);
  }

  return (
    <a href={href} className="govuk-skip-link" data-module="govuk-skip-link">
      Skip to main content
    </a>
  );
};
