import { PhaseBanner } from "@/components/govuk/PhaseBanner";
import { Header } from "@/components/Header";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { AppConfig } from "@/config/types";
import { PageCenter } from "../PageCenter";

export interface PageTemplateProps {
  children: React.ReactNode;
  appConfig: AppConfig;
}

export const PageTemplate = ({ children, appConfig }: PageTemplateProps) => {
  return (
    <>
      <Header appConfig={appConfig} />
      <PageCenter>
        <PhaseBanner />
        <Suspense>{children}</Suspense>
      </PageCenter>
      <Footer councilConfig={appConfig.council} />
    </>
  );
};
