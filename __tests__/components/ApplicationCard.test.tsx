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

import React from "react";
import { render, screen, act } from "@testing-library/react";
import { ApplicationCard } from "../../src/components/ApplicationCard";
import "@testing-library/jest-dom";
import { ApplicationDataFieldProps } from "@/components/ApplicationDataField";
import { DprPlanningApplication } from "@/types";
import { generateBoundaryGeoJson } from "@mocks/dprApplicationFactory";
import { slugify } from "@/util";

jest.mock("@/components/InfoIcon", () => ({
  InfoIcon: () => <div data-testid="info-icon">Info Icon</div>,
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
      <p>
        {title} - {value}
        {infoIcon && ` - ${infoIcon}`}
      </p>
    </div>
  ),
}));

describe("Render ApplicationCard", () => {
  // the minimum required data for the application card
  const applicationCardApplication = {
    applicationType: "pp.full",
    application: {
      reference: "DPR/1234/2021",
      status: "in_assessment",
      receivedDate: "2023-05-08",
      validDate: "2023-11-14",
      publishedDate: "2023-05-18",
      consultation: {
        endDate: "2023-12-05",
      },
      decision: "granted",
      determinedAt: "2023-11-14T13:40:51.567Z",
      appeal: {
        decision: "allowed",
        decisionDate: "2023-11-14",
        lodgedDate: "2023-11-14",
        startedDate: "2023-11-14",
        validatedDate: "2023-11-14",
      },
    },
    property: {
      address: {
        singleLine: "123 Fake Street",
      },
      boundary: {
        site: generateBoundaryGeoJson(),
      },
    },
    proposal: {
      description: "Test description",
    },
  };

  it("should show all available data it can", async () => {
    await act(async () => {
      render(
        <ApplicationCard
          councilSlug="public-council-1"
          application={
            applicationCardApplication as unknown as DprPlanningApplication
          }
        />,
      );
    });

    // Application reference
    expect(screen.queryByText("DPR/1234/2021")).toBeInTheDocument();
    // Address
    expect(screen.queryByText("123 Fake Street")).toBeInTheDocument();
    // map
    expect(
      screen.queryByTestId("mock-application-map-loader"),
    ).toBeInTheDocument();
    // Description
    expect(screen.queryByText("Test description")).toBeInTheDocument();
    // applicationType
    expect(
      screen.queryByText("Application type - Planning permission"),
    ).toBeInTheDocument();
    // application status
    expect(
      screen.queryByText("Status - Assessment in progress"),
    ).toBeInTheDocument();
    //Received date
    expect(
      screen.queryByText("Received date - 8 May 2023"),
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

    // Appeal
    expect(screen.queryByText("Appeal decision - Allowed")).toBeInTheDocument();

    expect(screen.getByTestId("info-icon")).toBeInTheDocument();
  });

  // This should never happen but good way to make sure theres no errors
  // if data is missing from the API in the future
  it("should not error when data isn't available", async () => {
    await act(async () => {
      render(
        <ApplicationCard
          councilSlug="public-council-1"
          application={{} as DprPlanningApplication}
        />,
      );
    });

    // Ensure application-specific data is NOT present
    expect(
      screen.queryByText(/Application reference/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Application type/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Status/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Received date/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Council ecision/i)).not.toBeInTheDocument();
  });
});
