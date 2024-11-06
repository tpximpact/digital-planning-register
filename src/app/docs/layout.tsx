import { PageWrapper } from "@/components/PageWrapper";
import { ReactNode, Suspense } from "react";
import "./documentation.scss";
import Link from "next/link";

export default function SiteLayout({
  params,
  children,
}: {
  params: any;
  children: ReactNode;
}) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  return (
    <>
      <main className="govuk-width-container" id="main">
        <PageWrapper>
          <Suspense>{children}</Suspense>
        </PageWrapper>
      </main>
    </>
  );
}
