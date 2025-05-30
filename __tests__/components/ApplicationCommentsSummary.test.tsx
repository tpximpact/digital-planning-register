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

jest.mock("@/components/button", () => ({
  Button: ({ children, ...props }: any) => (
    <a {...props} role="button">
      {children}
    </a>
  ),
}));

jest.mock("@/util", () => ({
  capitalizeFirstLetter: jest.fn((str: string) => {
    if (!str) return str;
    const lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }),
}));

jest.mock("@/util/pascalToSentenceCase", () => ({
  pascalToSentenceCase: jest.fn((str: string) => {
    return str.replace(/([A-Z])/g, " $1").trim();
  }),
}));

const renderComponent = (
  props: React.ComponentProps<typeof ApplicationCommentsSummary>,
) => {
  render(<ApplicationCommentsSummary {...props} />);
};

describe("ApplicationCommentsSummary", () => {
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
  it("returns null when summary or sentiment is missing", () => {
    const { container } = render(
      <ApplicationCommentsSummary
        type="public"
        reference="ABC/123"
        councilSlug="public-council-1"
      />,
    );
    expect(container.firstChild).toBeNull();

    const { container: noSentimentContainer } = render(
      <ApplicationCommentsSummary
        type="public"
        reference="ABC/123"
        councilSlug="public-council-1"
        summary={{ totalComments: 5 } as any} // missing sentiment
      />,
    );
    expect(noSentimentContainer.firstChild).toBeNull();
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
