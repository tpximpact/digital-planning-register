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

/**
 * This file contains libs relating to application types
 */

import { DprContentPage, DprPlanningApplication } from "@/types";
import type { PrimaryApplicationType } from "digital-planning-data-schemas/types/schemas/prototypeApplication/enums/ApplicationType.ts";
import type * as PostSubmissionPublishedTypes from "digital-planning-data-schemas/types/schemas/postSubmissionPublishedApplication/index.js";
import { slugify } from "@/util";

/**
 * pp.part1.classA = pp = Planning Permission
 * Maps the primary application type eg the pp in pp.part1.classA to its display title eg Planning Permission
 * @TODO should this be moved to the schema or is this unique enough to the DPR?
 * https://github.com/theopensystemslab/digital-planning-data-schemas/blob/main/types/schemas/prototypeApplication/enums/ApplicationType.ts
 */
const primaryApplicationTypeTitles: Record<PrimaryApplicationType, string> = {
  advertConsent: "Advertisement consent",
  amendment: "Amendment",
  approval: "Approval",
  complianceConfirmation: "Compliance Confirmation",
  environmentalImpact: "Environmental impact",
  hazardousSubstanceConsent: "Hazardous substance consent",
  hedgerowRemovalNotice: "Hedgerow removal notice",
  landDrainageConsent: "Land drainage consent",
  ldc: "Lawful development certificate",
  listed: "Listed building consent",
  notifyCompletion: "Notification of completion",
  obligation: "Planning obligation",
  onshoreExtractionOilAndGas: "Onshore extraction of oil and gas",
  pa: "Prior approval",
  pp: "Planning permission",
  rightsOfWayOrder: "Rights of way order",
  wtt: "Works to trees",
};

/**
 * Utility class that checks if a value is a valid PrimaryApplicationType
 * @param value
 * @returns
 */
export const isValidPrimaryApplicationType = (
  value: string,
): value is PrimaryApplicationType => {
  return Object.keys(primaryApplicationTypeTitles).includes(value);
};

/**
 * pa.part1.classA = pa
 * Utility class that returns the key for the primary application type eg the pp in pp.part1.classA
 * @param applicationType
 * @returns
 */
export const getPrimaryApplicationTypeKey = (
  applicationType: DprPlanningApplication["applicationType"],
): string | undefined => {
  if (!applicationType) {
    return undefined;
  }
  const type = applicationType.split(".")[0];
  if (type && isValidPrimaryApplicationType(type)) {
    return type || undefined;
  }
};

/**
 *
 * pa.part1.classA = Prior approval
 * Utility class that takes an application type eg pa.part1.classA and returns the primary title for it eg Planning Application
 * @param applicationType
 * @returns
 */
export const getPrimaryApplicationType = (
  applicationType: DprPlanningApplication["applicationType"],
): string | undefined => {
  const type = getPrimaryApplicationTypeKey(applicationType);
  if (type && isValidPrimaryApplicationType(type)) {
    return primaryApplicationTypeTitles[type] || undefined;
  }
  return undefined;
};

/**
 * Takes an application type eg pa.part1.classA and returns the corresponding title for it in applicationTypes
 * Right now this needs some manual intervention to map to contentApplicationTypes but
 * we should be able todo #<primaryApplicationType> and delete this method
 * when everything is in sync again
 * @TODO update the help page to reflect the application types
 * @param applicationType
 * @returns
 */
