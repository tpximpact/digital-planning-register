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
import { DprApplication } from "@/types";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";
import { slugify } from "@/util";
import { formatDateTimeToDprDate, formatDateToDprDate } from "@/util";
import {
  getDescription,
  getPropertyAddress,
} from "@/lib/planningApplication/application";

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
  const { planningOfficerDetermined } = generateExampleApplications();

  it("should show all available data it can", async () => {
    await act(async () => {
      render(
        <ApplicationCard
          councilSlug="public-council-1"
          application={planningOfficerDetermined as DprApplication}
        />,
      );
    });

    expect(screen.getByTestId("info-icon")).toBeInTheDocument();

    const reference = planningOfficerDetermined.data?.application?.reference;
    if (reference) {
      expect(screen.getByText("Application reference")).toBeInTheDocument();
      expect(screen.getByText(reference)).toBeInTheDocument();
    }

    const address = getPropertyAddress(
      planningOfficerDetermined.submission?.data?.property?.address,
    );
    if (address) {
      expect(screen.getByText("Address")).toBeInTheDocument();
      expect(screen.getByText(address)).toBeInTheDocument();
    }

    const boundaryGeojson =
      planningOfficerDetermined.submission?.data?.property?.boundary?.site;
    if (boundaryGeojson) {
      expect(
        screen.getByTestId("mock-application-map-loader"),
      ).toBeInTheDocument();
    }

    const description = getDescription(
      planningOfficerDetermined.submission?.data?.proposal,
    );
    if (description) {
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    }

    const appTypeEl = screen.getByTestId(
      "application-data-field-application-type",
    );
    expect(appTypeEl).toHaveTextContent(
      "Application type - Planning permission",
    );

    const statusSummary = planningOfficerDetermined.applicationStatusSummary;
    if (statusSummary) {
      const statusEl = screen.getByTestId("application-data-field-status");
      expect(statusEl).toHaveTextContent(`Status - ${statusSummary}`);
    }

    const receivedAt = planningOfficerDetermined.data?.validation?.receivedAt;
    if (receivedAt) {
      const formatted = formatDateTimeToDprDate(receivedAt);
      const receivedEl = screen.getByTestId(
        "application-data-field-received-date",
      );
      expect(receivedEl).toHaveTextContent(`Received date - ${formatted}`);
    }

    const validatedAt = planningOfficerDetermined.data?.validation?.validatedAt;
    if (validatedAt) {
      const formatted = formatDateTimeToDprDate(validatedAt);
      const validFromEl = screen.getByTestId(
        "application-data-field-valid-from-date",
      );
      expect(validFromEl).toHaveTextContent(`Valid from date - ${formatted}`);
    }

    const publishedAt = planningOfficerDetermined.metadata?.publishedAt;
    if (publishedAt) {
      const formatted = formatDateTimeToDprDate(publishedAt);
      const publishedEl = screen.getByTestId(
        "application-data-field-published-date",
      );
      expect(publishedEl).toHaveTextContent(`Published date - ${formatted}`);
    }

    const consultationEnd =
      planningOfficerDetermined.data?.consultation?.endDate;
    if (consultationEnd) {
      const formatted = formatDateToDprDate(consultationEnd);
      const consultEl = screen.getByTestId(
        "application-data-field-consultation-end-date",
      );
      expect(consultEl).toHaveTextContent(
        `Consultation end date - ${formatted}`,
      );
    }

    const councilDecisionDate =
      planningOfficerDetermined.data?.assessment?.planningOfficerDecisionDate;
    if (councilDecisionDate) {
      const formatted = formatDateTimeToDprDate(councilDecisionDate);
      const decisionDateEl = screen.getByTestId(
        "application-data-field-council-decision-date",
      );
      expect(decisionDateEl).toHaveTextContent(
        `Council decision date - ${formatted}`,
      );
    }
    const applicationDecisionSummary =
      planningOfficerDetermined.applicationDecisionSummary;
    if (applicationDecisionSummary) {
      const decisionEl = screen.getByTestId(
        "application-data-field-council-decision",
      );
      expect(decisionEl).toHaveTextContent(
        `Council decision - ${applicationDecisionSummary}`,
      );
    }
  });

  it("should not error when data isn't available", async () => {
    await act(async () => {
      render(
        <ApplicationCard
          councilSlug="public-council-1"
          application={{} as DprApplication}
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
    expect(screen.queryByText(/Council decision/i)).not.toBeInTheDocument();
  });
});
