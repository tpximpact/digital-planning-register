// "use client";
import "./globals.css";
import "@/styles/app.scss";
import Header from "../components/header";
import { Suspense } from "react";
import React from "react";
import PhaseBanner from "@/components/phase_banner";
import Footer from "@/components/footer";
import CookieBanner from "@/components/cookie_banner";
import { getConfig } from "@/lib/config";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const councilConfig = await getConfig();
  return (
    <html lang="en">
      <title>Digital Planning Register</title>
      <body className="govuk-frontend-supported">
        <CookieBanner />
        <a
          href="#main"
          className="govuk-skip-link"
          data-module="govuk-skip-link"
        >
          Skip to main content
        </a>
        <Header councilConfig={councilConfig} />
        <main className="govuk-width-container" id="main">
          <PhaseBanner />
          <Suspense>{children}</Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
