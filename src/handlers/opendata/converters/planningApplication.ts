import { DprPlanningApplication } from "@/types";
import { OpenDataApplication } from "../types/definitions";
import { convertDateNoTimeToDprDate, convertDateTimeToUtc } from "@/util";

export const convertOpenDataToDpr = (
  council: string,
  application: OpenDataApplication,
): DprPlanningApplication => {
  // application.case_officer
  const applicationType = mapApplicationType(application.application_type);
  return {
    applicationType: applicationType,
    application: createApplication(application),
    property: createProperty(application),
    proposal: createProposal(application),
    applicant: createApplicant(application),
  };
};

export const createApplication = (
  application: OpenDataApplication,
): DprPlanningApplication["applicant"] => {
  // application.comment
  return {
    reference: application.application_number.replaceAll("/", "-"),
    status: application.system_status,
    recievedDate: convertDateNoTimeToDprDate(application.registered_date),
    validDate: convertDateNoTimeToDprDate(application.valid_from_date),
    determinedAt: convertDateTimeToUtc(application.decision_date),
    decision: application.decision_type,
    consultation: {
      allowComments: false,
    },
  };
};

export const createProperty = (
  application: OpenDataApplication,
): DprPlanningApplication["property"] => {
  // glitch in bops where boundary_geojson is coming through as {} not null seems to only affect the search endpoint

  const latitude = parseFloat(application.location.latitude);
  const longitude = parseFloat(application.location.longitude);

  const polygonCoordinates = createPolygonCoordinatesAsCircle(
    latitude,
    longitude,
  );

  return {
    address: {
      singleLine: application.development_address,
    },
    boundary: {
      site: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: polygonCoordinates,
        },
        properties: null,
      },
    },
  };
};

export const createProposal = (
  application: OpenDataApplication,
): DprPlanningApplication["proposal"] => {
  let description = application.development_description;
  return {
    description: description,
  };
};

export const createApplicant = (
  application: OpenDataApplication,
): DprPlanningApplication["applicant"] => {
  return {
    name: application.applicant_name,
  };
};

const createPolygonCoordinates = (
  latitude: number,
  longitude: number,
): number[][][] | number[][][][] => {
  // Define the offset for the bounding box (in degrees)
  const offset = 0.0002;

  // Create the polygon coordinates
  const polygonCoordinates = [
    [
      [longitude - offset, latitude - offset],
      [longitude + offset, latitude - offset],
      [longitude + offset, latitude + offset],
      [longitude - offset, latitude + offset],
      [longitude - offset, latitude - offset],
    ],
  ];
  return polygonCoordinates;
};

const createPolygonCoordinatesAsCircle = (
  latitude: number,
  longitude: number,
): number[][][] => {
  const radius = 0.0002; // Radius of the circle in degrees
  const numPoints = 32; // Number of points to create the circle

  const polygonCoordinates = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 2 * Math.PI) / numPoints;
    const dx =
      (radius * Math.cos(angle)) / Math.cos((latitude * Math.PI) / 180);
    const dy = radius * Math.sin(angle);
    polygonCoordinates.push([longitude + dx, latitude + dy]);
  }
  // Close the polygon by repeating the first point
  polygonCoordinates.push(polygonCoordinates[0]);

  return [polygonCoordinates];
};

const mapApplicationType = (
  applicationType: OpenDataApplication["application_type"],
): DprPlanningApplication["applicationType"] => {
  const applicationTypeMap: Record<
    OpenDataApplication["application_type"],
    DprPlanningApplication["applicationType"]
  > = {
    "Advertisement Consent": "advertConsent",

    "Application for Works to Tree(s) covered by a TPO": "wtt.consent",

    "Approval of Details": "approval",

    "Approval of Details (Conservation Area Consent)": "approval.conditions",

    "Approval of Details (Listed Building)": "approval.conditions",

    "Approval of Reserved Matters": "approval.reservedMatters",

    "Asset of Community Value Written Request": "",

    "(CA) Notification of Emergency Works to Dead/Dangerous Tree(s)": "",

    "Certificate of Appropriate Alternative Development": "",

    "Certificate of Lawfulness (Existing)": "ldc.existing",

    "Certificate of Lawfulness of Proposed Works to a Listed Building":
      "ldc.listedBuildingWorks",

    "Certificate of Lawfulness (Proposed)": "ldc.proposed",

    "Conservation Area Consent": "",

    "Construction Management Plan Consultation": "",

    "Councils Own Approval of Details": "",

    "Councils Own Approval of Details (Listed Building)": "",

    "Councils Own Conservation Area Consent": "",

    "Councils Own Listed Building Consent": "",

    "Councils Own Permission Under Regulation 3": "",

    "Councils Own Permission Under Regulation 4": "",

    "DC Forum (Open)": "",

    "Development Consent Order": "",

    "Full Planning Permission": "pp.full",

    "GPDO Notification": "",

    "GPDO notification Class DA temporary change of use A3/A4 to A5": "",

    "GPDO Prior Approval Class A Householder extensions": "",

    "GPDO Prior Approval Class D Commercial 2 year change of use": "",

    "GPDO Prior Approval Class IA change of use of A1/A2 to C3": "",

    "GPDO Prior Approval Class J Change of use of A1 to D2": "",

    "GPDO Prior Approval Class K change of use of B1/C1/C2/C2A/D2 to registered nursery":
      "",

    "GPDO Prior Approval Class M change of use of A1/A2 to C3": "",

    "GPDO Prior Approval Class O Change of use B1 to C3": "",

    "GPDO Prior Approval Class PA Change of use B1 to C3": "",

    "GPDO Prior Approval Class P Change of use of B8 to C3": "",

    "GPDO Prior Approval Class T Change of use of B1/C1/C2/C2A/C2 to state-funded school or nursery (D1)":
      "",

    "GPDO Prior Approval Determination": "",

    "GPDO Prior Approval of Demolition": "",

    "High Hedge Mediation": "",

    "Historic application": "",

    "Historic Planning Application": "",

    "Householder Application": "",

    "Listed Building Consent": "",

    "Listed Building Consent (Demolition)": "",

    "Listed Building Heritage Partnership Agreement": "",

    "Non Material Amendments": "",

    "Notification of Intended Works to Tree(s) in a Conservation Area": "",

    "Outline Planning Permission": "",

    "Permission in Principle": "",

    "Renewal of Conservation Area Consent": "",

    "Renewal of Full Planning Permission": "",

    "Renewal of Listed Building Consent": "",

    "Request for Observations to Adjoining Borough": "",

    "Request for Scoping Opinion": "",

    "Request for Screening Opinion": "",

    "Resubmission of Full Planning Permission": "",

    "S106 Deed of Variation": "",

    "Schedule 17 - Conditions of Deemed Planning Permission": "",

    "Schedule 18 - Heritage Agreement": "",

    "Section 106A": "",

    "Section 106BA": "",

    "(TPO) Notification of Emergency Works to Dead/Dangerous Tree(s)": "",

    "Variation or Removal of Condition(s)": "",
  };

  return applicationTypeMap[applicationType];
};
