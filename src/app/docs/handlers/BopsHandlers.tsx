import Link from "next/link";
import { DocsPageProps } from "./page";
import { getAppConfig } from "@/config";
import { BopsV2, BopsV2Documentation } from "@/handlers/bops";
import { $args } from "../utils";
import { EndpointCard } from "../components/EndpointCard";

export const BopsHandlers = ({ params, searchParams }: DocsPageProps) => {
  const appConfig = getAppConfig();
  return (
    <>
      <h1 className="govuk-heading-l">BOPS handlers</h1>
      <p className="govuk-body">
        Our primary data source is BOPS. This handler is used to retrieve and
        convert data from BOPS.
      </p>
      <p className="govuk-body">
        The requirement is for DPR to be ODP schema compliant, however BOPS is
        not fully compliant yet. This handler is used to convert BOPS data into
        DPR ODP compliant data while we wait for new features to be developed
        this page will serve as a tracker for what we&#39;re waiting for on the
        BOPS side at a deeper level than JIRA.
      </p>
      <p className="govuk-body">
        BOPS itself has a number of different endpoints, some public some
        private as well as v1 and v2 versions. Each council that we support with
        BOPS has its own swagger documentation.
      </p>
      <ul className="govuk-list">
        {appConfig?.councils.map((council) => (
          <>
            {council.dataSource === "bops" && (
              <li>
                <ul className="govuk-summary-list__actions-list">
                  <li className="govuk-summary-list__actions-list-item">
                    <strong>{council.name}:</strong>
                  </li>
                  <li className="govuk-summary-list__actions-list-item">
                    <Link
                      className="govuk-link"
                      href={`https://${council.slug}.bops-staging.services/api/docs/index.html?urls.primaryName=API%20V2%20Docs`}
                    >
                      staging swagger
                    </Link>
                  </li>
                  <li className="govuk-summary-list__actions-list-item">
                    <Link
                      className="govuk-link"
                      href={`https://${council.slug}.bops.services/api/docs/index.html?urls.primaryName=API%20V2%20Docs`}
                    >
                      production swagger
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </>
        ))}
      </ul>
      <p className="govuk-body">Current handler versions are:</p>
      <ul className="govuk-list">
        <li>
          <Link className="govuk-link" href={"#BopsV2"}>
            BopsV2
          </Link>
        </li>
        <li>
          <Link className="govuk-link" href={"#BopsP05"}>
            BopsP05
          </Link>
        </li>
      </ul>
      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
      <h2 className="govuk-heading-m" id="BopsV2">
        BopsV2
      </h2>
      <p className="govuk-body">
        The BopsV2 handler is used to retrieve data from BOPS. This handler is
        the most used.
      </p>
      <p className="govuk-body">Current endpoints are:</p>

      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--invisible" />
      {Object.keys(BopsV2).map((endpoint) => {
        const docs = BopsV2Documentation[endpoint];
        const params = $args(BopsV2[endpoint]);
        return (
          <>
            <EndpointCard
              endpoint={endpoint}
              handler={"BopsV2"}
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
