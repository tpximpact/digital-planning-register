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

import {
  DprDocumentOrderBy,
  DprDocumentSortBy,
  SearchParamsDocuments,
  UnknownSearchParams,
} from "@/types";
import { PrototypeFileType } from "@/types/odp-types/schemas/prototypeApplication/enums/FileType";
import { getValueFromUnknownSearchParams } from "./search";
import { AppConfig } from "@/config/types";

// resultsPerPage
export const DOCUMENT_RESULTSPERPAGE_OPTIONS = [10, 25, 50];
export const DOCUMENT_RESULTSPERPAGE_DEFAULT =
  DOCUMENT_RESULTSPERPAGE_OPTIONS[0];

// sortBy
export const DOCUMENT_SORTBY_OPTIONS: DprDocumentSortBy[] = [
  "publishedAt",
  "name",
];
export const DOCUMENT_SORTBY_DEFAULT = DOCUMENT_SORTBY_OPTIONS[0];

// orderBy
export const DOCUMENT_ORDERBY_OPTIONS = ["desc", "asc"];
export const DOCUMENT_ORDERBY_DEFAULT = DOCUMENT_ORDERBY_OPTIONS[0];

// type
// @TODO this should come from ODP repo
export const DOCUMENT_TYPE_OPTIONS: PrototypeFileType[] = [
  "accessRoadsRightsOfWayDetails",
  "advertsDrawings",
  "affordableHousingStatement",
  "arboriculturistReport",
  "bankStatement",
  "basementImpactStatement",
  "bioaerosolAssessment",
  "birdstrikeRiskManagementPlan",
  "boreholeOrTrialPitAnalysis",
  "buildingControlCertificate",
  "conditionSurvey",
  "constructionInvoice",
  "contaminationReport",
  "councilTaxBill",
  "crimePreventionStrategy",
  "designAndAccessStatement",
  "disabilityExemptionEvidence",
  "ecologyReport",
  "elevations.existing",
  "elevations.proposed",
  "emissionsMitigationAndMonitoringScheme",
  "energyStatement",
  "environmentalImpactAssessment",
  "externalMaterialsDetails",
  "fireSafetyReport",
  "floodRiskAssessment",
  "floorPlan.existing",
  "floorPlan.proposed",
  "foulDrainageAssessment",
  "geodiversityAssessment",
  "hedgerowsInformation",
  "hedgerowsInformation.plantingDate",
  "heritageStatement",
  "hydrologicalAssessment",
  "hydrologyReport",
  "internalElevations",
  "internalSections",
  "joinersReport",
  "joinerySections",
  "landContaminationAssessment",
  "landscapeAndVisualImpactAssessment",
  "landscapeStrategy",
  "lightingAssessment",
  "litterVerminAndBirdControlDetails",
  "locationPlan",
  "methodStatement",
  "mineralsAndWasteAssessment",
  "necessaryInformation",
  "newDwellingsSchedule",
  "noiseAssessment",
  "openSpaceAssessment",
  "otherDocument",
  "otherDrawing",
  "otherEvidence",
  "otherSupporting",
  "parkingPlan",
  "photographs.existing",
  "photographs.proposed",
  "planningStatement",
  "recycleWasteStorageDetails",
  "relevantInformation",
  "residentialUnitsDetails",
  "roofPlan.existing",
  "roofPlan.proposed",
  "sections.existing",
  "sections.proposed",
  "sitePlan.existing",
  "sitePlan.proposed",
  "sketchPlan",
  "statementOfCommunityInvolvement",
  "statutoryDeclaration",
  "storageTreatmentAndWasteDisposalDetails",
  "streetScene",
  "subsidenceReport",
  "sunlightAndDaylightReport",
  "sustainabilityStatement",
  "technicalEvidence",
  "technicalSpecification",
  "tenancyAgreement",
  "tenancyInvoice",
  "townCentreImpactAssessment",
  "townCentreSequentialAssessment",
  "transportAssessment",
  "travelPlan",
  "treeAndHedgeLocation",
  "treeAndHedgeRemovedOrPruned",
  "treeCanopyCalculator",
  "treeConditionReport",
  "treesReport",
  "treeSurvey",
  "unitPlan.existing",
  "unitPlan.proposed",
  "usePlan.existing",
  "usePlan.proposed",
  "utilitiesStatement",
  "utilityBill",
  "ventilationStatement",
  "viabilityAppraisal",
  "visualisations",
  "wasteAndRecyclingStrategy",
  "wasteStorageDetails",
  "waterEnvironmentAssessment",
];

