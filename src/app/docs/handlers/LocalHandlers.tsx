import Link from "next/link";
import { LocalV1, LocalV1Documentation } from "@/handlers/local";
import { $args } from "../utils";
import { DocsPageProps } from "./page";
import { EndpointCard } from "../components/EndpointCard";
import { LocalOdp, LocalOdpDocumentation } from "@/handlers/local/odp";

export const LocalHandlers = ({ params, searchParams }: DocsPageProps) => {
  return (
    <>
      <h1 className="govuk-heading-l">Local handlers</h1>
      <p className="govuk-body">
        The local handler aligns exactly with the DPR API schema. It is used for
        development purposes, returning fake data to the client, and to the
        components when viewed in storybook.
      </p>
      <p className="govuk-body">
        When developing new features for which a handler endpoint does not yet
        exist, the best place to develop it is in the local handler. This allows
        the feature to be developed and tested without needing to wait for the
        handler to be developed.
      </p>
      <p className="govuk-body">Current handler versions are:</p>
      <ul className="govuk-list">
        <li>
          <Link className="govuk-link" href={"#LocalV1"}>
            LocalV1
          </Link>
        </li>
        <li>
          <Link className="govuk-link" href={"#LocalOdp"}>
            LocalOdp
          </Link>
        </li>
      </ul>

      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
      <h2 className="govuk-heading-m" id="LocalV1">
        LocalV1
      </h2>
      <p className="govuk-body">
        Currently we only have one version of the local handler, LocalV1. This
        endpoint provides random data in the format required for the application
        to run.
      </p>
      <p className="govuk-body">Current endpoints are:</p>

      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--invisible" />
      {Object.keys(LocalV1).map((endpoint) => {
        const docs = LocalV1Documentation[endpoint];
        const params = $args(LocalV1[endpoint]);
        return (
          <>
            <EndpointCard
              endpoint={endpoint}
              handler={"LocalV1"}
              docs={docs}
              params={params}
            />
            <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
          </>
        );
      })}
      <h2 className="govuk-heading-m" id="LocalOdp">
        LocalOdp
      </h2>
      <p className="govuk-body">
        This endpoint helps us validate data that comes in the ODP format.
      </p>
      <p className="govuk-body">Current endpoints are:</p>

      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--invisible" />
      {Object.keys(LocalOdp).map((endpoint) => {
        const docs = LocalOdpDocumentation[endpoint];
        const params = $args(LocalOdp[endpoint]);
        return (
          <>
            <EndpointCard
              endpoint={endpoint}
              handler={"LocalOdp"}
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
};
