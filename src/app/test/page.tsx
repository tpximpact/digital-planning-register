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

import React from "react";
import {
  ApiResponse,
  SearchParamsApplication,
  UnknownSearchParams,
} from "@/types";
import { getAppConfig } from "@/config";
import { ContentError } from "@/components/ContentError";
import { PageMain } from "@/components/PageMain";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/PageTemplate";
import { getValueFromUnknownSearchParams } from "@/lib/search";
import { ContainerClient } from "@azure/storage-blob";
import { ApplicationCard } from "@/components/ApplicationCard";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { validateSearchParams } from "@/lib/planningApplication/search";
import { Pagination } from "@/components/govuk/Pagination";
import { FormSearch } from "@/components/FormSearch";
dayjs.extend(utc);

interface HomeProps {
  searchParams?: UnknownSearchParams;
}

async function fetchData(): Promise<string[]> {
  const sasUrl = process.env.TEST_URL;
  if (!sasUrl) {
    throw new Error("TEST_URL environment variable is not set");
  }

  const folderPath = process.env.TEST_FOLDER_PATH || "test-folder";
  if (!folderPath) {
    throw new Error("TEST_FOLDER_PATH environment variable is not set");
  }

  const fileName = process.env.TEST_FILENAME || "planningdata.json";
  if (!folderPath) {
    throw new Error("TEST_FILENAME environment variable is not set");
  }

  const containerClient = new ContainerClient(sasUrl);
  const blobs = containerClient.listBlobsFlat({ prefix: folderPath });

  for await (const blob of blobs) {
    if (blob.name.endsWith(fileName)) {
      const blobClient = containerClient.getBlobClient(blob.name);
      const downloadResponse = await blobClient.download();
      const downloaded = await streamToString(
        downloadResponse.readableStreamBody ?? null,
      );
      const trimmed = downloaded.trim();
      return JSON.parse(trimmed);
    }
  }

  throw new Error(`${fileName} not found`);
}

// Helper to read a stream into a string
async function streamToString(
  readableStream: NodeJS.ReadableStream | null,
): Promise<string> {
  if (!readableStream) return "";

  const chunks: Uint8Array[] = [];
  for await (const chunk of readableStream) {
    if (typeof chunk === "string") {
      chunks.push(Buffer.from(chunk, "utf-8"));
    } else {
      chunks.push(Buffer.from(chunk));
    }
  }
  return Buffer.concat(chunks).toString("utf-8");
}

const fakePagination = (
  data: any,
  totalResults: number,
  searchParams: SearchParamsApplication,
): ApiResponse<any> => {
  const finalTotalResults = totalResults + data.length;

  const resultsPerPage = searchParams.resultsPerPage;
  const currentPage = searchParams.page;
  const totalPages = Math.ceil(finalTotalResults / resultsPerPage);

  // Calculate shown documents
  const startIdx = ((currentPage ?? 1) - 1) * (resultsPerPage ?? 10);
  const endIdx = startIdx + (resultsPerPage ?? 10);
  // Sort by DCAPPL[DATEAPRECV] descending (newest first)
  const currentPageData = data
    .sort((a, b) => {
      const dateA = new Date(a["DCAPPL[DATEAPRECV]"] ?? 0).getTime();
      const dateB = new Date(b["DCAPPL[DATEAPRECV]"] ?? 0).getTime();
      return dateB - dateA;
    })
    .slice(startIdx, endIdx);

  const pagination = {
    resultsPerPage,
    currentPage,
    totalPages,
    totalResults: finalTotalResults,
    totalAvailableItems: finalTotalResults,
  };

  return {
    data: currentPageData.length > 0 ? currentPageData : null,
    pagination,
    status: {
      code: 200,
      message: "OK",
    },
  };
};

export async function generateMetadata() {
  return {
    title: "Test page",
    description: "Test page for azure blob storage",
  };
}

