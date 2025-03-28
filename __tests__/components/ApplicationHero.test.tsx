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
import { ApplicationHero } from "../../src/components/ApplicationHero";
import "@testing-library/jest-dom";
import { ApplicationDataFieldProps } from "@/components/ApplicationDataField";
import { DprApplication } from "@/types";
import { TagProps } from "@/components/Tag";
import { slugify } from "@/util";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";
import { getPropertyAddress } from "@/lib/planningApplication/application";

jest.mock("@/components/InfoIcon", () => ({
  InfoIcon: () => <div data-testid="info-icon">Info Icon</div>,
}));

jest.mock("@/components/Tag", () => ({
  Tag: ({ label }: TagProps) => <>{label}</>,
}));

jest.mock("@/components/ApplicationMap", () => ({
  ApplicationMapLoader: () => (
    <div data-testid="mock-application-map-loader">Mocked ApplicationMap</div>
  ),
}));

jest.mock("@/components/ApplicationDataField", () => ({
  ApplicationDataField: ({ title, value }: ApplicationDataFieldProps) => (
    <div data-testid={`application-data-field-${slugify(title)}`}>
      {title} - {value}
    </div>
  ),
}));

describe("Render ApplicationHero", () => {
  const { assessmentInProgress } = generateExampleApplications();

  it("should show all available data it can", async () => {
    const applicationHeroApplication = assessmentInProgress;

    await act(async () => {
      render(
        <ApplicationHero
          councilSlug="public-council-1"
          application={applicationHeroApplication as DprApplication}
        />,
      );
    });

    const boundary =
      applicationHeroApplication.submission?.data?.property?.boundary?.site;
    if (boundary) {
      expect(
        screen.getByTestId("mock-application-map-loader"),
      ).toBeInTheDocument();
    }

    const address = getPropertyAddress(
      applicationHeroApplication.submission?.data?.property?.address,
    );
    if (address) {
      const addressEl = screen.getByTestId("application-data-field-address");
      expect(addressEl).toHaveTextContent(`Address - ${address}`);
    }

    const appStatusSummary =
      applicationHeroApplication.applicationStatusSummary;
    if (appStatusSummary) {
      const statusEl = screen.getByTestId("application-data-field-status");
      expect(statusEl).toHaveTextContent(`Status - ${appStatusSummary}`);
    }

    const applicationType = applicationHeroApplication.applicationType;
    if (applicationType) {
      const appTypeEl = screen.getByTestId(
        "application-data-field-application-type",
      );
      expect(appTypeEl).toHaveTextContent("Application type - ");
    }

    const officerDecision =
      applicationHeroApplication.data?.assessment?.planningOfficerDecision;
    if (officerDecision) {
      const councilDecision = screen.getByTestId(
        "application-data-field-council-decision",
      );
      const decisionSummary =
        applicationHeroApplication.applicationDecisionSummary ?? "";
      expect(councilDecision).toHaveTextContent(
        `Council decision - ${decisionSummary}`,
      );
    }
  });

  // This should never happen but good way to make sure theres no errors
  // if data is missing from the API in the future
  it("should not error when data isn't available", async () => {
    await act(async () => {
      render(
        <ApplicationHero
          councilSlug="public-council-1"
          application={{} as DprApplication}
        />,
      );
    });

    // Check if any text is being rendered
    const textElements = screen.queryAllByText(/./);
    expect(textElements.length).toBe(0);
  });
});
