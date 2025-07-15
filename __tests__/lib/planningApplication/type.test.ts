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
  isValidPrimaryApplicationType,
  getPrimaryApplicationTypeKey,
  validPrimaryApplicationTypes,
  getPrimaryApplicationType,
  getDocumentedApplicationType,
} from "@/lib/planningApplication";
import { DprPlanningApplication } from "@/types";
import type { ApplicationType } from "digital-planning-data-schemas/types/schemas/prototypeApplication/enums/ApplicationType.ts";

describe("isValidPrimaryApplicationType", () => {
  it("should return true for valid primary application types", () => {
    validPrimaryApplicationTypes.forEach((type) => {
      expect(isValidPrimaryApplicationType(type)).toBe(true);
    });
  });

  it("should return false for invalid primary application types", () => {
    const invalidTypes = [
      "invalidType",
      "anotherInvalidType",
      "",
      null,
      undefined,
    ];

    invalidTypes.forEach((type) => {
      expect(isValidPrimaryApplicationType(type as string)).toBe(false);
    });
  });
});

describe("getPrimaryApplicationTypeKey", () => {
  it("should return the primary application type key for a valid application type", () => {
    const applicationType: DprPlanningApplication["applicationType"] =
      "pa.part1.classA";
    const result = getPrimaryApplicationTypeKey(applicationType);
    expect(result).toBe("pa");
  });

  it("should return undefined for an invalid application type", () => {
    const applicationType: any = "invalidType.part1.classA";
    const result = getPrimaryApplicationTypeKey(applicationType);
    expect(result).toBeUndefined();
  });

  it("should return undefined for an empty application type", () => {
    const applicationType: any = "";
    const result = getPrimaryApplicationTypeKey(applicationType);
    expect(result).toBeUndefined();
  });

  it("should return undefined for a null application type", () => {
    const applicationType: any = null;
    const result = getPrimaryApplicationTypeKey(applicationType);
    expect(result).toBeUndefined();
  });

  it("should return undefined for an undefined application type", () => {
    const applicationType: any = undefined;
    const result = getPrimaryApplicationTypeKey(applicationType);
    expect(result).toBeUndefined();
  });
});

