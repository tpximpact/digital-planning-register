import Link from "next/link";
import { EndpointCard } from "../components/EndpointCard";
import { $args } from "../utils";
import { BopsDirect, BopsDirectDocumentation } from "@/handlers/bops/direct";

export interface DocsBopsPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function DocsBopsPage({
  params,
  searchParams,
}: DocsBopsPageProps) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <>
      <Link href="/docs" className="govuk-back-link">
        Back
      </Link>
      <h1 className="govuk-heading-l">BOPs</h1>
      <p className="govuk-body">
        We currently use both versions of the BOPS api, but are aiming for v2.
      </p>

      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
      <h2 className="govuk-heading-m" id="ApiV1">
        Used endpoints and their progress and validation status&lsquo;
      </h2>
      <p className="govuk-body">Currently used endpoints are:</p>

      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--invisible" />
      {Object.keys(BopsDirect).map((endpoint) => {
        const docs = BopsDirectDocumentation[endpoint];
        const params = $args(BopsDirect[endpoint]);
        return (
          <>
            <EndpointCard
              endpoint={endpoint}
              handler={"BopsDirect"}
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
