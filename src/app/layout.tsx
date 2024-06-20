"use client";
import "./globals.css";
import "@/styles/app.scss";
import Header from "../components/header";
import Head from "../components/head";
import { Suspense } from "react";
import React from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (typeof window !== "undefined") {
    const govUk = require("govuk-frontend");
    govUk.initAll();
  }
  return (
    <html lang="en">
      <title>Digital Planning Register</title>
      <Head />
      <body className="govuk-frontend-supported">
        <a
          href="#main"
          className="govuk-skip-link"
          data-module="govuk-skip-link"
        >
          Skip to main content
        </a>
        <Header currentPath={pathname} />
        <main className="govuk-width-container" id="main">
          <Suspense>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}
