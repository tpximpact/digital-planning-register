import { Suspense } from "react";

export interface MainContentTemplateProps {
  backButton?: React.ReactNode;
  children?: React.ReactNode;
}

export const MainContentTemplate = ({
  backButton,
  children,
}: Readonly<MainContentTemplateProps>) => {
  return (
    <>
      {backButton && backButton}
      {/* <a href="#" className="govuk-back-link">
          Back
        </a> */}
      <main className="govuk-main-wrapper" id="main-content">
        <Suspense>{children}</Suspense>
      </main>
    </>
  );
};
