import { DprApplicationSubmissionSubtopicValue } from "@/types";
import { capitalizeFirstLetter } from "@/util";
import {
  formatBoundary,
  formatParking,
  parseParking,
} from "./application-submission--property";

/**
 * Sorts the proposal data into a more readable format
 * @todo review the schema and update this function for missing data types
 * @param data
 * @returns
 */
export const BopsProposal = (
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
        case "date":
          ({ description, value: rowData } = formatDate(
            description,
            data["date"],
          ));
          break;
        case "extend":
          ({ description, value: rowData } = formatExtend(
            description,
            data["extend"],
          ));
          break;
        case "boundary":
          rowData = formatBoundary(data["boundary"], true);
          break;
        case "parking":
          const parking = parseParking(data["parking"], "", "+", "difference");
          ({ description, value: rowData } = formatParking(
            "Additional parking",
            parking,
          ));
          break;
        case "projectType":
          ({ description, value: rowData } = formatProjectType(
            description,
            data["projectType"],
          ));
          break;
      }

      return {
        description,
        value: rowData,
      };
    })
    .filter((d) => d.value !== null);
};

///// Date

const formatDate = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue => {
  const values = [];
  if (data?.start) {
    values.push(data?.start);
  }
  if (data?.completion) {
    values.push(data?.completion);
  }

  return {
    description: "Construction dates",
    value: values.length > 0 ? values.join(" to ") : null,
  };
};

///// Date

const formatExtend = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue => {
  return {
    description: "Extension size",
    value: data ? `${data?.area?.squareMetres} m2` : "",
  };
};

///// project type

const formatProjectType = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue => {
  const projectDescriptions: string[] = data?.map(
    (el: { description: string }) => el.description,
  );
  const value =
    projectDescriptions && projectDescriptions.length > 0 ? (
      <>
        {projectDescriptions.map((d, i) => (
          <p key={i}>{d}</p>
        ))}
      </>
    ) : null;
  return {
    description: "Project type",
    value,
  };
};
