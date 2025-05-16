import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ApplicationCommentsSummary } from "@/components/ApplicationCommentsSummary";
import {
  PublicCommentSummary,
  SpecialistCommentSummary,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/CommentSummary";

jest.mock("@/components/SentimentIcon", () => ({
  SentimentIcon: ({ sentiment }: { sentiment: string }) => sentiment,
}));

const renderComponent = (
  props: React.ComponentProps<typeof ApplicationCommentsSummary>,
) => {
  render(<ApplicationCommentsSummary {...props} />);
};

describe("ApplicationCommentsSummary", () => {
  it("renders null when summary is not provided", () => {
    const { container } = render(
      <ApplicationCommentsSummary
        summary={undefined}
        type="public"
        reference="ABC/123"
        councilSlug="public-council-1"
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  describe("public type", () => {
    const summary: PublicCommentSummary = {
      totalComments: 3,
      sentiment: {
        supportive: 1,
        objection: 1,
        neutral: 1,
      },
    };

    it("renders public comment count correctly", () => {
      renderComponent({
        type: "public",
        summary,
        reference: "ABC/123",
        councilSlug: "public-council-1",
      });

      expect(screen.getByText("3 comments received")).toBeInTheDocument();
    });

    it("renders sentiment breakdown", () => {
      renderComponent({
        type: "public",
        summary,
        reference: "ABC/123",
        councilSlug: "public-council-1",
      });

      // Match combined text split across elements
      expect(screen.getByText(/1 neutral/)).toBeInTheDocument();
      expect(screen.getByText(/1 support/i)).toBeInTheDocument();
      expect(screen.getByText(/1 opposed/i)).toBeInTheDocument();
    });
    it("renders the skeleton when sentiment data is missing", () => {
      renderComponent({
        type: "public",
        summary: {
          totalComments: 3,
          // @ts-expect-error testing missing sentiment
          sentiment: undefined,
        },
        reference: "abc",
        councilSlug: "slug",
      });

      expect(screen.getByTestId("summary-skeleton")).toBeInTheDocument(); // Requires a test ID in <SummarySkeleton />
    });
  });

  describe("specialist type", () => {
    const summary: SpecialistCommentSummary = {
      totalComments: 2,
      totalConsulted: 4,
      sentiment: {
        approved: 1,
        amendmentsNeeded: 1,
        objected: 0,
      },
    };

    it("renders the correct section title based on type", () => {
      renderComponent({
        type: "specialist",
        summary: {
          totalComments: 2,
          totalConsulted: 4,
          sentiment: {
            approved: 1,
            amendmentsNeeded: 1,
            objected: 0,
          },
        },
        reference: "ABC/123",
        councilSlug: "public-council-1",
      });

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Specialist Comments",
      );
    });

    it("renders consultation header and pending response text", () => {
      renderComponent({
        type: "specialist",
        summary,
        reference: "ABC/123",
        councilSlug: "public-council-1",
      });

      expect(
        screen.getByText("4 specialists contacted for consultation"),
      ).toBeInTheDocument();
      expect(screen.getByText("2 yet to respond")).toBeInTheDocument();
    });

    it("renders sentiment breakdown", () => {
      renderComponent({
        type: "specialist",
        summary,
        reference: "ABC/123",
        councilSlug: "public-council-1",
      });
      // Match combined text split across elements
      expect(screen.getByText(/1 approve/i)).toBeInTheDocument();
      expect(screen.getByText(/1 amendments needed/i)).toBeInTheDocument();
      expect(screen.getByText(/0 objected/i)).toBeInTheDocument();
    });

    it("uses correct links for specialist sentiments", () => {
      renderComponent({
        type: "specialist",
        summary,
        reference: "ABC/123",
        councilSlug: "public-council-1",
      });
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveAttribute(
          "href",
          expect.stringContaining("type=specialist"),
        );
      });
    });
  });
});
