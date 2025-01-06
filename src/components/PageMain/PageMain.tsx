import React from "react";

interface PageMainProps {
  className?: string;
  children: React.ReactNode;
}

export const PageMain = ({ children, className }: PageMainProps) => {
  return (
    <main className={`govuk-main-wrapper ${className}`} id="main">
      {children}
    </main>
  );
};
