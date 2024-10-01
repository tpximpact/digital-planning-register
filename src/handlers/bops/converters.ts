import { ApplicationFormObject } from "@/components/application_form";
import { convertCommentBops, sortComments } from "@/lib/comments";
import {
  DprDocument,
  DprPlanningApplication,
  DprPlanningApplicationOverview,
  DprPlanningApplicationApplicant,
} from "@/types";
import {
  BopsApplicationOverview,
  BopsNonStandardDocument,
  BopsPlanningApplication,
  BopsV2PlanningApplicationDetail,
} from "@/handlers/bops/types";
import { formatTag } from "@/util";

/**
 * Converts BOPS application(s) into our standard format
 * @param comment
 * @returns
 */
export const convertPlanningApplicationBops = (
  council: string,
  application: BopsPlanningApplication,
  privateApplication?: BopsV2PlanningApplicationDetail | null,
): DprPlanningApplication => {
  return {
    application: convertPlanningApplicationOverviewBops(
      council,
      application.application,
      privateApplication,
    ),
    property: {
      address: {
        singleLine: application.property.address.singleLine,
      },
      boundary: {
        site: application.property.boundary.site,
      },
    },
    proposal: {
      description: application.proposal.description,
    },
    applicant: convertPlanningApplicationApplicantBops(
      application,
      privateApplication,
    ),
  };
};

/**
 * @param
 * @returns
 */
export const convertPlanningApplicationApplicantBops = (
  application: BopsPlanningApplication,
  privateApplication?: BopsV2PlanningApplicationDetail | null,
): DprPlanningApplicationApplicant => {
  const { applicant } = application;
  let name = {
    first: applicant?.name?.first ?? "",
    last: applicant?.name?.last ?? "",
    title: applicant?.name?.title ?? "",
  };

  // if bops isn't sending new data we can use the old data
  // TODO delete this when BOPS sends the correct data
  if (!name.first && !name.last && !name.title) {
    name = {
      first: privateApplication?.applicant_first_name ?? "",
      last: privateApplication?.applicant_last_name ?? "",
      title: "",
    };
  }

  let applicantData: DprPlanningApplicationApplicant = {
    name,
    type: applicant?.type ?? "unknown",
    company: applicant?.company,
    address: applicant.address ?? null,
  };

  if (applicant?.ownership?.interest) {
    applicantData = {
      ...applicantData,
      ownership: {
        interest: applicant?.ownership?.interest,
      },
    };
  }

  if (applicant.agent) {
    let agentName = {
      first: applicant?.agent?.name?.first ?? "",
      last: applicant?.agent?.name?.last ?? "",
      title: applicant?.agent?.name?.title ?? "",
    };

    // if bops isn't sending new data we can use the old data
    // TODO delete this when BOPS sends the correct data
    if (!name.first && !name.last && !name.title) {
      agentName = {
        first: privateApplication?.agent_first_name ?? "",
        last: privateApplication?.agent_last_name ?? "",
        title: "",
      };
    }

    applicantData = {
      ...applicantData,
      agent: {
        name: agentName,
        company: applicant.agent?.company,
        address: applicant.agent?.address,
      },
    };
  }

  const test = {
    name: {
      first: "",
      last: "",
      title: "",
    },
    type: "charity",
    address: {
      sameAsSiteAddress: true,
    },
  } as DprPlanningApplicationApplicant;
  return test;
};
/**
 * Converts BOPS application overview into our standard format
 * @param comment
 * @returns
 */
export const convertPlanningApplicationOverviewBops = (
  council: string,
  application: BopsApplicationOverview,
  privateApplication?: BopsV2PlanningApplicationDetail | null,
): DprPlanningApplicationOverview => {
  const { consulteeComments = [], publishedComments = [] } =
    application.consultation || {};

  const consultee_comments =
    consulteeComments && consulteeComments.length > 0
      ? sortComments(consulteeComments?.map(convertCommentBops))
      : null;

  const published_comments =
    publishedComments && publishedComments.length > 0
      ? sortComments(publishedComments?.map(convertCommentBops))
      : null;

  const reference = application.reference;

  // add fake application form document
  const applicationFormDocument = ApplicationFormObject(council, reference);

  return {
    reference: application.reference,
    type: {
      description: application.type.description,
    },
    status: application.status,
    consultation: {
      endDate: application.consultation?.endDate ?? null,
      consulteeComments: consultee_comments,
      publishedComments: published_comments,
    },
    receivedAt: application.receivedAt,
    validAt: application.validAt ?? null,
    publishedAt: application.publishedAt ?? null,
    determinedAt: application.determinedAt ?? null,
    decision: application.decision ?? null,

    // missing fields from public endpoint
    id: privateApplication?.id ?? 0,
    applicant_first_name: privateApplication?.applicant_first_name ?? "",
    applicant_last_name: privateApplication?.applicant_last_name ?? "",
    agent_first_name: privateApplication?.agent_first_name ?? "",
    agent_last_name: privateApplication?.agent_last_name ?? "",
    documents: privateApplication?.documents
      ? [
          applicationFormDocument,
          ...privateApplication.documents.map(convertDocumentBopsNonStandard),
        ]
      : null,
  };
};

/**
 * Converts BOPS documents into our standard format
 * @param comment
 * @returns
 */
export const convertDocumentBopsNonStandard = (
  document: BopsNonStandardDocument,
): DprDocument => {
  return {
    url: document.url,
    title:
      document?.tags?.length > 0
        ? document.tags.map(formatTag).join(", ")
        : "Unnamed Document",
    created_at: document.created_at,
  };
};
