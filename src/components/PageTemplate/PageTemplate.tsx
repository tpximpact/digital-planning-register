import { PhaseBanner } from "@/components/govuk/PhaseBanner";
import { Header } from "@/components/Header";
import { Suspense } from "react";
import CouncilConfigComponent from "@/config/CouncilConfigComponent";
import { Footer } from "@/components/Footer";
import { AppConfig } from "@/config/types";

export interface PageTemplateProps {
  children: React.ReactNode;
  appConfig: AppConfig;
}

export const PageTemplate = ({ children, appConfig }: PageTemplateProps) => {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=yes"
      />
      <Header appConfig={appConfig} councilConfig={appConfig.council} />
      <main className="govuk-width-container" id="main">
        <PhaseBanner />
        <Suspense>{children}</Suspense>
      </main>
      <Footer councilConfig={appConfig.council} />
    </>
  );
};
