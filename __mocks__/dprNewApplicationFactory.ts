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

import { DprApplication } from "@/types";
import { faker, fakerEN_GB } from "@faker-js/faker";
import dayjs, { Dayjs } from "dayjs";
import { generateReference } from "./dprApplicationFactory";
import type {
  OSAddress,
  ProposedAddress,
} from "digital-planning-data-schemas/types/shared/Addresses.ts";
import type {
  AdvertConsentApplicationType,
  AmendmentApplicationType,
  ApplicationType,
  ApprovalApplicationType,
  ComplianceConfirmationApplicationType,
  EnvironmentalImpactApplicationType,
  HazardousSubstanceConsentApplicationType,
  HedgerowRemovalNoticeApplicationType,
  LandDrainageConsentApplicationType,
  LDCApplicationType,
  ListedApplicationType,
  NotifyCompletionApplicationType,
  ObligationApplicationType,
  OnshoreExtractionOilAndGasApplicationType,
  PAApplicationType,
  PPApplicationType,
  PrimaryApplicationType,
  RightsOfWayOrderApplicationType,
  WTTApplicationType,
} from "digital-planning-data-schemas/types/schemas/prototypeApplication/enums/ApplicationType.ts";
import type { ApplicationStatus } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/ApplicationStatus.ts";
import type { ProcessStage } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/ProcessStage.ts";
import {
  getApplicationDprDecisionSummary,
  getApplicationDprStatusSummary,
  getPrimaryApplicationTypeKey,
  validApplicationTypes,
} from "@/lib/planningApplication";
import planningPermissionFullHouseholderPrototype from "digital-planning-data-schemas/examples/prototypeApplication/planningPermission/fullHouseholder.json";
import priorApprovalLargerExtensionPrototype from "digital-planning-data-schemas/examples/prototypeApplication/priorApproval/largerExtension.json";
import lawfulDevelopmentCertificateProposedPrototype from "digital-planning-data-schemas/examples/prototypeApplication/lawfulDevelopmentCertificate/proposed.json";
import type { PrototypeApplication } from "digital-planning-data-schemas/types/schemas/prototypeApplication/index.ts";
import type { PriorApprovalAssessment } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/Assessment.ts";
import type { PostSubmissionMetadata } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/Metadata.ts";
import type { PostSubmissionPublishedApplication } from "digital-planning-data-schemas/types/schemas/postSubmissionPublishedApplication/index.ts";
import type { AppealDecision } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/AppealDecision.ts";
import type {
  Agent,
  BaseApplicant,
} from "digital-planning-data-schemas/types/schemas/prototypeApplication/data/Applicant.ts";
import type { CaseOfficerBase } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/CaseOfficer.ts";
import { COMMENT_PUBLIC_TOPIC_OPTIONS } from "@/lib/comments";
import type {
  PublicComment,
  TopicAndComments,
} from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/PublicComment.ts";
import type { CommentSentiment } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/CommentSentiment.ts";

type PossibleDates = {
  application: {
    withdrawnAt: Dayjs;
  };
  submission: {
    submittedAt: Dayjs;
  };
  validation: {
    receivedAt: Dayjs;
    validatedAt: Dayjs;
  };
  publishedAt: Dayjs;
  consultation: {
    startAt: Dayjs;
    endAt: Dayjs;
  };
  assessment: {
    expiryAt: Dayjs;
    planningOfficerDecisionAt: Dayjs;
    committeeSentAt: Dayjs;
    committeeDecisionAt: Dayjs;
  };
  appeal: {
    lodgedAt: Dayjs;
    validatedAt: Dayjs;
    startedAt: Dayjs;
    decidedAt: Dayjs;
    withdrawnAt: Dayjs;
  };
  generatedAt: Dayjs;
};

