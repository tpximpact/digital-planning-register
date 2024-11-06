import { notFound } from "next/navigation";
import Link from "next/link";

export default async function IndexPage() {
  if (process.env.NODE_ENV !== "development") {
    return notFound();
  }

  return (
    <>
      <h1 className="govuk-heading-l">Documentation</h1>

      <DataTypes />
      <DprApi />
      <Handlers />
      <Bops />
    </>
  );
}

const DprApi = () => {
  return (
    <>
      <h2 className="govuk-heading-m" id="dpr-api">
        DPR &#34;API&#34;
      </h2>
      <p className="govuk-body">
        The DPR &#34;API&#34; recieves data from the handlers and sends it to
        the application. It should be compliant with ODP + things we're waiting
        to be added + anything we need to add
      </p>
      <p className="govuk-body">
        <Link
          className="govuk-link"
          href={{
            pathname: "/docs/dpr-api",
          }}
        >
          View DPR &#34;API&#34; documentation
        </Link>
      </p>
    </>
  );
};

const DataTypes = () => {
  return (
    <>
      <h2 className="govuk-heading-m" id="data-types">
        Data types
      </h2>
      <p className="govuk-body">
        Data types show the shapes DPR and its components expect to be working
        with. It is based on the ODP schema however we only work with data we
        need to avoid unnecessary complication.
      </p>
      <p className="govuk-body">
        <Link
          className="govuk-link"
          href={{
            pathname: "/docs/data-types",
          }}
        >
          View data types documentation
        </Link>
      </p>
    </>
  );
};

const Handlers = () => {
  return (
    <>
      <h2 className="govuk-heading-m" id="handlers">
        Handlers
      </h2>
      <p className="govuk-body">
        Handlers are responsible for dealing with each possible endpoint&#39;s
        data and, if needed, converting it into DPR&#39;s ODP compatible format
      </p>
      <p className="govuk-body">Our current handlers are:</p>
      <ul className="govuk-list">
        <li>
          <Link
            className="govuk-link"
            href={{
              pathname: "/docs/handlers",
              query: { handler: "local" },
            }}
          >
            Local
          </Link>
        </li>
        <li>
          <Link
            className="govuk-link"
            href={{
              pathname: "/docs/handlers",
              query: { handler: "bops" },
            }}
          >
            BOPS
          </Link>
        </li>
      </ul>
    </>
  );
};

const Bops = () => {
  return (
    <>
      <h2 className="govuk-heading-m" id="bops">
        BOPs
      </h2>
      <p className="govuk-body">
        BOPs is our current primary data source this page will document things
        we're waiting on BOPs for and the current status of the endpoints we're
        using
      </p>
      <p className="govuk-body">
        <Link
          className="govuk-link"
          href={{
            pathname: "/docs/bops",
          }}
        >
          View BOPs documentation
        </Link>
      </p>
    </>
  );
};
