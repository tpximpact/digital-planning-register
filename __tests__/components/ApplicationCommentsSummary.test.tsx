import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  ApplicationCommentsSummary,
  ApplicationCommentsSummaryWithSuspense,
} from "@/components/ApplicationCommentsSummary";
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
        reference="ABC/123"
        councilSlug="public-council-1"
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("returns null when summary is provided but sentiment is missing", () => {
    const { container } = render(
      <ApplicationCommentsSummary
        reference="ABC/123"
        councilSlug="public-council-1"
        summary={{ totalComments: 3 } as any} // forcing invalid data
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders the 'View all' button with correct text", () => {
    renderComponent({
      type: "public",
      summary: {
        totalComments: 3,
        sentiment: {
          supportive: 1,
          objection: 1,
          neutral: 1,
        },
      },
      reference: "ABC/123",
      councilSlug: "public-council-1",
    });

    expect(
      screen.getByRole("button", { name: /view all 3 public comments/i }),
    ).toBeInTheDocument();
  });

  it("uses correct links for public sentiments", () => {
    renderComponent({
      type: "public",
      summary: {
        totalComments: 3,
        sentiment: {
          supportive: 1,
          objection: 1,
          neutral: 1,
        },
      },
      reference: "ABC/123",
      councilSlug: "public-council-1",
    });

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute(
        "href",
        expect.stringContaining("type=public"),
      );
    });
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
      expect(screen.getByText(/1 Neutral/)).toBeInTheDocument();
      expect(screen.getByText(/1 Support/i)).toBeInTheDocument();
      expect(screen.getByText(/1 Objection/i)).toBeInTheDocument();
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
describe("ApplicationCommentsSummaryWithSuspense", () => {
  it("renders skeleton when summary is missing and no councilSlug/reference", () => {
    render(
      <ApplicationCommentsSummaryWithSuspense
        reference=""
        councilSlug=""
        type="public"
      />,
    );

    expect(screen.getByTestId("summary-skeleton")).toBeInTheDocument();
  });
});
