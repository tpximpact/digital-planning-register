import { BopsApplicationSubmission } from "@/types/api/bops";

import {
  DprApplicationSubmissionData,
  DprApplicationSubmissionSubtopic,
  DprApplicationSubmissionSubtopicValue,
} from "@/types";
import { capitalizeFirstLetter } from "@/util";
import { BopsProperty } from "./formatters/bops/application-submission--property";
import { BopsProposal } from "./formatters/bops/application-submission--proposal";
import { BopsApplicant } from "./formatters/bops/application-submission--applicant";
import { BopsApplication } from "./formatters/bops/application-submission--application";
import { BopsFiles } from "./formatters/bops/application-submission--files";
import { BopsResponses } from "./formatters/bops/application-submission--responses";

/**
 * Converts the BOPS application submission into our DPR application submission format
 * @param submission
 * @returns DprApplicationSubmissionData
 */
export const convertApplicationSubmissionBops = (
  submission: BopsApplicationSubmission,
): DprApplicationSubmissionData => {
  return {
    data: convertApplicationSubmissionDataBops(submission),
    metadata: {
      submittedAt: submission.metadata.submittedAt,
      raw: JSON.stringify(submission),
    },
  };
};

/**
 * Converts all of the various data points and types into a simpler format for us to display
 * @TODO we don't seem to be doing anything with preAssessment? and data.user
 * @param submissionData
 * @returns array of DprApplicationSubmissionSubtopic
 */
const convertApplicationSubmissionDataBops = (
  submissionData: BopsApplicationSubmission,
): DprApplicationSubmissionSubtopic[] => {
  let data: DprApplicationSubmissionSubtopic[] = [];
  // data
  if (submissionData.data?.property) {
    data = [
      ...data,
      {
        subtopic: "Property",
        value: BopsProperty(submissionData.data?.property),
      },
    ];
  }

  if (submissionData.data?.proposal) {
    data = [
      ...data,
      {
        subtopic: "Proposal",
        value: BopsProposal(submissionData.data?.proposal),
      },
    ];
  }

  if (submissionData.data?.applicant) {
    data = [
      ...data,
      {
        subtopic: "Applicant",
        value: BopsApplicant(submissionData.data?.applicant),
      },
    ];
  }

  if (submissionData.data?.application) {
    data = [
      ...data,
      {
        subtopic: "Application",
        value: BopsApplication(submissionData.data?.application),
      },
    ];
  }

  // if (submissionData.data?.user) {}

  // files
  if (submissionData.files) {
    data = [
      ...data,
      { subtopic: "Files", value: BopsFiles(submissionData.files) },
    ];
  }

  // responses
  if (submissionData.responses) {
    data = [...data, ...BopsResponses(submissionData.responses)];
  }

  return data;
};

/**
 * Recursively flattens an object and returns an array of DprApplicationSubmissionSubtopicValue
 * @param field
 * @param prefix
 * @returns
 */
export const flattenObjectIntoRow = (
  field: Record<string, any>,
  prefix: String = "",
  exclude: string[] = [],
  include: string[] = [],
): DprApplicationSubmissionSubtopicValue[] => {
  return Object.entries(field).reduce<DprApplicationSubmissionSubtopicValue[]>(
    (accumulator, [type, value]) => {
      if (exclude.includes(type)) {
        return accumulator;
      }

      if (include.length > 0 && !include.includes(type)) {
        return accumulator;
      }

      if (typeof value === "object") {
        return [...accumulator, ...flattenObjectIntoRow(value, type)];
      } else {
        return [
          ...accumulator,
          {
            description: prefix
              ? `${prefix} - ${capitalizeFirstLetter(type)}`
              : capitalizeFirstLetter(type),
            value: value === "" ? null : value,
          },
        ];
      }
    },
    [],
  );
};
