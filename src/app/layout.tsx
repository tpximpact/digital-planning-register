// "use client";
import "@/styles/app.scss";
import Header from "../components/header";
import { Suspense } from "react";
import React from "react";
import { PhaseBanner } from "@/components/govuk/PhaseBanner";
import Footer from "@/components/footer";
import CookieBanner from "@/components/cookie_banner";
import { getConfig } from "@/lib/config";
import { Metadata } from "next";
import { GovUkInitAll } from "@/components/GovUkInitAll";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { SkipLink } from "@/components/govuk/SkipLink";

export function generateMetadata(): Metadata {
  const title = "Digital Planning Register";
  const description =
    "This site allows you to find planning applications submitted through the Open Digital Planning system for your local council planning authority.";
  const image =
    "http://planningregister.org/govuk-assets/images/govuk-opengraph-image.png";

  return {
    title,
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
  const councilConfig = await getConfig();
  return (
    <html lang="en" className="govuk-template">
      {process.env.GTM && process.env.GA && (
        <>
          <GoogleTagManager gtmId={process.env.GTM} />
          <GoogleAnalytics gaId={process.env.GA} />
        </>
      )}
      <title>Digital Planning Register</title>
      <body className={`govuk-template__body`}>
        <CookieBanner />
        <SkipLink href="#main" />
        <Header councilConfig={councilConfig} />
        <main className="govuk-width-container" id="main">
          <PhaseBanner />
          <Suspense>{children}</Suspense>
        </main>
        <Footer />
        <GovUkInitAll />
      </body>
    </html>
  );
}