export const validateSearchParams = (
  appConfig: AppConfig,
  searchParams?: UnknownSearchParams,
): SearchParamsDocuments => {
  // page
  const validPage = (() => {
    // get the value if it exists
    const pageValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "page")
      : undefined;
    // parse it
    const pageNumber = parseInt(pageValue || "1", 10);
    // if its not a number or less than or equal to 0, return 1
    // otherwise return the number
    return isNaN(pageNumber) || pageNumber <= 0 ? 1 : pageNumber;
  })();

  // resultsPerPage
  const resultsPerPage = (() => {
    if (searchParams?.resultsPerPage) {
      const workingResultsPerPage = getValueFromUnknownSearchParams(
        searchParams,
        "resultsPerPage",
      );
      const parsedResultsPerPage = parseInt(workingResultsPerPage || "", 10);
      if (
        !isNaN(parsedResultsPerPage) &&
        DOCUMENT_RESULTSPERPAGE_OPTIONS.includes(parsedResultsPerPage)
      ) {
        return parsedResultsPerPage;
      }
    }

    return appConfig.defaults.resultsPerPage;
  })();

  // sortBy
  const sortBy: DprDocumentSortBy | undefined = (() => {
    const sortByValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "sortBy")
      : undefined;

    if (
      sortByValue &&
      DOCUMENT_SORTBY_OPTIONS.includes(sortByValue as DprDocumentSortBy)
    ) {
      return sortByValue as DprDocumentSortBy;
    }

    return undefined;
  })();

  // orderBy
  const orderBy: DprDocumentOrderBy | undefined = (() => {
    const orderByValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "orderBy")
      : undefined;

    if (
      orderByValue &&
      DOCUMENT_ORDERBY_OPTIONS.includes(orderByValue as DprDocumentOrderBy)
    ) {
      return orderByValue as DprDocumentOrderBy;
    }

    return undefined;
  })();

  // Ensure name is a string
  const name: string | undefined = searchParams
    ? getValueFromUnknownSearchParams(searchParams, "name")
    : undefined;

  // type
  const type = (() => {
    const type: string | undefined = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "type")
      : undefined;
    const validTopic = DOCUMENT_TYPE_OPTIONS.find((s) => s === type);
    return validTopic ? validTopic : undefined;
  })();

  // publishedAtFrom publishedAtTo
  const { publishedAtFrom, publishedAtTo } = (() => {
    const publishedAtFrom = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "publishedAtFrom")
      : undefined;
    const publishedAtTo = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "publishedAtTo")
      : undefined;

    // Helper function to validate YYYY-MM-DD format
    const isValidDate = (date: string | undefined): boolean => {
      return !!date && /^\d{4}-\d{2}-\d{2}$/.test(date);
    };

    // Validate both dates
    const isFromValid = isValidDate(publishedAtFrom);
    const isToValid = isValidDate(publishedAtTo);

    // If both are valid, ensure they are in the correct order
    if (isFromValid && isToValid) {
      const fromDate = new Date(publishedAtFrom!);
      const toDate = new Date(publishedAtTo!);

      if (fromDate <= toDate) {
        return { publishedAtFrom, publishedAtTo };
      } else {
        // If out of order, return undefined for both
        return { publishedAtFrom: undefined, publishedAtTo: undefined };
      }
    }

    // If only one is valid, set both to the same value
    if (isFromValid) {
      return { publishedAtFrom, publishedAtTo: publishedAtFrom };
    }
    if (isToValid) {
      return { publishedAtFrom: publishedAtTo, publishedAtTo };
    }

    // If neither is valid, set both to undefined
    return { publishedAtFrom: undefined, publishedAtTo: undefined };
  })();

  const newSearchParams: SearchParamsDocuments = {
    page: validPage,
    resultsPerPage,
    type,
    ...(sortBy && { sortBy }),
    ...(orderBy && { orderBy }),
    ...(name && { name }),
    ...(type && { type }),
    ...(publishedAtFrom && publishedAtTo && { publishedAtFrom, publishedAtTo }),
  };

  return newSearchParams;
};