export const getDocumentedApplicationType = (
  applicationType: DprPlanningApplication["applicationType"],
) => {
  const type = getPrimaryApplicationTypeKey(applicationType);

  // Approval of reserved matters
  if (applicationType === "approval.reservedMatters") {
    return "Approval of reserved matters";
  }

  if (type === "pp") {
    const ppType = applicationType.split(".")[1];
    // Full planning permission
    if (ppType === "full") {
      const ppSubType = applicationType.split(".")[2];

      // Minor and changes of use
      if (ppSubType === "minor") {
        return "Minor and changes of use";
      }
      // Major
      if (ppSubType === "major") {
        return "Major";
      }
      // Householder planning application
      if (ppSubType === "householder") {
        return "Householder planning application";
      }

      return "Full planning permission";
    }

    // Outline planning permission
    if (ppType === "outline") {
      return "Outline planning permission";
    }
  }

  if (type && isValidPrimaryApplicationType(type)) {
    const primaryApplicationTypeToContentApplicationType: Record<
      PrimaryApplicationType,
      string | undefined
    > = {
      // no appropriate content for these yet
      amendment: undefined,
      approval: undefined,
      complianceConfirmation: undefined,
      listed: undefined,
      obligation: undefined,

      // Non-planning consents
      advertConsent: "Non-planning consents",
      environmentalImpact: "Non-planning consents",
      hazardousSubstanceConsent: "Non-planning consents",
      hedgerowRemovalNotice: "Non-planning consents",
      landDrainageConsent: "Non-planning consents",
      notifyCompletion: "Non-planning consents",
      onshoreExtractionOilAndGas: "Non-planning consents",
      rightsOfWayOrder: "Non-planning consents",
      wtt: "Non-planning consents",

      // Lawful development certificate
      ldc: "Lawful development certificate",

      // Prior approval
      pa: "Prior approval",

      // See above for Planning permission
      pp: undefined,
    };
    return primaryApplicationTypeToContentApplicationType[type] || undefined;
  }
  return undefined;
};

export const contentApplicationTypes = (): DprContentPage[] => {
  return [
    {
      key: slugify("Householder"),
      title: "Householder",
      content: (
        <>
          <p className="govuk-body">
            Applying for planning permission to make changes to a single house.
            This does not include works to flats.
          </p>
        </>
      ),
    },
    {
      key: slugify("Full planning permission"),
      title: "Full planning permission",
      content: (
        <>
          <p className="govuk-body">
            This is the most common type of planning application. This type can
            be a wide range of different proposals. Most applications are
            covered by two kinds of full planning permission.
          </p>
        </>
      ),
      children: [
        {
          key: slugify("Minor changes of use"),
          title: "Minor changes of use",
          content: (
            <>
              <p className="govuk-body">Applying for planning permission to:</p>
              <ul className="govuk-list govuk-list--bullet">
                <li>extend or alter flats or non-residential property</li>
                <li>change the use of a property</li>
                <li>
                  get permission to construct small buildings, either
                  residential or non-residential
                </li>
              </ul>
            </>
          ),
        },
        {
          key: slugify("Major"),
          title: "Major",
          content: (
            <>
              <p className="govuk-body">
                Applying for planning permission to significantly extend
                buildings, or to construct large buildings. These can be
                residential or non-residential.
              </p>
            </>
          ),
        },
      ],
    },
    {
      key: slugify("Outline planning permission"),
      title: "Outline planning permission",
      content: (
        <>
          <p className="govuk-body">
            Assesses whether the nature of a development is acceptable, saving
            the details for future applications.
          </p>
        </>
      ),
    },
    {
      key: slugify("Lawful development certificate"),
      title: "Lawful development certificate",
      content: (
        <>
          <p className="govuk-body">
            Applying for a certificate which verifies that something being
            proposed, or which has already been built, is lawful.
          </p>
          <p className="govuk-body">
            For existing buildings or changes to buildings, this certificate can
            be applied for retrospectively, and there are many ways that
            something can be deemed lawful in this situation.
          </p>
        </>
      ),
    },
    {
      key: slugify("Prior approval"),
      title: "Prior approval",
      content: (
        <>
          <p className="govuk-body">
            This checks whether the proposal is considered &lsquo;permitted
            development&rsquo; according to national legislation. If the
            proposal does not receive or is not eligible for prior approval, a
            planning application needs to be submitted. If the proposal is
            considered &lsquo;permitted development&rsquo; it can be done
            without further planning applications.
          </p>
          <p className="govuk-body">
            This covers a wide range of changes or additions to buildings,
            including:
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>certain changes of use</li>
            <li>extensions to buildings</li>
            <li>non-domestic solar panels</li>
            <li>certain demolitions</li>
          </ul>
          <p className="govuk-body">
            You can find out what is eligible for permitted development by
            reading{" "}
            <a
              className="govuk-link"
              href="https://www.gov.uk/guidance/when-is-permission-required#What-are-permitted-development-rights"
              target="_blank"
            >
              the gov.uk guidance on planning.
            </a>
          </p>
        </>
      ),
    },
    {
      key: slugify("Approval of reserved matters"),
      title: "Approval of reserved matters",
      content: (
        <>
          <p className="govuk-body">
            An application for reserved matters provides details of a
            development that has been agreed in principle through outline
            planning permission. The level of details are similar to a full
            planning application.
          </p>
        </>
      ),
    },
    {
      key: slugify("Non-planning consents"),
      title: "Non-planning consents",
      content: (
        <>
          <p className="govuk-body">
            These kinds of applications cover things such as getting consent for
            advertisements, making changes to protected trees, or dealing with
            hazardous substances. The description of these application types
            will provide more information about them.
          </p>
        </>
      ),
    },
  ];
};

