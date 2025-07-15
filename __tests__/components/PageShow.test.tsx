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

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageShow } from "@/components/PageShow/PageShow";
import { AppConfig } from "@/config/types";
import { DprApplication, DprDocument } from "@/types";
import type {
  PublicCommentSummary,
  SpecialistCommentSummary,
} from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/CommentSummary.ts";

// Mock child components to isolate PageShow
jest.mock("@/components/BackButton", () => ({
  BackButton: ({ baseUrl }: any) => <div data-testid="back-btn">{baseUrl}</div>,
}));
jest.mock("@/components/PageMain", () => ({
  PageMain: ({ children }: any) => (
    <main data-testid="page-main">{children}</main>
  ),
}));
jest.mock("@/components/ContentNotFound", () => ({
  ContentNotFound: ({ councilConfig }: any) => (
    <div data-testid="not-found">{councilConfig?.slug}</div>
  ),
}));
jest.mock("@/components/ApplicationDetails", () => ({
  ApplicationDetails: (props: any) => (
    <div data-testid="application-details">{JSON.stringify(props)}</div>
  ),
}));

const baseAppConfig: AppConfig = {
  council: { slug: "camden", dataSource: "test" },
  // ...other required config fields
} as any;

const baseApplication: DprApplication = {
  submission: { data: { applicant: "Test Applicant" } },
  data: { caseOfficer: "Test Officer" },
  // ...other required fields
} as any;

const baseParams = { council: "camden", reference: "APP-123" };

describe("PageShow", () => {
  it("renders ContentNotFound if application is null", () => {
    render(
      <PageShow
        appConfig={baseAppConfig}
        application={null}
        params={baseParams}
      />,
    );
    expect(screen.getByTestId("not-found")).toBeInTheDocument();
    expect(screen.queryByTestId("application-details")).not.toBeInTheDocument();
  });

  it("renders ApplicationDetails with required props", () => {
    render(
      <PageShow
        appConfig={baseAppConfig}
        application={baseApplication}
        params={baseParams}
      />,
    );
    expect(screen.getByTestId("application-details")).toBeInTheDocument();
    expect(screen.getByTestId("back-btn")).toHaveTextContent("/camden");
    expect(screen.getByTestId("page-main")).toBeInTheDocument();
  });

  it("passes documents, publicCommentSummary, and specialistCommentSummary if provided", () => {
    const documents: DprDocument[] = [{ id: "1", title: "Doc" } as any];
    const publicCommentSummary: PublicCommentSummary = {
      sentiment: {
        supportive: 1,
        neutral: 0,
        objection: 0,
      },
      totalComments: 1,
    };
    const specialistCommentSummary: SpecialistCommentSummary = {
      sentiment: {
        approved: 2,
        amendmentsNeeded: 0,
        objected: 0,
      },
      totalConsulted: 1,
      totalComments: 1,
    };

    render(
      <PageShow
        appConfig={baseAppConfig}
        application={baseApplication}
        params={baseParams}
        documents={documents}
        publicCommentSummary={publicCommentSummary}
        specialistCommentSummary={specialistCommentSummary}
      />,
    );
    const details = JSON.parse(
      screen.getByTestId("application-details").textContent!,
    );
    expect(details.documents).toEqual(documents);
    expect(details.publicCommentSummary).toEqual(publicCommentSummary);
    expect(details.specialistCommentSummary).toEqual(specialistCommentSummary);
  });
});
