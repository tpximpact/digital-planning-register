import { V2PlanningApplications, V2PlanningApplicationsSearch } from "@/types";

/**
 * While we're dealing with endpoints with different data structures using this method to keep the code sane!
 * @param search
 * @param application
 */
export const getNonStandardApplicationDetails = (
  search: boolean | undefined,
  application: any,
) => {
  const reference = search
    ? (application as V2PlanningApplicationsSearch["data"][0]).application
        ?.reference
    : (application as V2PlanningApplications["data"][0]).reference;

  const address = search
    ? (application as V2PlanningApplicationsSearch["data"][0]).property?.address
        ?.singleLine
    : `${(application as V2PlanningApplications["data"][0]).site?.address_1} ${
        (application as V2PlanningApplications["data"][0]).site?.postcode
      }`;

  const boundary_geojson = search
    ? (application as V2PlanningApplicationsSearch["data"][0]).property
        ?.boundary?.site
    : (application as V2PlanningApplications["data"][0]).boundary_geojson;

  const description = search
    ? (application as V2PlanningApplicationsSearch["data"][0])?.proposal
        ?.description
    : (application as V2PlanningApplications["data"][0]).description;

  const applicationType = search
    ? (application as V2PlanningApplicationsSearch["data"][0])?.application
        ?.type?.description
    : (application as V2PlanningApplications["data"][0]).application_type;

  const applicationStatus = search
    ? (application as V2PlanningApplicationsSearch["data"][0])?.application
        ?.status
    : (application as V2PlanningApplications["data"][0]).status;

  const consultationEndDate = search
    ? (application as V2PlanningApplicationsSearch["data"][0])?.application
        ?.consultation?.endDate
    : (application as V2PlanningApplications["data"][0]).consultation?.end_date;

  const applicationReceivedDate = search
    ? (application as V2PlanningApplicationsSearch["data"][0])?.application
        ?.receivedAt
    : (application as V2PlanningApplications["data"][0]).received_date;

  const applicationPublishedAt = search
    ? (application as V2PlanningApplicationsSearch["data"][0])?.application
        ?.publishedAt
    : (application as V2PlanningApplications["data"][0]).publishedAt;

  const applicationDeterminationDate = search
    ? (application as V2PlanningApplicationsSearch["data"][0])?.application
        ?.determinedAt
    : (application as V2PlanningApplications["data"][0]).determination_date;

  const applicationDecision = search
    ? (application as V2PlanningApplicationsSearch["data"][0])?.application
        ?.decision
    : (application as V2PlanningApplications["data"][0]).decision;

  const applicationReference = search
    ? (application as V2PlanningApplicationsSearch["data"][0])?.application
        ?.reference
    : (application as V2PlanningApplications["data"][0]).reference;

  return {
    reference,
    address,
    boundary_geojson,
    description,
    applicationType,
    applicationStatus,
    consultationEndDate,
    applicationReceivedDate,
    applicationPublishedAt,
    applicationDeterminationDate,
    applicationDecision,
    applicationReference,
  };
};
