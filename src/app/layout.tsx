"use client";
import "./globals.css";
import "@/styles/app.scss";
import Header from "../components/header";
import Head from "../components/head";
import { Suspense, useEffect } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import PhaseBanner from "@/components/phase_banner";
import Footer from "@/components/footer";
import CookieBanner from "@/components/cookie_banner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  if (typeof window !== "undefined") {
    const govUk = require("govuk-frontend");
    govUk.initAll();

    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      const { worker } = require("../../mocks/browser");
      worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
      });
      console.log("MSW started");
    }
  }

  return (
    <html lang="en">
      <title>Digital Planning Register</title>
      <Head />
      <body className="govuk-frontend-supported">
        <CookieBanner />
        <a
          href="#main"
          className="govuk-skip-link"
          data-module="govuk-skip-link"
        >
          Skip to main content
        </a>
        <Header currentPath={pathname} />
        <main className="govuk-width-container" id="main">
          <PhaseBanner />
          <Suspense>{children}</Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