export default async function PlanningApplicationSearch({
  searchParams,
}: HomeProps) {
  const appConfig = getAppConfig();

  const accessToken =
    searchParams && searchParams.accessToken
      ? getValueFromUnknownSearchParams(searchParams, "accessToken")
      : undefined;

  if (!accessToken || accessToken !== process.env.TEST_KEY) {
    return notFound();
  }

  try {
    const response = await fetchData();
    const validSearchParams = validateSearchParams(appConfig, searchParams);
    const paginatedData = fakePagination(
      response,
      response.length,
      validSearchParams,
    );

    const data = paginatedData.data;

    console.log(data);
    return (
      <PageTemplate appConfig={appConfig}>
        <PageMain>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">
                Welcome to the Digital Planning Register
              </h1>
              <p className="govuk-body">
                You can find planning applications submitted through the Open
                Digital Planning system for your local council planning
                authority.
              </p>
              <p className="govuk-body">
                Not all planning applications will be available through this
                register. You may need to check individual council&apos;s
                websites to see what records are kept here.
              </p>
            </div>
          </div>
          <FormSearch params={{}} searchParams={validSearchParams} />

          <h2 className="govuk-heading-l">Recently published applications</h2>
          {data.map((application, index) => (
            <>
              {/* <p>
                <strong>DCAPPL[ADDRESS]</strong>:{" "}
                {application["DCAPPL[ADDRESS]"]}
              </p>
              <p>
                <strong>DCAPPL[Application Type_D]</strong>:{" "}
                {application["DCAPPL[Application Type_D]"]}
              </p>
              <p>
                <strong>DCAPPL[BLPU_CLASS]</strong>:{" "}
                {application["DCAPPL[BLPU_CLASS]"]}
              </p>
              <p>
                <strong>DCAPPL[BLPU_CLASS_DESC]</strong>:{" "}
                {application["DCAPPL[BLPU_CLASS_DESC]"]}
              </p>
              <p>
                <strong>DCAPPL[DATEAPRECV]</strong>:{" "}
                {application["DCAPPL[DATEAPRECV]"]}
              </p>
              <p>
                <strong>DCAPPL[DATEAPVAL]</strong>:{" "}
                {application["DCAPPL[DATEAPVAL]"]}
              </p>
              <p>
                <strong>DCAPPL[DATEDECISN]</strong>:{" "}
                {application["DCAPPL[DATEDECISN]"]}
              </p>
              <p>
                <strong>DCAPPL[DCAPPTYP]</strong>:{" "}
                {application["DCAPPL[DCAPPTYP]"]}
              </p>
              <p>
                <strong>DCAPPL[DCAREATM]</strong>:{" "}
                {application["DCAPPL[DCAREATM]"]}
              </p>
              <p>
                <strong>DCAPPL[DECSN]</strong>: {application["DCAPPL[DECSN]"]}
              </p>
              <p>
                <strong>DCAPPL[DTYPNUMBCO]</strong>:{" "}
                {application["DCAPPL[DTYPNUMBCO]"]}
              </p>
              <p>
                <strong>DCAPPL[Documents URL]</strong>:{" "}
                {application["DCAPPL[Documents URL]"]}
              </p>
              <p>
                <strong>DCAPPL[MAP_EAST]</strong>:{" "}
                {application["DCAPPL[MAP_EAST]"]}
              </p>
              <p>
                <strong>DCAPPL[MAP_NORTH]</strong>:{" "}
                {application["DCAPPL[MAP_NORTH]"]}
              </p>
              <p>
                <strong>DCAPPL[OFFCODE]</strong>:{" "}
                {application["DCAPPL[OFFCODE]"]}
              </p>
              <p>
                <strong>DCAPPL[POSTCODE]</strong>:{" "}
                {application["DCAPPL[POSTCODE]"]}
              </p>
              <p>
                <strong>DCAPPL[POST_TOWN]</strong>:{" "}
                {application["DCAPPL[POST_TOWN]"]}
              </p>
              <p>
                <strong>DCAPPL[PROPOSAL]</strong>:{" "}
                {application["DCAPPL[PROPOSAL]"]}
              </p>
              <p>
                <strong>DCAPPL[RECOMOFF]</strong>:{" "}
                {application["DCAPPL[RECOMOFF]"]}
              </p>
              <p>
                <strong>DCAPPL[REFVAL]</strong>: {application["DCAPPL[REFVAL]"]}
              </p>
              <p>
                <strong>DCAPPL[Team_D]</strong>: {application["DCAPPL[Team_D]"]}
              </p>
              <p>
                <strong>DCAPPL[UPRN]</strong>: {application["DCAPPL[UPRN]"]}
              </p>
              <p>
                <strong>DCAPPL[WARDNAME]</strong>:{" "}
                {application["DCAPPL[WARDNAME]"]}
              </p>
              <p>
                <strong>DCAPPL[WARD]</strong>: {application["DCAPPL[WARD]"]}
              </p> */}

              <ApplicationCard
                councilSlug={"barnet"}
                key={index}
                application={{
                  applicationStatusSummary: (() => {
                    const decision = application["DCAPPL[DECSN]"];
                    if (decision === "WI") {
                      return "Withdrawn";
                    }
                    if (decision === "RE") {
                      return "Returned";
                    }
                    return "Determined";
                  })(),
                  applicationDecisionSummary: (() => {
                    const decision = application["DCAPPL[DECSN]"];

                    let applicationType;
                    switch (application["DCAPPL[Application Type_D]"]) {
                      case "Conditions":
                        applicationType = "approval.conditions";
                        break;
                      case "Full Application":
                        applicationType = "pp.full";
                        break;
                      case "Householder Application":
                        applicationType = "pp.full.householder";
                        break;
                      case "Prior Notification (Householder)":
                        applicationType = "pa.part1.classA";
                        break;
                      case "Prior Notification (Telecommunication)":
                        applicationType = "pa.part16.classA";
                        break;
                      case "Proposed Lawful Development Certificate":
                        applicationType = "ldc.proposed";
                        break;
                      case "Trees: Notices of Intent":
                        applicationType = "wtt.notice";
                        break;
                    }

                    // if (applicationType?.startsWith("pa")) {
                    //   return "Prior approval not required";
                    // }

                    switch (decision) {
                      case "AC":
                        return "Granted";
                      case "LW":
                        return `Unknown (${decision})`;
                      case "PA":
                        return `Unknown (${decision})`;
                      case "PC":
                        return `Unknown (${decision})`;
                      case "RE":
                        return `Unknown (${decision})`;
                      case "TO":
                        return `Unknown (${decision})`;
                      case "WI":
                        return `Unknown (${decision})`;
                      default:
                        return `Unknown (${decision})`;
                    }
                  })(),
                  applicationType: (() => {
                    switch (application["DCAPPL[Application Type_D]"]) {
                      case "Conditions":
                        return "approval.conditions";
                      case "Full Application":
                        return "pp.full";
                      case "Householder Application":
                        return "pp.full.householder";
                      case "Prior Notification (Householder)":
                        return "pa.part1.classA";
                      case "Prior Notification (Telecommunication)":
                        return "pa.part16.classA";
                      case "Proposed Lawful Development Certificate":
                        return "ldc.proposed";
                      case "Trees: Notices of Intent":
                        return "wtt.notice";
                    }
                  })(),
                  data: {
                    application: {
                      reference: application["DCAPPL[REFVAL]"],
                      stage: "assessment",
                      status: (() => {
                        const decision = application["DCAPPL[DECSN]"];
                        if (decision === "WI") {
                          return "withdrawn";
                        }
                        return "determined";
                      })(),
                    },
                    localPlanningAuthority: {
                      commentsAcceptedUntilDecision: false,
                    },
                    submission: {
                      submittedAt: dayjs
                        .utc(application["DCAPPL[DATEAPRECV]"])
                        .toISOString(),
                    },
                    validation: {
                      receivedAt: dayjs
                        .utc(application["DCAPPL[DATEAPRECV]"])
                        .toISOString(),
                      validatedAt: dayjs
                        .utc(application["DCAPPL[DATEAPVAL]"])
                        .toISOString(),
                      isValid: true,
                    },
                    assessment: {
                      expiryDate: "2022-02-05",
                      planningOfficerDecision: (() => {
                        const decision = application["DCAPPL[DECSN]"];

                        let applicationType;
                        switch (application["DCAPPL[Application Type_D]"]) {
                          case "Conditions":
                            applicationType = "approval.conditions";
                            break;
                          case "Full Application":
                            applicationType = "pp.full";
                            break;
                          case "Householder Application":
                            applicationType = "pp.full.householder";
                            break;
                          case "Prior Notification (Householder)":
                            applicationType = "pa.part1.classA";
                            break;
                          case "Prior Notification (Telecommunication)":
                            applicationType = "pa.part16.classA";
                            break;
                          case "Proposed Lawful Development Certificate":
                            applicationType = "ldc.proposed";
                            break;
                          case "Trees: Notices of Intent":
                            applicationType = "wtt.notice";
                            break;
                        }

                        switch (decision) {
                          case "AC":
                            return "granted";
                          case "LW":
                            return "Unknown";
                          case "PA":
                            return "Unknown";
                          case "PC":
                            return "Unknown";
                          case "RE":
                            return "Unknown";
                          case "TO":
                            return "Unknown";
                          case "WI":
                            return "Unknown";
                          default:
                            return "Unknown";
                        }
                      })(),

                      planningOfficerDecisionDate: dayjs
                        .utc(application["DCAPPL[DATEDECISN]"])
                        .toISOString(),
                    },
                    caseOfficer: { name: "Casey Officer" },
                  },
                  submission: {
                    applicationType: (() => {
                      switch (application["DCAPPL[Application Type_D]"]) {
                        case "Conditions":
                          return "approval.conditions";
                        case "Full Application":
                          return "pp.full";
                        case "Householder Application":
                          return "pp.full.householder";
                        case "Prior Notification (Householder)":
                          return "pa.part1.classA";
                        case "Prior Notification (Telecommunication)":
                          return "pa.part16.classA";
                        case "Proposed Lawful Development Certificate":
                          return "ldc.proposed";
                        case "Trees: Notices of Intent":
                          return "wtt.notice";
                      }
                    })(),
                    data: {
                      property: {
                        address: {
                          singleLine: `${application["DCAPPL[ADDRESS]"]} ${application["DCAPPL[POST_TOWN]"]} ${application["DCAPPL[POSTCODE]"]}`,
                        },
                      },
                      proposal: {
                        description: application["DCAPPL[PROPOSAL]"],
                      },
                    },
                    metadata: {
                      organisation: "LBH",
                      id: "81bcaa0f-baf5-4573-ba0a-ea868c573faf",
                      source: "PlanX",
                      submittedAt: dayjs
                        .utc(application["DCAPPL[DATEAPRECV]"])
                        .toISOString(),
                      schema:
                        "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/prototypeApplication.json",
                    },
                  },
                  metadata: {
                    organisation: "BOPS",
                    id: "1234",
                    publishedAt: dayjs.utc().toISOString(),
                    submittedAt: dayjs
                      .utc(application["DCAPPL[DATEAPRECV]"])
                      .toISOString(),
                    schema:
                      "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/postSubmissionApplication.json",
                  },
                }}
              />
            </>
          ))}
          {paginatedData.pagination &&
            paginatedData.pagination.totalPages > 1 && (
              <Pagination
                baseUrl={"/test"}
                searchParams={{ ...validSearchParams, accessToken }}
                pagination={paginatedData.pagination}
              />
            )}
        </PageMain>
      </PageTemplate>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <PageTemplate appConfig={appConfig}>
        <PageMain>
          <ContentError />
        </PageMain>
      </PageTemplate>
    );
  }
}