export const generateAllPossibleDates = (
  consultationInProgress: boolean = false,
): PossibleDates => {
  let startDate = faker.date.past({
    years: 10,
    refDate: dayjs().subtract(2, "year").toDate(),
  });
  if (consultationInProgress) {
    startDate = dayjs()
      .subtract(1, "day")
      .subtract(200, "millisecond")
      .toDate();
  }

  // an application is submitted and some point in the last 10 years
  const submittedAt = dayjs(startDate);

  // application received by back office system a few ms later because maybe theres latency
  const receivedAt = dayjs(submittedAt).add(200, "millisecond");

  // application validated in back office system the next day
  const validatedAt = dayjs(receivedAt).add(1, "day");

  // when its validated the reviewer sets it to be published (not always at this stage but it will be for these examples)
  const publishedAt = dayjs(validatedAt).add(200, "millisecond");

  // consultation (depending on application type) starts once it's valid and lasts 21 days (theres more nuance around business days etc but this is accurate enough)
  // startDate - as soon as validated
  const consultationStartAt = validatedAt;
  const consultationEndAt = consultationStartAt.add(21, "day");

  // An assessment has an expiry date which is different per application type
  const expiryAt = consultationEndAt.add(1, "month");

  // the council decision is made sometime after the consultation ends
  const planningOfficerDecisionAt = consultationEndAt.add(10, "day");

  // if it's sent to committee it's sent after the planning officers recommendation
  const committeeSentAt = planningOfficerDecisionAt.add(1, "day");

  // after it's sent to the committee the decision is made after that date
  const committeeDecisionAt = committeeSentAt.add(10, "day");

  // an appeal can be lodged within 6 months of determination being made
  // lodgedDate
  const appealLodgedAt = committeeDecisionAt.add(1, "month");

  // appeal is validated
  const appealValidatedAt = dayjs(appealLodgedAt).add(1, "day");

  // appeal starts soon after
  const appealStartedAt = dayjs(appealValidatedAt).add(200, "millisecond");

  // appeal decided
  const appealDecidedAt = dayjs(appealStartedAt).add(5, "day");

  // application can be withdrawn any time between consultationStartAt and planningOfficerDecisionAt
  const withdrawnAt = dayjs(consultationStartAt).add(1, "day");

  // appeal is withdrawn any time between appealLodgedAt and appealDecidedAt
  const appealWithdrawnAt = dayjs(appealLodgedAt).add(1, "day");

  // when the data is generated it is given a generatedAt date,
  // if it was an API this would be the current date and time
  // but if it was a static file this would be the date the file was generated
  // in this case we are using a fixed date for consistency in tests
  const generatedAt = dayjs();

  const dates = {
    application: {
      withdrawnAt: withdrawnAt,
    },
    submission: {
      submittedAt: submittedAt,
    },
    validation: {
      receivedAt: receivedAt,
      validatedAt: validatedAt,
    },
    publishedAt: publishedAt,
    consultation: {
      startAt: consultationStartAt,
      endAt: consultationEndAt,
    },
    assessment: {
      expiryAt: expiryAt,
      planningOfficerDecisionAt: planningOfficerDecisionAt,
      committeeSentAt: committeeSentAt,
      committeeDecisionAt: committeeDecisionAt,
    },
    appeal: {
      lodgedAt: appealLodgedAt,
      validatedAt: appealValidatedAt,
      startedAt: appealStartedAt,
      decidedAt: appealDecidedAt,
      withdrawnAt: appealWithdrawnAt,
    },
    generatedAt: generatedAt,
  };

  return dates;
};

/**
 * Generates a random PublicComment
 *
 * @param numberOfTopics - number of random topics to include
 * @returns a randomly generated PublicComment
 */
export const generatePublicComment = (
  numberOfTopics: number = 1,
): PublicComment => {
  const selectedOptions = faker.helpers.arrayElements(
    COMMENT_PUBLIC_TOPIC_OPTIONS,
    numberOfTopics,
  );

  const topicsAndComments: TopicAndComments[] = selectedOptions.map(
    (option) => ({
      topic: option.value,
      question: option.hint,
      comment: faker.lorem.paragraph({ min: 1, max: 5 }),
    }),
  );

  const sentiment = faker.helpers.arrayElement<CommentSentiment>([
    "objection",
    "neutral",
    "supportive",
  ]);
  const baseComment: PublicComment = {
    id: faker.number.int({ min: 1, max: 1000 }),
    sentiment,
    comment: topicsAndComments,
    author: { name: { singleLine: faker.person.fullName() } },
    metadata: {
      submittedAt: faker.date.past().toISOString(),
      publishedAt: faker.date.past().toISOString(),
      validAt: faker.date.past().toISOString(),
    },
  };
  return baseComment;
};

