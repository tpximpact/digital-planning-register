import { Pagination } from "@/components/govuk/Pagination";
import { getData } from "./data";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ContentNoResult } from "@/components/ContentNoResult";
import { ApplicationCard } from "@/components/ApplicationCard";
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export default async function ShowApplications({
  validSearchParams,
  accessToken,
}: any) {
  try {
    const response = await getData(validSearchParams);

    const nextPage = (validSearchParams.page || 1) + 1;
    const prevPage = (validSearchParams.page || 1) - 1;
    const showPrev = validSearchParams.page > 1;

    return (
      <>
        {response.data && response.data.length > 0 ? (
          <>
            {response.data.map((application, index) => (
              <div key={`top-${application.REFVAL}`}>
                <strong>Application Reference:</strong> {application.REFVAL}
                <hr />
                <ApplicationCard
                  councilSlug={"barnet"}
                  key={application.REFVAL}
                  application={{
                    applicationStatusSummary: (() => {
                      const decision = application.DECSN;
                      if (decision === "WI") {
                        return "Withdrawn";
                      }
                      if (decision === "RE") {
                        return "Returned";
                      }
                      return "Determined";
                    })(),
                    applicationDecisionSummary: (() => {
                      const decision = application.DECSN;

                      let applicationType;
                      switch (application["Application Type_D"]) {
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
                      switch (application["Application Type_D"]) {
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
                        reference: application.REFVAL,
                        stage: "assessment",
                        status: (() => {
                          const decision = application.DECSN;
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
                        submittedAt:
                          application.DATEAPRECV ||
                          application.DATEAPRECV.length !== 0
                            ? dayjs
                                .utc(application.DATEAPRECV, "DD/MM/YYYY HH:mm")
                                .toISOString()
                            : undefined,
                      },
                      validation: {
                        receivedAt:
                          application.DATEAPRECV ||
                          application.DATEAPRECV.length !== 0
                            ? dayjs
                                .utc(application.DATEAPRECV, "DD/MM/YYYY HH:mm")
                                .toISOString()
                            : undefined,
                        validatedAt:
                          application.DATEAPVAL ||
                          application.DATEAPVAL.length !== 0
                            ? dayjs
                                .utc(application.DATEAPVAL, "DD/MM/YYYY HH:mm")
                                .toISOString()
                            : undefined,
                        isValid: true,
                      },
                      assessment: {
                        planningOfficerDecision: (() => {
                          const decision = application.DECSN;

                          let applicationType;
                          switch (application["Application Type_D"]) {
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

                        planningOfficerDecisionDate:
                          application.DATEDECISN ||
                          application.DATEDECISN.length !== 0
                            ? dayjs
                                .utc(application.DATEDECISN, "DD/MM/YYYY HH:mm")
                                .toISOString()
                            : undefined,
                      },
                      caseOfficer: { name: "Casey Officer" },
                    },
                    submission: {
                      applicationType: (() => {
                        switch (application["Application Type_D"]) {
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
                            singleLine: `${application.ADDRESS} ${application.POST_TOWN} ${application.POSTCODE}`,
                          },
                        },
                        proposal: {
                          description: application.PROPOSAL,
                        },
                      },
                      metadata: {
                        organisation: "LBH",
                        id: "81bcaa0f-baf5-4573-ba0a-ea868c573faf",
                        source: "PlanX",
                        submittedAt:
                          application.DATEAPRECV ||
                          application.DATEAPRECV.length !== 0
                            ? dayjs
                                .utc(application.DATEAPRECV, "DD/MM/YYYY HH:mm")
                                .toISOString()
                            : undefined,
                        schema:
                          "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/prototypeApplication.json",
                      },
                    },
                    metadata: {
                      organisation: "BOPS",
                      id: "1234",
                      publishedAt: dayjs.utc().toISOString(),
                      submittedAt:
                        application.DATEAPRECV ||
                        application.DATEAPRECV.length !== 0
                          ? dayjs
                              .utc(application.DATEAPRECV, "DD/MM/YYYY HH:mm")
                              .toISOString()
                          : undefined,
                      schema:
                        "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/postSubmissionApplication.json",
                    },
                  }}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <ContentNoResult />
          </>
        )}

        {response.data &&
          response.data.length > validSearchParams.resultsPerPage && (
            <Pagination
              baseUrl={"/test"}
              searchParams={{ ...validSearchParams, accessToken }}
              next={{
                href: `/test`,
                searchParams: {
                  ...validSearchParams,
                  accessToken,
                  page: nextPage,
                },
              }}
              {...(showPrev
                ? {
                    prev: {
                      href: `/test`,
                      searchParams: {
                        ...validSearchParams,
                        accessToken,
                        page: prevPage,
                      },
                    },
                  }
                : {})}
            />
          )}
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    const message = error instanceof Error ? error.message : String(error);

    return (
      <>
        <p className="govuk-body">
          An error occurred while fetching the data: {message}
        </p>
      </>
    );
  }
}
