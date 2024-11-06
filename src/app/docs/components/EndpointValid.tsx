import { Schema, Validator } from "jsonschema";
import prototypeApplicationSchema from "./schemas/prototypeApplication.json";
import applicationSchema from "./schemas/application.json";
import Link from "next/link";
import { ContentError } from "@/components/ContentError";
// import { PrototypeApplication } from "./types/schemas/prototypeApplication";

export interface EndpointValidProps {
  url: string;
  type: "application" | "prototypeApplication";
}

// https://www.npmjs.com/package/jsonschema
// errors
// path: array. An array of property keys or array offsets, indicating where inside objects or arrays the instance was found.
// property: string. Describes the property path. Starts with instance, and is delimited with a dot (.).
// message: string. A human-readable message for debugging use. Provided in English and subject to change.
// schema: object. The schema containing the keyword that failed
// instance: any. The instance that failed
// name: string. The keyword within the schema that failed.
// argument: any. Provides information about the keyword that failed.

export const EndpointValid = async ({
  url,
  type = "prototypeApplication",
}: EndpointValidProps) => {
  // const type: string = "prototypeApplication";
  const currentUrl = `http://localhost:3000${url}`;
  let schema: Schema;

  const data = await fetch(currentUrl, {
    method: "GET",
    cache: "no-store",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching data from", currentUrl);
      console.error(error);
      return false;
    });

  if (type === "prototypeApplication") {
    schema = prototypeApplicationSchema as Schema;
  } else if (type === "application") {
    schema = applicationSchema as Schema;
    // const schemaResponse = fetch(
    //   "https://theopensystemslab.github.io/digital-planning-data-schemas/v0.7.0/schema.json",
    //   {
    //     method: "GET",
    //   },
    // ).then((response) => response.json() as Promise<Schema>);
    // schema = await schemaResponse;
  } else {
    return null;
  }

  // const _applicationTypeProperty =
  //   "$data.application.type.description" || "$applicationType";

  if (!data && !schema) {
    return <ContentError />;
  }
  // {nestedErrors: true}
  const validator = new Validator();
  const result = validator.validate(data.data, schema as Schema);

  // console.log("\n\n🔥🔥🔥🔥");
  // console.log("Validation of:", currentUrl, "using", schema);
  // console.log("\n");
  // console.log("Data being validated:");
  // console.log(data.data);
  // console.log("\n");
  // console.log("Validation results:");
  // console.log(result);
  // if (result.errors) {
  //   console.log("\n");
  //   console.log("Validation errors:");
  //   console.log(result.errors);
  // }
  // console.log("🔥🔥🔥🔥\n\n");

  let className;
  let status;
  if (!result.valid) {
    className = "govuk-tag govuk-tag--red";
    status = "Fail";
  } else {
    className = "govuk-tag govuk-tag--green";
    status = "Pass";
  }

  return (
    <>
      <p className="govuk-body">
        <strong>{schema.title}</strong>{" "}
        <strong className={className}>{status}</strong>
      </p>
      <p className="govuk-body">{schema.description}</p>
      <details className="govuk-details">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">Validated url</span>
        </summary>
        <div className="govuk-details__text">
          <p className="govuk-body govuk-!-text-break-word">{currentUrl}</p>

          <p className="govuk-body govuk-!-text-break-word">
            <Link className="govuk-link" href={currentUrl}>
              Open link
            </Link>
          </p>
        </div>
      </details>
      <details className="govuk-details">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">Validated data</span>
        </summary>
        <div className="govuk-details__text">
          <code>{JSON.stringify(data.data, null, 2)}</code>
        </div>
      </details>
      <p className="govuk-body"></p>
      {!result.valid && (
        <>
          <details className="govuk-details">
            <summary className="govuk-details__summary">
              <span className="govuk-details__summary-text">View errors</span>
            </summary>
            <div className="govuk-details__text">
              <ul className="govuk-list">
                {result.errors.map((error, index) => (
                  <li key={index}>
                    <p className="govuk-body-s">
                      <em>{error.property}</em> {error.message}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </>
      )}
    </>
  );
};
