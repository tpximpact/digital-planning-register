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
      <h1 className="govuk-heading-l">DPR API</h1>
      <p className="govuk-body">
        The DPR is dealing with two sets of schema inconsistencies.
        <br />
        The first is that the ODP schema doesnt (yet) contain everything we
        need, from BOPS or for the DSN work.
        <br />
        Secondly BOPS&#39; endpoints aren&#39;t aligning with ODP yet - however
        this isn&#39;t so much a problem so long as we can cajole their data
        into the supported ODP format using the handlers and converters.
      </p>

      <p className="govuk-body">Current handler versions are:</p>
      <ul className="govuk-list">
        <li>
          <Link className="govuk-link" href={"#ApiV1"}>
            ApiV1
          </Link>
        </li>
      </ul>

      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
      <h2 className="govuk-heading-m" id="ApiV1">
        ApiV1
      </h2>
      <p className="govuk-body">
        Currently we only have one version of the local handler, LocalV1. This
        endpoint provides random data in the format required for the application
        to run.
      </p>
      <p className="govuk-body">Current endpoints are:</p>

      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--invisible" />
      {Object.keys(ApiV1).map((endpoint) => {
        const docs = ApiV1Documentation[endpoint];
        const params = $args(ApiV1[endpoint]);
        return (
          <>
            <EndpointCard
              endpoint={endpoint}
              handler={"ApiV1"}
              docs={docs}
              params={params}
            />
            <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
          </>
        );
      })}

      <div className="govuk-inset-text">
        NB: Opening the relevant files will show you the accepted parameters to
        preview different data requests
      </div>
    </>
  );
}
