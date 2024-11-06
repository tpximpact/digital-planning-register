import { notFound } from "next/navigation";

import { LocalHandlers } from "./LocalHandlers";
import { BopsHandlers } from "./BopsHandlers";
import Link from "next/link";

export interface DocsPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function DocsPage({ params, searchParams }: DocsPageProps) {
  if (process.env.NODE_ENV !== "development") {
    return notFound();
  }

  switch (searchParams?.handler) {
    case "local":
      return (
        <>
          <Link href="/docs" className="govuk-back-link">
            Back
          </Link>
          <LocalHandlers params={params} searchParams={searchParams} />
        </>
      );
    case "bops":
      return (
        <>
          <Link href="/docs" className="govuk-back-link">
            Back
          </Link>
          <BopsHandlers params={params} searchParams={searchParams} />
        </>
      );
    default:
      return <></>;
  }
}
