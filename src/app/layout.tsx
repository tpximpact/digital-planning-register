import Script from "next/script";
import Head from "../components/head";
import { BaseTemplate } from "@/components/templates/BaseTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Planning Register",
  description: `Showing planning applications`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="govuk-template">
      <title>Digital Planning Register</title>
      <Head />
      <body className="govuk-template__body">
        <BaseTemplate>{children}</BaseTemplate>
        <Script id="js-detection" strategy="beforeInteractive">
          {`document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');`}
        </Script>
      </body>
    </html>
  );
}
