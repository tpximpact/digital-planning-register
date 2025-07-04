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
import { ApplicationDetails } from "@/components/ApplicationDetails";
import { AppConfig } from "@/config/types";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";
import { CommentsSummaryWithSuspense } from "@/components/CommentsSummaryWithSuspense";
import { CommentsListWithSuspense } from "@/components/CommentsListWithSuspense";
import { DprComment } from "@/types";

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
jest.mock("@/components/CommentsSummaryWithSuspense", () => ({
  CommentsSummaryWithSuspense: jest.fn((props) => (
    <div data-testid={`comments-summary-with-suspense-${props.type}`} />
  )),
}));
jest.mock("@/components/CommentsListWithSuspense", () => ({
  CommentsListWithSuspense: jest.fn((props) => (
    <div data-testid={`comments-list-with-suspense-${props.type}`} />
  )),
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

  describe("While comment summary is not supported", () => {
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
          appConfig={appConfig as AppConfig}
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

    it("Passes public comments summary to CommentsListWithSuspense", () => {
      const comments = [
        {
          id: "comment-1",
          text: "This is a public comment",
          sentiment: "supportive",
        },
      ];

      render(
        <ApplicationDetails
          {...baseProps}
          application={planningOfficerDetermined}
          publicComments={comments as unknown as DprComment[]}
        />,
      );

      expect(
        screen.getByTestId("comments-list-with-suspense-public"),
      ).toBeInTheDocument();
      expect(CommentsListWithSuspense).toHaveBeenCalledWith(
        expect.objectContaining({
          councilSlug: "public-council-1",
          reference: "APP-123",
          type: "public",
          resultsPerPage: 3,
          comments: comments as unknown as DprComment[],
        }),
        expect.anything(),
      );
    });

    it("Passes specialist comments summary to CommentsListWithSuspense", () => {
      const comments = [
        {
          id: "comment-1",
          text: "This is a specialist comment",
          sentiment: "supportive",
        },
      ];

      render(
        <ApplicationDetails
          {...baseProps}
          application={planningOfficerDetermined}
          specialistComments={comments as unknown as DprComment[]}
        />,
      );

      expect(
        screen.getByTestId("comments-list-with-suspense-specialist"),
      ).toBeInTheDocument();
      expect(CommentsListWithSuspense).toHaveBeenCalledWith(
        expect.objectContaining({
          councilSlug: "public-council-1",
          reference: "APP-123",
          type: "specialist",
          resultsPerPage: 3,
          comments: comments as unknown as DprComment[],
        }),
        expect.anything(),
      );
    });
  });

  describe("When commentSearchFields includes sentimentSpecialist and sentiment", () => {
    const baseAppConfigWithSentiment = {
      ...baseAppConfig,
      features: {
        commentSearchFields: ["sentiment", "sentimentSpecialist"],
      },
    };

    it("does not render comments sections if not enabled", () => {
      const appConfig = {
        ...baseAppConfigWithSentiment,
        council: {
          ...baseAppConfigWithSentiment.council,
          specialistComments: false,
          publicComments: false,
        },
      };
      render(
        <ApplicationDetails
          {...baseProps}
          appConfig={appConfig as AppConfig}
          application={appealDetermined}
        />,
      );
      expect(
        screen.queryByTestId("comments-summary-with-suspense-specialist"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("comments-summary-with-suspense-public"),
      ).not.toBeInTheDocument();
    });

    it("Passes public comments summary to CommentsSummaryWithSuspense", () => {
      const publicCommentSummary = {
        sentiment: {
          supportive: 2,
          neutral: 0,
          objection: 0,
        },
        totalComments: 2,
      };

      render(
        <ApplicationDetails
          {...baseProps}
          appConfig={baseAppConfigWithSentiment as AppConfig}
          application={planningOfficerDetermined}
          publicCommentSummary={publicCommentSummary}
        />,
      );

      expect(
        screen.getByTestId("comments-summary-with-suspense-public"),
      ).toBeInTheDocument();
      expect(CommentsSummaryWithSuspense).toHaveBeenCalledWith(
        expect.objectContaining({
          params: { council: "public-council-1", reference: "APP-123" },
          type: "public",
          summary: publicCommentSummary,
        }),
        expect.anything(),
      );
    });

    it("Passes specialist comments summary to CommentsSummaryWithSuspense", () => {
      const specialistCommentSummary = {
        sentiment: {
          approved: 2,
          amendmentsNeeded: 0,
          objected: 0,
        },
        totalConsulted: 2,
        totalComments: 2,
      };

      render(
        <ApplicationDetails
          {...baseProps}
          appConfig={baseAppConfigWithSentiment as AppConfig}
          application={planningOfficerDetermined}
          specialistCommentSummary={specialistCommentSummary}
        />,
      );

      expect(
        screen.getByTestId("comments-summary-with-suspense-specialist"),
      ).toBeInTheDocument();
      expect(CommentsSummaryWithSuspense).toHaveBeenCalledWith(
        expect.objectContaining({
          params: { council: "public-council-1", reference: "APP-123" },
          type: "specialist",
          summary: specialistCommentSummary,
        }),
        expect.anything(),
      );
    });
  });
});
