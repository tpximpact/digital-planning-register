import "@/styles/global.scss";
import React from "react";
import { CookieBanner } from "@/components/CookieBanner";
import { SkipLink } from "@/components/govuk/SkipLink";
import { GovUkInitAll } from "@/components/GovUkInitAll";
import { Metadata } from "next";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

export function generateMetadata(): Metadata {
  const title = "Digital Planning Register";
  const description =
    "This site allows you to find planning applications submitted through the Open Digital Planning system for your local council planning authority.";
  const image =
    "http://planningregister.org/assets/images/govuk-opengraph-image.png";

  return {
    title: {
      template: "%s | Digital Planning Register",
      default: title,
    },
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: title,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="govuk-template">
      <body className={`govuk-template__body`}>
        <noscript>
          <div className="govuk-visually-hidden" id="js-disabled-notification">
            You have disabled javascript on this page
          </div>
        </noscript>
        <CookieBanner />
        <SkipLink href="#main" />
        {children}
        <GovUkInitAll />
        {process.env.GTM && process.env.GA && (
          <>
            <GoogleTagManager gtmId={process.env.GTM} />
            <GoogleAnalytics gaId={process.env.GA} />
          </>
        )}
      </body>
    </html>
  );
}