export const generateProposedAddress: ProposedAddress = {
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  x: 502869.8591151078,
  y: 180333.4537434135,
  title: "House McHouseface Housing",
  source: "Proposed by applicant",
};

export const generateSiteAddress: OSAddress = {
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  x: 493822,
  y: 191603,
  title: fakerEN_GB.location.streetAddress(true),
  source: "Ordnance Survey",
  uprn: "100080482163",
  usrn: "35200844",
  pao: "7",
  street: fakerEN_GB.location.street(),
  town: fakerEN_GB.location.city(),
  postcode: fakerEN_GB.location.zipCode(),
  singleLine: fakerEN_GB.location.streetAddress(true),
};

export const generateBaseApplicant: BaseApplicant = {
  name: {
    title: faker.person.prefix(),
    first: faker.person.firstName(),
    last: faker.person.lastName(),
  },
  email: "REDACTED",
  phone: {
    primary: "REDACTED",
  },
  company: {
    name: faker.company.name(),
  },
  type: faker.helpers.arrayElement([
    "individual",
    "company",
    "charity",
    "public",
    "parishCouncil",
  ]),

  address: {
    line1: fakerEN_GB.location.street(),
    town: fakerEN_GB.location.city(),
    postcode: fakerEN_GB.location.zipCode(),
    country: fakerEN_GB.location.country(),
    sameAsSiteAddress: false,
  },
  siteContact: {
    role: "other",
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    phone: fakerEN_GB.phone.number(),
  },
};

export const generateAgent: Agent = {
  ...generateBaseApplicant,
  agent: {
    name: {
      title: faker.person.prefix(),
      first: faker.person.firstName(),
      last: faker.person.lastName(),
    },
    email: "REDACTED",
    phone: {
      primary: "REDACTED",
    },
    company: {
      name: faker.company.name(),
    },
    address: {
      line1: fakerEN_GB.location.street(),
      town: fakerEN_GB.location.city(),
      postcode: fakerEN_GB.location.zipCode(),
      country: fakerEN_GB.location.country(),
    },
  },
};

export const generateCaseOfficer: CaseOfficerBase = {
  name: `${faker.person.firstName()} ${faker.person.lastName()}`,
};

export const generateMetadata = (
  dates?: PossibleDates,
): PostSubmissionMetadata => {
  if (!dates) {
    dates = generateAllPossibleDates();
  }
  const metadata: PostSubmissionMetadata = {
    organisation: "BOPS",
    id: "1234",
    generatedAt: dates.generatedAt.toISOString(),
    submittedAt: dates.submission.submittedAt.toISOString(),
    schema: `https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/postSubmissionApplication.json`,
  };
  return metadata;
};

const getApplicationStagesByType = (
  applicationType: ApplicationType,
): ProcessStage[] => {
  const validStages = new Set<ProcessStage>([
    "submission",
    "validation",
    "consultation",
    "assessment",
    "appeal",
    // "highCourtAppeal",
  ]);

  if (applicationType === "ldc") {
    validStages.delete("consultation");
  }

  return Array.from(validStages);
};

const getApplicationStatesByStage = (
  applicationStage: ProcessStage,
): ApplicationStatus[] => {
  switch (applicationStage) {
    case "submission":
      return ["undetermined"];
    case "validation":
      return ["returned", "undetermined"];
    case "consultation":
      return ["withdrawn", "undetermined"];
    case "assessment":
      return ["withdrawn", "undetermined", "determined"];
    case "appeal":
      return ["determined"];
    case "highCourtAppeal":
      return ["determined"];
  }
};

const applicationTypesWithNoConsultation = ["ldc"];

const applicationTypesWithCommentsAcceptedUntilDecision = ["ldc"];

