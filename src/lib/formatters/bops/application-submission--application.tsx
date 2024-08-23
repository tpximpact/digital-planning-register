import { flattenObjectIntoRow } from "@/lib/applicationSubmission";
import { DprApplicationSubmissionSubtopicValue } from "@/types";
import { capitalizeFirstLetter } from "@/util";

/**
 * Sorts the application data into a more readable format
 * @todo review the schema and update this function for missing data types
 * @param data
 * @returns
 */
export const BopsApplication = (
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue[] => {
  return Object.entries(data)
    .map(([key, value]) => {
      let description = capitalizeFirstLetter(key);
      let rowData:
        | string
        | []
        | null
        | JSX.Element
        | DprApplicationSubmissionSubtopicValue[] =
        typeof value === "string" ? value : JSON.stringify(value);

      switch (key) {
        case "fee":
          rowData = null;
          break;
        case "type":
          ({ description, value: rowData } = formatType(
            description,
            data["type"],
          ));
          break;
        case "preApp":
          ({ description, value: rowData } = formatPreApp(
            description,
            data["preApp"],
          ));
          break;
        case "declaration":
          rowData = null;
          break;
      }

      return {
        description,
        value: rowData,
      };
    })
    .filter((d) => d.value !== null);
};

///// type

const formatType = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue => {
  return {
    description: "Application type",
    value: data?.description ? data?.description : null,
  };
};

///// preApp

const formatPreApp = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue => {
  const preApp = flattenObjectIntoRow(data);

  const value =
    preApp.length > 0 ? (
      <>
        {preApp.map(({ description, value }, i) => (
          <p key={i}>
            {description}: {value?.toString()}
          </p>
        ))}
      </>
    ) : null;

  return {
    description: "Pre-application advice",
    value,
  };
};
