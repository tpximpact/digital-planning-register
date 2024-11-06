import { notFound } from "next/navigation";

import { LocalHandlers } from "./LocalHandlers";
import { BopsHandlers } from "./BopsHandlers";
import { ApiV1, ApiV1Documentation } from "@/actions/api";
import { EndpointCard } from "../components/EndpointCard";
import { $args } from "../utils";
import Link from "next/link";

export interface DocsDprApiPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function DocsDprApiPage({
  params,
  searchParams,
}: DocsDprApiPageProps) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <>
      <Link href="/docs" className="govuk-back-link">
        Back
      </Link>
      <h1 className="govuk-heading-l">Data types</h1>
      <p className="govuk-body">
        As we move over to more and more of the ODP schema&#39;s our types will
        either be inherited straight from or extended from their repo.
      </p>
      <p className="govuk-body">Our main defintion types are:</p>
      <ul className="govuk-list">
        <li>
          <strong>DprApplication</strong> - the most important object, contains
          all the information about a planning application
        </li>
        <li>
          <strong>DprDocument</strong> - a file or document associated with a
          planning application
        </li>
        <li>
          <strong>DprComment</strong> - a comment on a planning application
        </li>
        <li>
          <strong>DprBoundaryGeojson</strong> - the messy data bit that
          describes the boundary of a planning application
        </li>
      </ul>
    </>
  );
}
