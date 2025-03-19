import {
  getCouncilDecisionDate,
  getCouncilDecision,
  getDescription,
  getPropertyAddress,
  getPropertyAddressLatitudeLongitude,
} from "@/lib/planningApplication/application";
import { DprApplication } from "@/types";
import {
  GeographyBasedProposal,
  HedgerowRemovalNoticeProposal,
  ProposalBase,
} from "@/types/odp-types/schemas/prototypeApplication/data/Proposal";
import { OSAddress, ProposedAddress } from "@/types/odp-types/shared/Addresses";

describe("getPropertyAddress", () => {
  it("should return the description for an application with ProposedAddress address", () => {
    const address: ProposedAddress = {
      title: "House McHouseface Housing",
      x: 502869.8591151078,
      y: 180333.4537434135,
      latitude: 51.51257224609594,
      longitude: -0.5189885919643893,
      source: "Proposed by applicant",
    };
    expect(getPropertyAddress(address)).toEqual("House McHouseface Housing");
  });
  it("should return the description for an application with OSAddress address", () => {
    const address: OSAddress = {
      latitude: 51.6994957,
      longitude: -0.708966,
      x: 489320,
      y: 200872,
      title: "GIPSY HOUSE, WHITEFIELD LANE, GREAT MISSENDEN",
      singleLine: "GIPSY HOUSE, WHITEFIELD LANE, GREAT MISSENDEN, HP16 0BP",
      source: "Ordnance Survey",
      uprn: "100081174436",
      usrn: "07300709",
      pao: "",
      street: "WHITEFIELD LANE",
      town: "GREAT MISSENDEN",
      postcode: "HP16 0BP",
    };
    expect(getPropertyAddress(address)).toEqual(
      "GIPSY HOUSE, WHITEFIELD LANE, GREAT MISSENDEN, HP16 0BP",
    );
  });
});

describe("getPropertyAddressLatitudeLongitude", () => {
  it("should return the latitude/longitude for an application with ProposedAddress address", () => {
    const address: ProposedAddress = {
      title: "House McHouseface Housing",
      x: 502869.8591151078,
      y: 180333.4537434135,
      latitude: 51.51257224609594,
      longitude: -0.5189885919643893,
      source: "Proposed by applicant",
    };
    expect(getPropertyAddressLatitudeLongitude(address)).toMatchObject({
      latitude: 51.51257224609594,
      longitude: -0.5189885919643893,
    });
  });
  it("should return the latitude/longitude for an application with OSAddress address", () => {
    const address: OSAddress = {
      latitude: 51.6994957,
      longitude: -0.708966,
      x: 489320,
      y: 200872,
      title: "GIPSY HOUSE, WHITEFIELD LANE, GREAT MISSENDEN",
      singleLine: "GIPSY HOUSE, WHITEFIELD LANE, GREAT MISSENDEN, HP16 0BP",
      source: "Ordnance Survey",
      uprn: "100081174436",
      usrn: "07300709",
      pao: "",
      street: "WHITEFIELD LANE",
      town: "GREAT MISSENDEN",
      postcode: "HP16 0BP",
    };

    expect(getPropertyAddressLatitudeLongitude(address)).toMatchObject({
      latitude: 51.6994957,
      longitude: -0.708966,
    });
  });
});

describe("description", () => {
  it("should return the description for an application with ProposalBase proposal", () => {
    const proposal: ProposalBase = {
      description: "I am description",
    };
    expect(getDescription(proposal)).toEqual("I am description");
  });
  it("should return the description for an application with ProposalBase proposal", () => {
    const proposal: GeographyBasedProposal = {
      projectType: ["alter.balcony"],
      description: "I am description",
    };
    expect(getDescription(proposal)).toEqual("I am description");
  });
  it("should return the description for an application with ProposalBase proposal", () => {
    const proposal: HedgerowRemovalNoticeProposal = {
      reason: "I am description",
      hedgerowLength: { metres: 100 },
      hedgerowAgeLessThanThirty: true,
    };
    expect(getDescription(proposal)).toEqual("I am description");
  });
});

describe("getCouncilDecision", () => {
  it("should return the planning officer decision if it exists", () => {
    const application = {
      data: {
        assessment: {
          planningOfficerDecision: "refused",
        },
      },
    };
    expect(
      getCouncilDecision(application as unknown as DprApplication),
    ).toEqual("refused");
  });
  it("should return the committee decision if it exists", () => {
    const application = {
      data: {
        assessment: {
          committeeDecision: "refused",
        },
      },
    };
    expect(
      getCouncilDecision(application as unknown as DprApplication),
    ).toEqual("refused");
  });
  it("should return the committee decision if both exist", () => {
    const application = {
      data: {
        assessment: {
          planningOfficerDecision: "granted",
          committeeDecision: "refused",
        },
      },
    };
    expect(
      getCouncilDecision(application as unknown as DprApplication),
    ).toEqual("refused");
  });
  it("should return undefined if neither the planning officer or committee decision exists", () => {
    const application = {};
    expect(
      getCouncilDecision(application as unknown as DprApplication),
    ).toBeUndefined();
  });
});

describe("getCouncilDecisionDate", () => {
  it("should return the planning officer decision date if it exists", () => {
    const application = {
      data: {
        assessment: {
          planningOfficerDecisionDate: "2021-01-01",
        },
      },
    };
    expect(
      getCouncilDecisionDate(application as unknown as DprApplication),
    ).toEqual("2021-01-01");
  });
  it("should return the committee decision date if it exists", () => {
    const application = {
      data: {
        assessment: {
          committeeDecisionDate: "2021-01-01",
        },
      },
    };
    expect(
      getCouncilDecisionDate(application as unknown as DprApplication),
    ).toEqual("2021-01-01");
  });
  it("should return the committee decision date if both exist", () => {
    const application = {
      data: {
        assessment: {
          planningOfficerDecisionDate: "2020-01-01",
          committeeDecisionDate: "2021-01-01",
        },
      },
    };
    expect(
      getCouncilDecisionDate(application as unknown as DprApplication),
    ).toEqual("2021-01-01");
  });
  it("should return undefined if neither the planning officer or committee decision date exists", () => {
    const application = {};
    expect(
      getCouncilDecisionDate(application as unknown as DprApplication),
    ).toBeUndefined();
  });
});
