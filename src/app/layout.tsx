import "./globals.css";
import "@/styles/app.scss";
import Header from "../components/header";
import Head from "../components/head";
import { Suspense } from "react";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (typeof window !== "undefined") {
    const govUk = require("govuk-frontend");
    govUk.initAll();
  }
  return (
    <html lang="en">
      <title>Public index</title>
      <Head />
      <body>
        <Header />
        <div className="govuk-width-container">
          <Suspense>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
