import "./globals.css";
import "@/styles/app.scss";
import Header from "@/components/header";
import Head from "@/components/head";
import { Suspense } from "react";

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
      <Head />
      <body>
        <Header />
        <div className="layout">
          <Suspense>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