describe("getPrimaryApplicationType", () => {
  it("should return the simple title we've decided on for a valid application type", () => {
    const primaryApplicationTypeTitles = {
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
    Object.entries(primaryApplicationTypeTitles).forEach(([key, value]) => {
      const result = getPrimaryApplicationType(
        key as DprPlanningApplication["applicationType"],
      );
      expect(result).toBe(value);
    });
  });

  it("should return undefined for an invalid application type", () => {
    const applicationType: any = "invalidType.part1.classA";
    const result = getPrimaryApplicationType(applicationType);
    expect(result).toBeUndefined();
  });

  it("should return undefined for an empty application type", () => {
    const applicationType: any = "";
    const result = getPrimaryApplicationType(applicationType);
    expect(result).toBeUndefined();
  });

  it("should return undefined for a null application type", () => {
    const applicationType: any = null;
    const result = getPrimaryApplicationType(applicationType);
    expect(result).toBeUndefined();
  });

  it("should return undefined for an undefined application type", () => {
    const applicationType: any = undefined;
    const result = getPrimaryApplicationType(applicationType);
    expect(result).toBeUndefined();
  });
});

describe("getDocumentedApplicationType", () => {
  it("should return the content section we've decided on for a valid application type", () => {
    const ApplicationTypeToDocumentationMap: Record<
      ApplicationType,
      string | undefined
    > = {
      advertConsent: "Non-planning consents",
      amendment: undefined,
      "amendment.minorMaterial": undefined,
      "amendment.nonMaterial": undefined,
      approval: undefined,
      "approval.conditions": undefined,
      "approval.reservedMatters": "Approval of reserved matters",
      complianceConfirmation: undefined,
      environmentalImpact: "Non-planning consents",
      "environmentalImpact.scoping": "Non-planning consents",
      "environmentalImpact.screening": "Non-planning consents",
      hazardousSubstanceConsent: "Non-planning consents",
      hedgerowRemovalNotice: "Non-planning consents",
      landDrainageConsent: "Non-planning consents",
      ldc: "Lawful development certificate",
      "ldc.breachOfCondition": "Lawful development certificate",
      "ldc.existing": "Lawful development certificate",
      "ldc.listedBuildingWorks": "Lawful development certificate",
      "ldc.proposed": "Lawful development certificate",
      listed: undefined,
      notifyCompletion: "Non-planning consents",
      obligation: undefined,
      "obligation.discharge": undefined,
      "obligation.modify": undefined,
      onshoreExtractionOilAndGas: "Non-planning consents",
      "onshoreExtractionOilAndGas.other": "Non-planning consents",
      "onshoreExtractionOilAndGas.pp.extension": "Non-planning consents",
      "onshoreExtractionOilAndGas.pp.waste": "Non-planning consents",
      "onshoreExtractionOilAndGas.pp.working": "Non-planning consents",
      "onshoreExtractionOilAndGas.review": "Non-planning consents",
      "onshoreExtractionOilAndGas.variation": "Non-planning consents",
      pa: "Prior approval",
      "pa.part1.classA": "Prior approval",
      "pa.part1.classAA": "Prior approval",
      "pa.part3.classG": "Prior approval",
      "pa.part3.classM": "Prior approval",
      "pa.part3.classMA": "Prior approval",
      "pa.part3.classN": "Prior approval",
      "pa.part3.classQ": "Prior approval",
      "pa.part3.classR": "Prior approval",
      "pa.part3.classS": "Prior approval",
      "pa.part3.classT": "Prior approval",
      "pa.part3.classV": "Prior approval",
      "pa.part4.classBB": "Prior approval",
      "pa.part4.classBC": "Prior approval",
      "pa.part4.classCA": "Prior approval",
      "pa.part4.classE": "Prior approval",
      "pa.part6": "Prior approval",
      "pa.part6.classA": "Prior approval",
      "pa.part6.classB": "Prior approval",
      "pa.part6.classE": "Prior approval",
      "pa.part7.classC": "Prior approval",
      "pa.part7.classM": "Prior approval",
      "pa.part9.classD": "Prior approval",
      "pa.part11.classB": "Prior approval",
      "pa.part14.classA": "Prior approval",
      "pa.part14.classB": "Prior approval",
      "pa.part14.classJ": "Prior approval",
      "pa.part14.classK": "Prior approval",
      "pa.part14.classOA": "Prior approval",
      "pa.part16.classA": "Prior approval",
      "pa.part17": "Prior approval",
      "pa.part17.classB": "Prior approval",
      "pa.part17.classC": "Prior approval",
      "pa.part17.classG": "Prior approval",
      "pa.part18.classA": "Prior approval",
      "pa.part19.classTA": "Prior approval",
      "pa.part20.classA": "Prior approval",
      "pa.part20.classAA": "Prior approval",
      "pa.part20.classAB": "Prior approval",
      "pa.part20.classAC": "Prior approval",
      "pa.part20.classAD": "Prior approval",
      "pa.part20.classZA": "Prior approval",
      pp: undefined,
      "pp.full": "Full planning permission",
      "pp.full.advertConsent": "Full planning permission",
      "pp.full.demolition": "Full planning permission",
      "pp.full.fastTrack.affordable": "Full planning permission",
      "pp.full.householder": "Householder planning application",
      "pp.full.householder.listed": "Householder planning application",
      "pp.full.householder.retro": "Householder planning application",
      "pp.full.major": "Major",
      "pp.full.major.technicalDetails": "Major",
      "pp.full.major.technicalDetails.waste": "Major",
      "pp.full.major.waste": "Major",
      "pp.full.minor": "Minor and changes of use",
      "pp.full.minor.listed": "Minor and changes of use",
      "pp.full.minor.technicalDetails": "Minor and changes of use",
      "pp.mineralExtraction": undefined,
      "pp.outline": "Outline planning permission",
      "pp.outline.all": "Outline planning permission",
      "pp.outline.some": "Outline planning permission",
      "pp.outline.minor": "Outline planning permission",
      "pp.outline.minor.all": "Outline planning permission",
      "pp.outline.minor.some": "Outline planning permission",
      "pp.outline.major": "Outline planning permission",
      "pp.outline.major.all": "Outline planning permission",
      "pp.outline.major.all.waste": "Outline planning permission",
      "pp.outline.major.some": "Outline planning permission",
      "pp.outline.major.some.waste": "Outline planning permission",
      "pp.pip": undefined,
      rightsOfWayOrder: "Non-planning consents",
      wtt: "Non-planning consents",
      "wtt.consent": "Non-planning consents",
      "wtt.notice": "Non-planning consents",
    };
    Object.entries(ApplicationTypeToDocumentationMap).forEach(
      ([key, value]) => {
        const result = getDocumentedApplicationType(
          key as DprPlanningApplication["applicationType"],
        );
        expect(result).toBe(value);
      },
    );
  });

  it("should return undefined for an invalid application type", () => {
    const applicationType: any = "invalidType.part1.classA";
    const result = getDocumentedApplicationType(applicationType);
    expect(result).toBeUndefined();
  });

  it("should return undefined for an empty application type", () => {
    const applicationType: any = "";
    const result = getDocumentedApplicationType(applicationType);
    expect(result).toBeUndefined();
  });

  it("should return undefined for a null application type", () => {
    const applicationType: any = null;
    const result = getDocumentedApplicationType(applicationType);
    expect(result).toBeUndefined();
  });

  it("should return undefined for an undefined application type", () => {
    const applicationType: any = undefined;
    const result = getDocumentedApplicationType(applicationType);
    expect(result).toBeUndefined();
  });
});
