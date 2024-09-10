import Script from "next/script";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CookieBanner from "@/components/cookie_banner";
import { PhaseBanner } from "@/components/govuk/PhaseBanner";
import { SkipLink } from "@/components/govuk/SkipLink";
import "./BaseTemplate.scss";
import "@/styles/shame.scss";

export interface BaseTemplateProps {
  children?: React.ReactNode;
}

export const BaseTemplate = ({ children }: Readonly<BaseTemplateProps>) => {
  return (
    <>
      <CookieBanner />
      <SkipLink href="#main-content" />
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        {children}
      </div>

      <Footer />

      <Script id="js-detection" strategy="beforeInteractive">
        {`document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');`}
      </Script>
    </>
  );
};
