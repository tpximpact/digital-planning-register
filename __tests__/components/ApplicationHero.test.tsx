import React from "react";
import { render, screen, act } from "@testing-library/react";
import { ApplicationHero } from "../../src/components/ApplicationHero";
import "@testing-library/jest-dom";
import { ApplicationDataFieldProps } from "@/components/ApplicationDataField";
import { DprPlanningApplication } from "@/types";
import { generateBoundaryGeoJson } from "@mocks/dprApplicationFactory";
import { TagProps } from "@/components/Tag";
import { slugify } from "@/util";

jest.mock("@/components/InfoIcon", () => ({
  InfoIcon: () => <div data-testid="info-icon">Info Icon</div>,
}));

jest.mock("@/components/Tag", () => ({
  Tag: ({ label, sentiment, id, isInline }: TagProps) => <>{label}</>,
}));

jest.mock("@/components/ApplicationMap", () => ({
  ApplicationMapLoader: () => (
    <div data-testid="mock-application-map-loader">Mocked ApplicationMap</div>
  ),
}));

jest.mock("@/components/ApplicationDataField", () => ({
  ApplicationDataField: ({
    title,
    value,
    infoIcon,
  }: ApplicationDataFieldProps) => (
    <div data-testid={`application-data-field-${slugify(title)}`}>
      {title} - {value}
    </div>
  ),
}));

describe("Render ApplicationHero", () => {
  // the minimum required data for the application hero
  const applicationCardApplication = {
    applicationType: "pp.full",
    application: {
      status: "in_assessment",
      receivedDate: "2023-05-08",
      validDate: "2023-11-14",
      publishedDate: "2023-05-18",
      consultation: {
        endDate: "2023-12-05",
      },
      decision: "granted",
      determinedAt: "2023-11-14T13:40:51.567Z",
    },
    property: {
      address: {
        singleLine: "123 Fake Street",
      },
      boundary: {
        site: generateBoundaryGeoJson(),
      },
    },
  };

  it("should show all available data it can", async () => {
    await act(async () => {
      render(
        <ApplicationHero
          councilSlug="public-council-1"
          application={
            applicationCardApplication as unknown as DprPlanningApplication
          }
        />,
      );
    });

    // Address
    expect(screen.queryByText("Address - 123 Fake Street")).toBeInTheDocument();
    // map
    expect(
      screen.queryByTestId("mock-application-map-loader"),
    ).toBeInTheDocument();
    // applicationType
    expect(
      screen.queryByText("Application type - Planning permission"),
    ).toBeInTheDocument();
    // application status
    expect(
      screen.queryByText("Status - Assessment in progress"),
    ).toBeInTheDocument();
    //Recieved date
    expect(
      screen.queryByText("Recieved date - 8 May 2023"),
    ).toBeInTheDocument();
    // Valid from date
    expect(
      screen.queryByText("Valid from date - 14 Nov 2023"),
    ).toBeInTheDocument();
    // Published date
    expect(
      screen.queryByText("Published date - 18 May 2023"),
    ).toBeInTheDocument();
    //Consultation end date
    expect(
      screen.queryByText("Consultation end date - 5 Dec 2023"),
    ).toBeInTheDocument();
    //Decision Date
    const decisionDate = screen.queryByTestId(
      "application-data-field-council-decision-date",
    );
    expect(decisionDate?.querySelector("time")).toHaveAttribute(
      "datetime",
      "2023-11-14T13:40:51.567Z",
    );
    expect(decisionDate?.querySelector("time")).toHaveTextContent(
      "14 Nov 2023",
    );
    // Decision
    expect(screen.queryByText("Decision - Granted")).toBeInTheDocument;
  });

  // This should never happen but good way to make sure theres no errors
  // if data is missing from the API in the future
  it("should not error when data isn't available", async () => {
    await act(async () => {
      render(
        <ApplicationHero
          councilSlug="public-council-1"
          application={{} as DprPlanningApplication}
        />,
      );
    });

    // Check if any text is being rendered
    const textElements = screen.queryAllByText(/./);
    expect(textElements.length).toBe(0);
  });
});
