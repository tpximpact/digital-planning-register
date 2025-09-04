/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */
// allowing any here because this code will be replaced soon
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Responses } from "digital-planning-data-schemas/types/shared/Responses.ts";

import {
  DprApplicationSubmissionData,
  DprApplicationSubmissionSubtopic,
  DprApplicationSubmissionSubtopicValue,
} from "@/types";
import { BopsApplicationSubmission } from "@/handlers/bops/types";
import { capitalizeFirstLetter, convertDateTimeToUtc } from "@/util";
import { BopsProperty } from "../formatters/application-submission--property";
import { BopsProposal } from "../formatters/application-submission--proposal";
import { BopsApplicant } from "../formatters/application-submission--applicant";
import { BopsApplication } from "../formatters/application-submission--application";
import { BopsFiles } from "../formatters/application-submission--files";
import { BopsResponses } from "../formatters/application-submission--responses";

/**
 * Converts the BOPS application submission into our DPR application submission format
 * @param submission
 * @returns DprApplicationSubmissionData
 */
export const convertApplicationSubmissionBops = (
  submission: BopsApplicationSubmission,
): DprApplicationSubmissionData => {
  return {
    data: convertApplicationSubmissionDataBops(
      filterSensitiveData(submission) as BopsApplicationSubmission,
    ),
    metadata: {
      submittedAt: convertDateTimeToUtc(submission.metadata.submittedAt),
      raw: JSON.stringify(submission),
    },
  };
};

export const filterSensitiveData = (applicationForm: unknown): unknown => {
  if (
    typeof applicationForm === "object" &&
    applicationForm !== null &&
    "responses" in applicationForm &&
    Array.isArray((applicationForm as { responses?: unknown }).responses)
  ) {
    const { responses, ...rest } = applicationForm as { responses: Responses };
    // Filter out responses where question contains 'disab'
    let filteredResponses = responses.filter(
      (response) => !response.question?.toLowerCase().includes("disab"),
    );
    // Filter out responses where section name is "Pay and send"
    const payAndSendRegex = /pay\s*(and|&)?\s*send/i;
    filteredResponses = filteredResponses.filter(
      (response) =>
        !payAndSendRegex.test(response?.metadata?.sectionName ?? ""),
    );
    console.log("filteredResponses", filteredResponses);
    // Return new object with filtered responses
    return { ...rest, responses: filteredResponses };
  }
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
  prefix: string = "",
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