export const generateDprApplication = ({
  applicationType,
  applicationStage,
  applicationStatus,
  customStatus,
}: {
  applicationType?: ApplicationType;
  applicationStage?: ProcessStage;
  applicationStatus?: ApplicationStatus;
  customStatus?:
    | "consultationInProgress"
    | "assessmentInProgress"
    | "assessmentCouncilDetermined"
    | "assessmentInCommittee"
    | "assessmentCommitteeDetermined"
    | "appealLodged"
    | "appealValidated"
    | "appealStarted"
    | "appealDetermined"
    | "appealDeterminedWithdrawn"
    | "appealDeterminedAllowed"
    | "appealDeterminedDismissed"
    | "appealDeterminedSplitDecision"
    | "withdrawn";
} = {}): DprApplication => {
  switch (customStatus) {
    case "consultationInProgress":
      applicationStage = "consultation";
      applicationStatus = "undetermined";
      break;
    case "assessmentInProgress":
    case "assessmentInCommittee":
      applicationStage = "assessment";
      applicationStatus = "undetermined";
      break;
    case "assessmentCouncilDetermined":
    case "assessmentCommitteeDetermined":
      applicationStage = "assessment";
      applicationStatus = "determined";
      break;
    case "appealLodged":
    case "appealValidated":
    case "appealStarted":
    case "appealDetermined":
    case "appealDeterminedWithdrawn":
    case "appealDeterminedAllowed":
    case "appealDeterminedDismissed":
    case "appealDeterminedSplitDecision":
      applicationStage = "appeal";
      applicationStatus = "determined";
      break;
    case "withdrawn":
      applicationStage = "assessment";
      applicationStatus = "withdrawn";
      break;
  }

  let appealDecision = faker.helpers.arrayElement<AppealDecision>([
    "allowed",
    "dismissed",
    "splitDecision",
    "withdrawn",
  ]);
  switch (customStatus) {
    case "appealDeterminedWithdrawn":
      appealDecision = "withdrawn";
      break;
    case "appealDeterminedAllowed":
      appealDecision = "allowed";
      break;
    case "appealDeterminedDismissed":
      appealDecision = "dismissed";
      break;
    case "appealDeterminedSplitDecision":
      appealDecision = "splitDecision";
      break;
  }

  const dates = generateAllPossibleDates(
    applicationStage === "consultation" && applicationStatus === "undetermined",
  );

  if (!applicationType) {
    const applicationTypes = Object.values(validApplicationTypes).flat();
    applicationType = faker.helpers.arrayElement(applicationTypes);
  }
  const primaryApplicationType = getPrimaryApplicationTypeKey(
    applicationType,
  ) as PrimaryApplicationType;
  if (!primaryApplicationType) {
    throw new Error(
      `Unable to find primary application type fo ${applicationType}`,
    );
  }

  const applicationStages = getApplicationStagesByType(applicationType);

  if (!applicationStage) {
    applicationStage = faker.helpers.arrayElement(applicationStages);
  } else {
    if (!applicationStages.includes(applicationStage)) {
      throw new Error(
        `Invalid application stage for application type ${applicationType}`,
      );
    }
  }

  const applicationStates = getApplicationStatesByStage(applicationStage);

  if (!applicationStatus) {
    applicationStatus = faker.helpers.arrayElement(applicationStates);
  } else {
    if (!applicationStates.includes(applicationStatus)) {
      throw new Error(
        `Invalid application status for application type ${applicationType} in stage ${applicationStage}`,
      );
    }
  }

  // determine the submission part - copied from ODP examples
  let submission: PrototypeApplication =
    planningPermissionFullHouseholderPrototype;
  switch (primaryApplicationType) {
    case "pp":
      submission = planningPermissionFullHouseholderPrototype;
      break;
    case "pa":
      submission = priorApprovalLargerExtensionPrototype;
      break;
    case "ldc":
      submission = lawfulDevelopmentCertificateProposedPrototype;
      break;
  }

  const metadata = generateMetadata(dates);

  submission.metadata = {
    ...submission.metadata,
    submittedAt: dates.submission.submittedAt.toISOString(),
  };

  // there is no such thing as a 'valid' stage in this schema
  if (applicationStage === "validation" && applicationStatus !== "returned") {
    throw new Error(
      `Invalid application stage (${applicationStage}) and status (${applicationStatus}) - validated applications go straight to consultation or assessment`,
    );
  }

  // certain application types don't have consultation stage
  if (
    applicationStage === "consultation" &&
    applicationTypesWithNoConsultation.includes(primaryApplicationType)
  ) {
    throw new Error(
      `Invalid application stage (${applicationStage}) for application type ${primaryApplicationType} - this application type does not have a consultation stage`,
    );
  }

  // applicationType musst be XApplicationType not ApplicationType for the data object to behave
  switch (primaryApplicationType) {
    case "advertConsent":
      applicationType = applicationType as AdvertConsentApplicationType;
    case "amendment":
      applicationType = applicationType as AmendmentApplicationType;
    case "approval":
      applicationType = applicationType as ApprovalApplicationType;
    case "complianceConfirmation":
      applicationType =
        applicationType as ComplianceConfirmationApplicationType;
    case "environmentalImpact":
      applicationType = applicationType as EnvironmentalImpactApplicationType;
    case "hazardousSubstanceConsent":
      applicationType =
        applicationType as HazardousSubstanceConsentApplicationType;
    case "hedgerowRemovalNotice":
      applicationType = applicationType as HedgerowRemovalNoticeApplicationType;
    case "landDrainageConsent":
      applicationType = applicationType as LandDrainageConsentApplicationType;
    case "ldc":
      applicationType = applicationType as LDCApplicationType;
    case "listed":
      applicationType = applicationType as ListedApplicationType;
    case "notifyCompletion":
      applicationType = applicationType as NotifyCompletionApplicationType;
    case "obligation":
      applicationType = applicationType as ObligationApplicationType;
    case "onshoreExtractionOilAndGas":
      applicationType =
        applicationType as OnshoreExtractionOilAndGasApplicationType;
    case "pa":
      applicationType = applicationType as PAApplicationType;
    case "pp":
      applicationType = applicationType as PPApplicationType;
    case "rightsOfWayOrder":
      applicationType = applicationType as RightsOfWayOrderApplicationType;
    case "wtt":
      applicationType = applicationType as WTTApplicationType;
  }

  // create the basics of all stages and manage further below
  const data: PostSubmissionPublishedApplication = {
    applicationType: applicationType,
    data: {
      application: {
        reference: generateReference(),
        stage: applicationStage,
        status: applicationStatus,
        publishedAt: dates.publishedAt.toISOString(),
        // see below for withdrawnAt and withdrawnReason being added
      },
      localPlanningAuthority: {
        publicCommentsAcceptedUntilDecision: false,
      },
      submission: {
        submittedAt: dates.submission.submittedAt.toISOString(),
      },
      validation: {
        receivedAt: dates.validation.receivedAt.toISOString(),
        validatedAt: dates.validation.validatedAt.toISOString(),
        isValid: true,
      },
      consultation: {
        startDate: dates.consultation.startAt.format("YYYY-MM-DD"),
        endDate: dates.consultation.endAt.format("YYYY-MM-DD"),
        siteNotice: true,
      },
      assessment: {
        expiryDate: dates.assessment.expiryAt.format("YYYY-MM-DD"),
        planningOfficerDecision: faker.helpers.arrayElement([
          "granted",
          "refused",
        ]),
        planningOfficerDecisionDate:
          dates.assessment.planningOfficerDecisionAt.format("YYYY-MM-DD"),
        decisionNotice: {
          url: "https://planningregister.org",
        },
      },
      appeal: {
        lodgedDate: dates.appeal.lodgedAt.format("YYYY-MM-DD"),
        reason:
          "We don't believe the council took into consideration the environmental impact alleviation approach during their assessment.",
        validatedDate: dates.appeal.validatedAt.format("YYYY-MM-DD"),
        startedDate: dates.appeal.startedAt.format("YYYY-MM-DD"),
        decisionDate: dates.appeal.decidedAt.format("YYYY-MM-DD"),
        decision: appealDecision,
      },
      caseOfficer: {
        name: "Casey Officer",
      },
    },
    submission,
    metadata: metadata,
  };

  // This mocks camden allowing comments until a decision is made for certain application types
  if (
    applicationTypesWithCommentsAcceptedUntilDecision.includes(
      primaryApplicationType,
    )
  ) {
    data.data.localPlanningAuthority.publicCommentsAcceptedUntilDecision = true;
  }

  // manage priorApprovalRequired field for prior approvals
  if (primaryApplicationType === "pa") {
    // 'Prior approval required and approved', 'Prior approval not required', 'Prior approval required and refused'
    data.data.assessment = {
      ...data.data.assessment,
      priorApprovalRequired: faker.datatype.boolean(),
    } as PriorApprovalAssessment;
  }

  // manage the data added at each stage and the states within them
  if (applicationStage === "submission") {
    const { validation, consultation, assessment, appeal, ...rest } = data.data;
    data.data = rest;
  }
  if (applicationStage === "validation") {
    const { consultation, assessment, appeal, ...rest } = data.data;
    data.data = rest;

    if (applicationStatus === "returned" && data.data.validation) {
      data.data.validation.isValid = false;
    }
  }
  if (applicationStage === "consultation") {
    const { assessment, appeal, ...rest } = data.data;
    data.data = rest;
  }
  if (applicationStage === "assessment") {
    const { appeal, ...rest } = data.data;
    data.data = rest;

    if (
      applicationStatus === "undetermined" ||
      applicationStatus === "withdrawn"
    ) {
      const { assessment, ...rest } = data.data;
      data.data = {
        ...rest,
        assessment: {
          expiryDate: dates.assessment.expiryAt.format("YYYY-MM-DD"),
        },
      };
    }
  }

  // make sure theres no consultation section for those that don't have it
  if (applicationTypesWithNoConsultation.includes(primaryApplicationType)) {
    const { consultation, ...rest } = data.data;
    data.data = rest;
  }

  // manage the withdrawn state

  if (applicationStatus === "withdrawn") {
    data.data.application = {
      ...data.data.application,
      withdrawnAt: dates.application.withdrawnAt.toISOString(),
      withdrawnReason: "Applicant has decided to withdraw the application.",
    };
  }

  // manage specific names we give our examples

  // only get in committee if we request it using customStatus
  if (customStatus === "assessmentInCommittee") {
    data.data.assessment = {
      expiryDate: dates.assessment.expiryAt.format("YYYY-MM-DD"),
      planningOfficerRecommendation: faker.helpers.arrayElement([
        "granted",
        "refused",
      ]),
      committeeSentDate: dates.assessment.committeeSentAt.format("YYYY-MM-DD"),
    };
  }

  // only get in committee determined if we request it using customStatus
  if (customStatus === "assessmentCommitteeDetermined") {
    data.data.assessment = {
      expiryDate: dates.assessment.expiryAt.format("YYYY-MM-DD"),
      planningOfficerRecommendation: faker.helpers.arrayElement([
        "granted",
        "refused",
      ]),
      committeeSentDate: dates.assessment.committeeSentAt.format("YYYY-MM-DD"),
      committeeDecision: faker.helpers.arrayElement(["granted", "refused"]),
      committeeDecisionDate:
        dates.assessment.committeeDecisionAt.format("YYYY-MM-DD"),
      decisionNotice: {
        url: "https://planningregister.org",
      },
    };
  }

  // only get appealLodged if we request it using dprStatus
  if (customStatus === "appealLodged") {
    data.data.appeal = {
      lodgedDate: dates.appeal.lodgedAt.format("YYYY-MM-DD"),
      reason:
        "We don't believe the council took into consideration the environmental impact alleviation approach during their assessment.",
    };
  }

  // only get appealValidated if we request it using customStatus

  if (customStatus === "appealValidated") {
    data.data.appeal = {
      lodgedDate: dates.appeal.lodgedAt.format("YYYY-MM-DD"),
      reason:
        "We don't believe the council took into consideration the environmental impact alleviation approach during their assessment.",
      validatedDate: dates.appeal.validatedAt.format("YYYY-MM-DD"),
    };
  }

  // only get appealStarted if we request it using customStatus

  if (customStatus === "appealStarted") {
    data.data.appeal = {
      lodgedDate: dates.appeal.lodgedAt.format("YYYY-MM-DD"),
      reason:
        "We don't believe the council took into consideration the environmental impact alleviation approach during their assessment.",
      validatedDate: dates.appeal.validatedAt.format("YYYY-MM-DD"),
      startedDate: dates.appeal.startedAt.format("YYYY-MM-DD"),
    };
  }

  // only get appealWithdrawn if we request it using customStatus

  if (
    customStatus &&
    [
      "appealDetermined",
      "appealDeterminedWithdrawn",
      "appealDeterminedAllowed",
      "appealDeterminedDismissed",
      "appealDeterminedSplitDecision",
    ].includes(customStatus)
  ) {
    data.data.appeal = {
      lodgedDate: dates.appeal.lodgedAt.format("YYYY-MM-DD"),
      validatedDate: dates.appeal.validatedAt.format("YYYY-MM-DD"),
      startedDate: dates.appeal.startedAt.format("YYYY-MM-DD"),
      reason:
        "We don't believe the council took into consideration the environmental impact alleviation approach during their assessment.",
      decisionDate: dates.appeal.decidedAt.format("YYYY-MM-DD"),
      decision: appealDecision,
    };
  }

  const applicationDecisionSummary = getApplicationDprDecisionSummary(data);
  const applicationStatusSummary = getApplicationDprStatusSummary(data);
  // ensure application is DprApplication
  const application: DprApplication = {
    applicationStatusSummary,
    applicationDecisionSummary,
    ...data,
  } as DprApplication;
  // the above assures TypeScript to trust that the object matches the DprApplication type - so it doesn't double check for us!
  // @todo remove this when we're no longer using DprComment, DprDocument etc

  return application;
};

