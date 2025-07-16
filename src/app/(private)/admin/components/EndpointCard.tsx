import Link from "next/link";
// import { EndpointValid } from "./EndpointValid";
import { Documentation } from "@/types";

export const EndpointCard = ({
  endpoint,
  handler,
  docs,
  params,
}: {
  endpoint: string;
  handler: string;
  docs: Documentation;
  params: string[];
}) => {
  return (
    <div className="govuk-grid-row" key={endpoint}>
      <div className="govuk-grid-column-one-half">
        <h3 className="govuk-heading-s">{endpoint}</h3>

        {docs.file && (
          <p className="govuk-body-s">
            <strong>File:</strong> <em>{docs.file}</em>
          </p>
        )}
        {params && params.length > 0 && (
          <p className="govuk-body-s">
            <strong>Parameters:</strong> {params.join(", ")}
          </p>
        )}
        {handler && (
          <p className="govuk-body-s">
            <strong>Handler:</strong> {handler}
          </p>
        )}
        <p className="govuk-body">{docs.description}</p>

        {docs.source && (
          <>
            <p className="govuk-body-s">
              <strong>Source(s):</strong>
            </p>
            <ul className="govuk-list">
              {docs.source.map((source) => (
                <Link
                  href={source}
                  className="govuk-link govuk-!-font-size-16"
                  key={`source-${source}`}
                >
                  {source}
                </Link>
              ))}
            </ul>
          </>
        )}

        {docs.examples && (
          <>
            <p className="govuk-body">
              <strong>Examples:</strong>
            </p>
            <ul className="govuk-list">
              {docs.examples.map((example) => (
                <li key={`example-${example.url}`}>
                  <Link className="govuk-link" href={example.url}>
                    {example.description}
                  </Link>

                  {example.source && (
                    <>
                      {" "}
                      {example.source.map((source, i) => (
                        <Link
                          href={source}
                          className="govuk-link govuk-!-font-size-16"
                          key={`example-${source}`}
                        >
                          (source
                          {example?.source &&
                            example?.source.length > 1 &&
                            i + 1}
                          )
                        </Link>
                      ))}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="govuk-grid-column-one-half">
        <p className="govuk-body">
          <Link
            role="button"
            draggable="false"
            className="govuk-button govuk-button--start"
            href={docs.url}
          >
            View data
            <svg
              className="govuk-button__start-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="19"
              viewBox="0 0 33 40"
              aria-hidden="true"
              focusable="false"
            >
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
            </svg>
          </Link>
        </p>

        {/* {docs.validate && (
          <>
            {docs.validate.map((validate) => (
              <EndpointValid url={validate.url} type={validate.type} />
            ))}
          </>
        )} */}
      </div>
    </div>
  );
};