/**
 * List of valid application types based on ApplicationType
 */
export const validApplicationTypes: Record<
  PrimaryApplicationType,
  DprPlanningApplication["applicationType"][]
> = {
  advertConsent: ["advertConsent"],
  amendment: ["amendment", "amendment.minorMaterial", "amendment.nonMaterial"],
  approval: ["approval", "approval.conditions", "approval.reservedMatters"],
  complianceConfirmation: ["complianceConfirmation"],
  environmentalImpact: [
    "environmentalImpact",
    "environmentalImpact.scoping",
    "environmentalImpact.screening",
  ],
  hazardousSubstanceConsent: ["hazardousSubstanceConsent"],
  hedgerowRemovalNotice: ["hedgerowRemovalNotice"],
  landDrainageConsent: ["landDrainageConsent"],
  ldc: [
    "ldc",
    "ldc.breachOfCondition",
    "ldc.existing",
    "ldc.listedBuildingWorks",
    "ldc.proposed",
  ],
  listed: ["listed"],
  notifyCompletion: ["notifyCompletion"],
  obligation: ["obligation", "obligation.discharge", "obligation.modify"],
  onshoreExtractionOilAndGas: [
    "onshoreExtractionOilAndGas",
    "onshoreExtractionOilAndGas.other",
    "onshoreExtractionOilAndGas.pp.extension",
    "onshoreExtractionOilAndGas.pp.waste",
    "onshoreExtractionOilAndGas.pp.working",
    "onshoreExtractionOilAndGas.review",
    "onshoreExtractionOilAndGas.variation",
  ],
  pa: [
    "pa",
    "pa.part1.classA",
    "pa.part1.classAA",
    "pa.part3.classG",
    "pa.part3.classM",
    "pa.part3.classMA",
    "pa.part3.classN",
    "pa.part3.classQ",
    "pa.part3.classR",
    "pa.part3.classS",
    "pa.part3.classT",
    "pa.part3.classV",
    "pa.part4.classBB",
    "pa.part4.classBC",
    "pa.part4.classCA",
    "pa.part4.classE",
    "pa.part6",
    "pa.part6.classA",
    "pa.part6.classB",
    "pa.part6.classE",
    "pa.part7.classC",
    "pa.part7.classM",
    "pa.part9.classD",
    "pa.part11.classB",
    "pa.part14.classA",
    "pa.part14.classB",
    "pa.part14.classJ",
    "pa.part14.classK",
    "pa.part14.classOA",
    "pa.part16.classA",
    "pa.part17",
    "pa.part17.classB",
    "pa.part17.classC",
    "pa.part17.classG",
    "pa.part18.classA",
    "pa.part19.classTA",
    "pa.part20.classA",
    "pa.part20.classAA",
    "pa.part20.classAB",
    "pa.part20.classAC",
    "pa.part20.classAD",
    "pa.part20.classZA",
  ],
  pp: [
    "pp",
    "pp.full",
    "pp.full.advertConsent",
    "pp.full.demolition",
    "pp.full.fastTrack.affordable",
    "pp.full.householder",
    "pp.full.householder.listed",
    "pp.full.householder.retro",
    "pp.full.major",
    "pp.full.major.technicalDetails",
    "pp.full.major.technicalDetails.waste",
    "pp.full.major.waste",
    "pp.full.minor",
    "pp.full.minor.listed",
    "pp.full.minor.technicalDetails",
    "pp.mineralExtraction",
    "pp.outline",
    "pp.outline.all",
    "pp.outline.some",
    "pp.outline.minor",
    "pp.outline.minor.all",
    "pp.outline.minor.some",
    "pp.outline.major",
    "pp.outline.major.all",
    "pp.outline.major.all.waste",
    "pp.outline.major.some",
    "pp.outline.major.some.waste",
    "pp.pip",
  ],
  rightsOfWayOrder: ["rightsOfWayOrder"],
  wtt: ["wtt", "wtt.consent", "wtt.notice"],
};