/**
 * Set of examples of standard applications using the  generateDprApplication method
 * @returns
 */
export const generateExampleApplications = (
  applicationType: ApplicationType = "pp.full.householder",
): Record<string, DprApplication> => {
  // 01-submission
  const submission = generateDprApplication({
    applicationType: applicationType,
    applicationStage: "submission",
  });

  // 02-validation-01-invalid
  const returned = generateDprApplication({
    applicationType: applicationType,
    applicationStage: "validation",
    applicationStatus: "returned",
  });

  // 03-consultation
  const consultation = generateDprApplication({
    applicationType: applicationType,
    customStatus: "consultationInProgress",
  });

  // 04-assessment-00-assessment-in-progress
  const assessmentInProgress = generateDprApplication({
    applicationType: applicationType,
    customStatus: "assessmentInProgress",
  });

  // 04-assessment-01-council-determined
  const planningOfficerDetermined = generateDprApplication({
    applicationType: applicationType,
    customStatus: "assessmentCouncilDetermined",
  });

  // 04-assessment-02-assessment-in-committee
  const assessmentInCommittee = generateDprApplication({
    applicationType: applicationType,
    customStatus: "assessmentInCommittee",
  });

  // 04-assessment-03-committee-determined
  const committeeDetermined = generateDprApplication({
    applicationType: applicationType,
    customStatus: "assessmentCommitteeDetermined",
  });

  // 05-appeal-00-appeal-lodged
  const appealLodged = generateDprApplication({
    applicationType: applicationType,
    customStatus: "appealLodged",
  });

  // 05-appeal-01-appeal-validated
  const appealValid = generateDprApplication({
    applicationType: applicationType,
    customStatus: "appealValidated",
  });

  // 05-appeal-02-appeal-started
  const appealStarted = generateDprApplication({
    applicationType: applicationType,
    customStatus: "appealStarted",
  });

  // 05-appeal-03-appeal-determined
  const appealDetermined = generateDprApplication({
    applicationType: applicationType,
    customStatus: "appealDetermined",
  });
  const appealDeterminedWithdrawn = generateDprApplication({
    applicationType: applicationType,
    customStatus: "appealDeterminedWithdrawn",
  });
  const appealDeterminedAllowed = generateDprApplication({
    applicationType: applicationType,
    customStatus: "appealDeterminedAllowed",
  });
  const appealDeterminedDismissed = generateDprApplication({
    applicationType: applicationType,
    customStatus: "appealDeterminedDismissed",
  });
  const appealDeterminedSplitDecision = generateDprApplication({
    applicationType: applicationType,
    customStatus: "appealDeterminedSplitDecision",
  });

  // 06-assessment-withdrawn
  const withdrawn = generateDprApplication({
    applicationType: applicationType,
    customStatus: "withdrawn",
  });

  return {
    submission,
    returned,
    consultation,
    assessmentInProgress,
    planningOfficerDetermined,
    assessmentInCommittee,
    committeeDetermined,
    appealLodged,
    appealValid,
    appealStarted,
    appealDetermined,
    appealDeterminedWithdrawn,
    appealDeterminedAllowed,
    appealDeterminedDismissed,
    appealDeterminedSplitDecision,
    withdrawn,
    // closed,
  };
};
