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
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import {
  ApplicationDetails,
  ApplicationDetailsProps,
} from "@/components/ApplicationDetails";
import { AppConfig } from "@/config/types";
import { DprApplication } from "@/types";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";
import { AssessmentInProgress } from "@/components/ApplicationCard/ApplicationCard.stories";

// Mock child components
jest.mock("@/components/ApplicationHero", () => ({
  ApplicationHero: () => <div data-testid="application-hero" />,
}));
jest.mock("@/components/ContentSidebar", () => ({
  ContentSidebar: ({ content }: any) => (
    <div data-testid="content-sidebar">
      {content.map((c: any) => c.title).join(",")}
    </div>
  ),
}));
jest.mock("@/components/button", () => ({
  Button: ({ children }: any) => <button>{children}</button>,
}));
jest.mock("@/components/ApplicationProgressInfo", () => ({
  ApplicationProgressInfo: () => (
    <div data-testid="application-progress-info"></div>
  ),
}));
jest.mock("@/components/ApplicationAppeals", () => ({
  ApplicationAppeals: (props: any) => (
    <div data-testid="application-appeals">{JSON.stringify(props)}</div>
  ),
}));
jest.mock("@/components/DocumentsListWithSuspense", () => ({
  DocumentsListWithSuspense: () => (
    <div data-testid="documents-list-with-suspense" />
  ),
}));
jest.mock("@/components/ApplicationPeople", () => ({
  ApplicationPeople: () => <div data-testid="application-people" />,
}));
jest.mock("@/components/CommentsListWithSuspense", () => ({
  CommentsListWithSuspense: (props: any) => (
    <div data-testid={`comments-list-with-suspense-${props.type}`} />
  ),
}));
jest.mock("@/components/ContentError", () => ({
  ContentError: () => <div data-testid="content-error" />,
}));

const {
  consultation,
  assessmentInProgress,
  planningOfficerDetermined,
  appealDetermined,
} = generateExampleApplications();

const baseAppConfig = {
  council: {
    slug: "public-council-1",
    name: "Public Council 1",
    pageContent: {
      email_alerts: {
        sign_up_for_alerts_link: "/alerts",
      },
    },
    specialistComments: true,
    publicComments: true,
  },
};

const baseProps = {
  reference: "APP-123",
  appConfig: baseAppConfig as AppConfig,
};

describe.only("ApplicationDetails", () => {
  it("renders ContentError if council config is missing", () => {
    render(
      <ApplicationDetails
        {...baseProps}
        appConfig={{ ...baseAppConfig, council: undefined } as any}
        application={planningOfficerDetermined}
      />,
    );
    expect(screen.getByTestId("content-error")).toBeInTheDocument();
  });

  it("renders the main sections and sidebar", () => {
    render(
      <ApplicationDetails
        {...baseProps}
        application={planningOfficerDetermined}
      />,
    );
    expect(screen.getByText(/Application reference/i)).toBeInTheDocument();
    expect(screen.getByTestId("application-hero")).toBeInTheDocument();
    expect(screen.getByTestId("content-sidebar")).toHaveTextContent(
      "Key information,Progress,Description,Documents,People,Specialist comments,Public comments",
    );
    expect(screen.getByTestId("application-progress-info")).toBeInTheDocument();
    expect(
      screen.getByTestId("documents-list-with-suspense"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("application-people")).toBeInTheDocument();
    expect(
      screen.getByTestId("comments-list-with-suspense-specialist"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("comments-list-with-suspense-public"),
    ).toBeInTheDocument();
  });

  it("renders the comment button if comments are enabled", () => {
    render(<ApplicationDetails {...baseProps} application={consultation} />);
    expect(
      screen.getByRole("button", { name: /Comment on this application/i }),
    ).toBeInTheDocument();

    cleanup();

    render(
      <ApplicationDetails
        {...baseProps}
        application={{
          ...assessmentInProgress,
          data: {
            ...assessmentInProgress.data,
            localPlanningAuthority: {
              commentsAcceptedUntilDecision: true,
            },
          },
        }}
      />,
    );
    expect(
      screen.getByRole("button", { name: /Comment on this application/i }),
    ).toBeInTheDocument();
  });

  it("renders the email alerts button if sign_up_for_alerts_link is set", () => {
    render(<ApplicationDetails {...baseProps} application={consultation} />);
    expect(
      screen.getByRole("button", { name: /Sign up for email alerts/i }),
    ).toBeInTheDocument();
  });

  it("renders ApplicationAppeals if appeal reason or files exist", () => {
    render(
      <ApplicationDetails {...baseProps} application={appealDetermined} />,
    );
    expect(screen.getByTestId("application-appeals")).toBeInTheDocument();
  });

  it("renders applicant and case officer in ApplicationPeople", () => {
    render(
      <ApplicationDetails
        {...baseProps}
        application={planningOfficerDetermined}
      />,
    );
    expect(screen.getByTestId("application-people")).toBeInTheDocument();
  });

  it("does not render comments sections if not enabled", () => {
    const appConfig = {
      ...baseAppConfig,
      council: {
        ...baseAppConfig.council,
        specialistComments: false,
        publicComments: false,
      },
    };
    render(
      <ApplicationDetails
        {...baseProps}
        appConfig={appConfig as any}
        application={appealDetermined}
      />,
    );
    expect(
      screen.queryByTestId("comments-list-with-suspense-specialist"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("comments-list-with-suspense-public"),
    ).not.toBeInTheDocument();
  });
});