/**
 * List of valid primary application types based on PrimaryApplicationType
 */
export const validPrimaryApplicationTypes: PrimaryApplicationType[] = [
  "advertConsent",
  "amendment",
  "approval",
  "complianceConfirmation",
  "environmentalImpact",
  "hazardousSubstanceConsent",
  "hedgerowRemovalNotice",
  "landDrainageConsent",
  "ldc",
  "listed",
  "notifyCompletion",
  "obligation",
  "onshoreExtractionOilAndGas",
  "pa",
  "pp",
  "rightsOfWayOrder",
  "wtt",
];

export const setCorrectApplicationType = (
  applicationType: string,
  application: PostSubmissionPublishedTypes.PostSubmissionPublishedApplication,
) => {
  switch (applicationType) {
    case "advertConsent":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedAdvertConsent;
    case "amendment.minorMaterial":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedAmendmentMinorMaterial;
    case "amendment.nonMaterial":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedAmendmentNonMaterial;
    case "approval.conditions":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedApprovalConditions;
    case "approval.reservedMatters":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedApprovalReservedMatters;
    case "complianceConfirmation":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedComplianceConfirmation;
    case "environmentalImpact.scoping":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedEnvironmentalImpactScoping;
    case "environmentalImpact.screening":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedEnvironmentalImpactScreening;
    case "hazardousSubstanceConsent":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedHazardousSubstanceConsent;
    case "hedgerowRemovalNotice":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedHedgerowRemovalNotice;
    case "landDrainageConsent":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedLandDrainageConsent;
    case "ldc.breachOfCondition":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedLawfulDevelopmentCertificateBreachOfCondition;
    case "ldc.existing":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedLawfulDevelopmentCertificateExisting;
    case "ldc.listedBuildingWorks":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedLawfulDevelopmentCertificateListedBuildingWorks;
    case "ldc.proposed":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedLawfulDevelopmentCertificateProposed;
    case "listed":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedListedBuildingConsent;
    case "notifyCompletion":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedNotifyCompletion;
    case "obligation.discharge":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedObligationDischarge;
    case "obligation.modify":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedObligationModify;
    case "onshoreExtractionOilAndGas.other":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedOnshoreExtractionOilAndGasOther;
    case "onshoreExtractionOilAndGas.pp.extension":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedOnshoreExtractionOilAndGasPlanningPermissionExtension;
    case "onshoreExtractionOilAndGas.pp.waste":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedOnshoreExtractionOilAndGasPlanningPermissionWaste;
    case "onshoreExtractionOilAndGas.pp.working":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedOnshoreExtractionOilAndGasPlanningPermissionWorking;
    case "onshoreExtractionOilAndGas.review":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedOnshoreExtractionOilAndGasReview;
    case "onshoreExtractionOilAndGas.variation":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedOnshoreExtractionOilAndGasVariation;
    case "pa.part1.classA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart1ClassA;
    case "pa.part1.classAA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart1ClassAA;
    case "pa.part3.classG":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart3ClassG;
    case "pa.part3.classM":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart3ClassM;
    case "pa.part3.classMA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart3ClassMA;
    case "pa.part3.classN":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart3ClassN;
    case "pa.part3.classQ":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart3ClassQ;
    case "pa.part3.classR":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart3ClassR;
    case "pa.part3.classS":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart3ClassS;
    case "pa.part3.classT":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart3ClassT;
    case "pa.part3.classV":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart3ClassV;
    case "pa.part4.classBB":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart4ClassBB;
    case "pa.part4.classBC":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart4ClassBC;
    case "pa.part4.classCA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart4ClassCA;
    case "pa.part4.classE":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart4ClassE;
    case "pa.part6":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart6;
    case "pa.part6.classA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart6ClassA;
    case "pa.part6.classB":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart6ClassB;
    case "pa.part6.classE":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart6ClassE;
    case "pa.part7.classC":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart7ClassC;
    case "pa.part7.classM":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart7ClassM;
    case "pa.part9.classD":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart9ClassD;
    case "pa.part11.classB":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart11ClassB;
    case "pa.part14.classA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart14ClassA;
    case "pa.part14.classB":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart14ClassB;
    case "pa.part14.classJ":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart14ClassJ;
    case "pa.part14.classK":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart14ClassK;
    case "pa.part14.classOA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart14ClassOA;
    case "pa.part16.classA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart16ClassA;
    case "pa.part17":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart17;
    case "pa.part17.classB":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart17ClassB;
    case "pa.part17.classC":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart17ClassC;
    case "pa.part17.classG":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart17ClassG;
    case "pa.part18.classA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart18ClassA;
    case "pa.part19.classTA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart19ClassTA;
    case "pa.part20.classA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart20ClassA;
    case "pa.part20.classAA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart20ClassAA;
    case "pa.part20.classAB":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart20ClassAB;
    case "pa.part20.classAC":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart20ClassAC;
    case "pa.part20.classAD":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart20ClassAD;
    case "pa.part20.classZA":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPriorApprovalPart20ClassZA;

    case "pp.full.advertConsent":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullAdvertConsent;
    case "pp.full.demolition":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullDemolition;
    case "pp.full.fastTrack.affordable":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullFastTrackAffordable;
    case "pp.full.householder":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullHouseholder;
    case "pp.full.householder.listed":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullHouseholderListed;
    case "pp.full.householder.retro":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullHouseholderRetrospective;
    case "pp.full.minor":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullMinor;
    case "pp.full.minor.listed":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullMinorListed;
    case "pp.full.minor.technicalDetails":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullMinorTechnicalDetails;
    case "pp.full.major":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullMajor;
    case "pp.full.major.technicalDetails":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullMajorTechnicalDetails;
    case "pp.full.major.technicalDetails.waste":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullMajorTechnicalDetailsWaste;
    case "pp.full.major.waste":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionFullMajorWaste;
    case "pp.mineralExtraction":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionMineralExtraction;
    case "pp.outline":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutline;
    case "pp.outline.all":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutlineAll;
    case "pp.outline.some":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutlineSome;
    case "pp.outline.minor":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutlineMinor;
    case "pp.outline.minor.all":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutlineMinorAll;
    case "pp.outline.minor.some":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutlineMinorSome;
    case "pp.outline.major":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutlineMajor;
    case "pp.outline.major.all":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutlineMajorAll;
    case "pp.outline.major.all.waste":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutlineMajorAllWaste;
    case "pp.outline.major.some":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutlineMajorSome;
    case "pp.outline.major.some.waste":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionOutlineMajorSomeWaste;
    case "pp.pip":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedPlanningPermissionPermissionInPrinciple;
    case "rightsOfWayOrder":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedRightsOfWayOrder;
    case "wtt.consent":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedWorksToTreesConsent;
    case "wtt.notice":
      return application as unknown as PostSubmissionPublishedTypes.PostSubmissionPublishedWorksToTreesNotice;
    default:
      throw new Error(`Unknown application type: ${applicationType}`);
  }
};
