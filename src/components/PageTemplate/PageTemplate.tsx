import { getAppConfig } from "@/config";

import { PhaseBanner } from "@/components/govuk/PhaseBanner";
import { Header } from "@/components/Header";
import { Suspense } from "react";
import CouncilConfigComponent from "@/config/CouncilConfigComponent";
import { Footer } from "@/components/govuk/Footer";

export interface PageTemplateProps {
  children: React.ReactNode;
}

export const PageTemplate = async ({ children }: PageTemplateProps) => {
  const appConfig = await getAppConfig();
  return (
    <>
      <CouncilConfigComponent appConfig={appConfig} Component={Header} />
      <main className="govuk-width-container" id="main">
        <PhaseBanner />
        <Suspense>{children}</Suspense>
      </main>
      <CouncilConfigComponent appConfig={appConfig} Component={Footer} />
    </>
  );
};
