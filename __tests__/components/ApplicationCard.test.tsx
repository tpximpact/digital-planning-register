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
import { DprApplication, DprContentPage } from "@/types";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";
import { slugify } from "@/util";
import { formatDateTimeToDprDate, formatDateToDprDate } from "@/util";
import { getDescription } from "@/lib/planningApplication/application";

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

jest.mock("@/lib/planningApplication/application", () => {
  const originalModule = jest.requireActual(
    "@/lib/planningApplication/application",
  );
  return {
    __esModule: true,
    ...originalModule,
    getPropertyAddress: jest.fn(() => "123 Test Street"),
  };
});

// Mock contentDecisions and findItemByKey to control the returned title
jest.mock("@/lib/planningApplication", () => {
  const original = jest.requireActual("@/lib/planningApplication");
  return {
    ...original,
    contentDecisions: jest.fn(() => [
      { key: "allowed", title: "Allowed" },
      { key: "dismissed", title: "Dismissed" },
    ]),
    findItemByKey: jest.fn((arr, key) =>
      arr.find((item: DprContentPage) => item.key === key),
    ),
  };
});

describe("Render ApplicationCard", () => {
  const { planningOfficerDetermined } = generateExampleApplications();

  it("should show all available data it can", async () => {
    await act(async () => {
      render(
        <ApplicationCard
          councilSlug="public-council-1"
          application={planningOfficerDetermined}
        />,
      );
    });

    // info icon
    expect(screen.getByTestId("info-icon")).toBeInTheDocument();

    // Application reference
    const reference = planningOfficerDetermined.data?.application?.reference;
    if (reference) {
      expect(screen.getByText("Application reference")).toBeInTheDocument();
      expect(screen.getByText(reference)).toBeInTheDocument();
    }

    // Address
    const address =
      planningOfficerDetermined.submission?.data?.property?.address;
    if (address) {
      expect(screen.getByText("Address")).toBeInTheDocument();
      expect(screen.getByText("123 Test Street")).toBeInTheDocument();
    }
    // map
    const boundaryGeojson =
      planningOfficerDetermined.submission?.data?.property?.boundary?.site;
    if (boundaryGeojson) {
      expect(
        screen.getByTestId("mock-application-map-loader"),
      ).toBeInTheDocument();
    }
    // Description
    const description = getDescription(
      planningOfficerDetermined.submission?.data?.proposal,
    );
    if (description) {
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    }
    // Application type
    const appTypeEl = screen.getByTestId(
      "application-data-field-application-type",
    );
    expect(appTypeEl).toHaveTextContent(
      "Application type - Planning permission",
    );
    // Application status
    const statusSummary = planningOfficerDetermined.applicationStatusSummary;
    if (statusSummary) {
      const statusEl = screen.getByTestId("application-data-field-status");
      expect(statusEl).toHaveTextContent(`Status - ${statusSummary}`);
    }
    // Received date
    const receivedAt = planningOfficerDetermined.data?.validation?.receivedAt;
    if (receivedAt) {
      const formatted = formatDateTimeToDprDate(receivedAt);
      const receivedEl = screen.getByTestId(
        "application-data-field-received-date",
      );
      expect(receivedEl).toHaveTextContent(`Received date - ${formatted}`);
    }
    // Valid from date
    const validatedAt = planningOfficerDetermined.data?.validation?.validatedAt;
    if (validatedAt) {
      const formatted = formatDateTimeToDprDate(validatedAt);
      const validFromEl = screen.getByTestId(
        "application-data-field-valid-from-date",
      );
      expect(validFromEl).toHaveTextContent(`Valid from date - ${formatted}`);
    }
    // Published date
    const publishedAt = planningOfficerDetermined.data.application?.publishedAt;
    if (publishedAt) {
      const formatted = formatDateTimeToDprDate(publishedAt);
      const publishedEl = screen.getByTestId(
        "application-data-field-published-date",
      );
      expect(publishedEl).toHaveTextContent(`Published date - ${formatted}`);
    }
    // Consultation end date
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
    // Council decision date
    const councilDecisionDate =
      planningOfficerDetermined.data?.assessment?.planningOfficerDecisionDate;
    if (councilDecisionDate) {
      const formattedDate = formatDateTimeToDprDate(councilDecisionDate);
      const decisionDateEl = screen.getByTestId(
        "application-data-field-council-decision-date",
      );
      expect(decisionDateEl).toHaveTextContent(
        `Council decision date - ${formattedDate}`,
      );
    }
    // Council decision
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
    render(
      <ApplicationCard
        councilSlug="public-council-1"
        application={{} as DprApplication}
      />,
    );

    // Ensure application-specific data is NOT present
    expect(
      screen.queryByText(/Application reference/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Application type/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Status/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Received date/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Council decision/i)).not.toBeInTheDocument();
  });

  it("does not render appeal decision date if appeal.decision is set but appeal.decisionDate is not", async () => {
    const applicationWithAppealNoDecisionDate = {
      ...planningOfficerDetermined,
      data: {
        ...planningOfficerDetermined.data,
        appeal: {
          ...planningOfficerDetermined.data?.appeal,
          decision: "allowed", // matches contentDecisions key
          decisionDate: undefined, // no decision date
        },
      },
    };

    render(
      <ApplicationCard
        councilSlug="public-council-1"
        application={applicationWithAppealNoDecisionDate as DprApplication}
      />,
    );

    const appealDecisionEl = screen.getByTestId(
      "application-data-field-appeal-decision",
    );
    expect(appealDecisionEl).toHaveTextContent("Appeal decision - Allowed");

    const appealDecisionDateEl = screen.queryByTestId(
      "application-data-field-appeal-decision-date",
    );
    expect(appealDecisionDateEl).not.toBeInTheDocument();
  });
});
