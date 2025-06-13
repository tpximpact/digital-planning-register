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
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CommentsSummary } from "@/components/CommentsSummary";
import {
  PublicCommentSummary,
  SpecialistCommentSummary,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/CommentSummary";
import { CommentType } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentType";

jest.mock("@/components/SentimentIcon", () => ({
  SentimentIcon: ({ sentiment }: any) => (
    <span data-testid={`sentiment-icon-${sentiment}`} />
  ),
}));

jest.mock("@/components/button", () => ({
  Button: ({ children, ...props }: any) => (
    <a data-testid="view-all-btn" {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/util", () => ({
  capitalizeFirstLetter: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  pascalToSentenceCase: jest.fn((str: string) => {
    return str.replace(/([A-Z])/g, " $1").trim();
  }),
}));

jest.mock("@/lib/navigation", () => ({
  createPathFromParams: jest.fn(() => "/test-council-1/ref-1234/comments"),
}));

describe("CommentsSummary", () => {
  const params = {
    council: "test-council-1",
    reference: "ref-1234",
  };

  const publicSummary: PublicCommentSummary = {
    totalComments: 3,
    sentiment: {
      supportive: 1,
      objection: 1,
      neutral: 1,
    },
  };

  const specialistSummary: SpecialistCommentSummary = {
    totalComments: 2,
    totalConsulted: 4,
    sentiment: {
      approved: 1,
      amendmentsNeeded: 1,
      objected: 0,
    },
  };

  it("returns null when type is missing", () => {
    const { container } = render(
      <CommentsSummary
        params={params}
        type={undefined as unknown as CommentType}
        summary={publicSummary}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("returns null when summary is missing", () => {
    const { container } = render(
      <CommentsSummary
        params={params}
        type="public"
        summary={{} as PublicCommentSummary}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  describe("Public", () => {
    it("Renders correctly", () => {
      const { container } = render(
        <CommentsSummary
          params={params}
          type="public"
          summary={publicSummary}
        />,
      );

      // title and id
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Public Comments",
      );
      expect(container.firstChild).toHaveAttribute(
        "id",
        "public-comments-summary",
      );

      // plural
      expect(screen.getByText("3 comments received")).toBeInTheDocument();

      // summary
      expect(
        screen.getByTestId("sentiment-icon-supportive"),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("sentiment-icon-objection"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("sentiment-icon-neutral")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "1 Supportive" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "1 Objection" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "1 Neutral" }),
      ).toBeInTheDocument();

      // footer
      expect(screen.getByTestId("view-all-btn")).toHaveAttribute(
        "href",
        expect.stringContaining("type=public"),
      );
      expect(
        screen.getByText(/View all 3 public comments/),
      ).toBeInTheDocument();
    });

    describe("pluralization", () => {
      it("shows summary in plural when 0 or > 1 ", () => {
        render(
          <CommentsSummary
            params={params}
            type="public"
            summary={{
              totalComments: 0,
              sentiment: {
                supportive: 0,
                objection: 0,
                neutral: 0,
              },
            }}
          />,
        );

        expect(
          screen.getByText(
            "No comments from the public have been published at this time.",
          ),
        ).toBeInTheDocument();
        expect(screen.queryByTestId("view-all-btn")).not.toBeInTheDocument();

        render(
          <CommentsSummary
            params={params}
            type="public"
            summary={{
              totalComments: 3,
              sentiment: {
                supportive: 1,
                objection: 1,
                neutral: 1,
              },
            }}
          />,
        );

        expect(screen.getByText("3 comments received")).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "1 Supportive" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "1 Objection" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "1 Neutral" }),
        ).toBeInTheDocument();
        expect(
          screen.getByText(/View all 3 public comments/),
        ).toBeInTheDocument();
      });

      it("shows summary in plural when === 1 ", () => {
        render(
          <CommentsSummary
            params={params}
            type="public"
            summary={{
              totalComments: 1,
              sentiment: {
                supportive: 1,
                objection: 0,
                neutral: 0,
              },
            }}
          />,
        );

        expect(screen.getByText("1 comment received")).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "1 Supportive" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "0 Objection" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "0 Neutral" }),
        ).toBeInTheDocument();
        expect(screen.getByText(/View public comments/)).toBeInTheDocument();
      });
    });
  });

  describe("Specialist", () => {
    it("Renders correctly", () => {
      const { container } = render(
        <CommentsSummary
          params={params}
          type="specialist"
          summary={specialistSummary}
        />,
      );

      // title and id
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Specialist Comments",
      );
      expect(container.firstChild).toHaveAttribute(
        "id",
        "specialist-comments-summary",
      );

      // plural
      expect(
        screen.getByText("4 specialists contacted for consultation"),
      ).toBeInTheDocument();
      expect(screen.getByText("2 yet to respond")).toBeInTheDocument();

      // summary
      expect(screen.getByTestId("sentiment-icon-approved")).toBeInTheDocument();
      expect(
        screen.getByTestId("sentiment-icon-amendmentsNeeded"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("sentiment-icon-objected")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "1 Approved" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "1 Amendments Needed" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "0 Objected" }),
      ).toBeInTheDocument();

      // footer
      expect(screen.getByTestId("view-all-btn")).toHaveAttribute(
        "href",
        expect.stringContaining("type=specialist"),
      );
      expect(
        screen.getByText(/View all 2 specialist comments/),
      ).toBeInTheDocument();
    });

    describe("pluralization", () => {
      it("shows summary in plural when 0 or > 1 ", () => {
        render(
          <CommentsSummary
            params={params}
            type="specialist"
            summary={{
              totalComments: 0,
              totalConsulted: 0,
              sentiment: {
                approved: 0,
                amendmentsNeeded: 0,
                objected: 0,
              },
            }}
          />,
        );

        expect(
          screen.getByText(
            "No comments from specialists have been published at this time.",
          ),
        ).toBeInTheDocument();

        expect(screen.queryByTestId("view-all-btn")).not.toBeInTheDocument();

        render(
          <CommentsSummary
            params={params}
            type="specialist"
            summary={{
              totalComments: 2,
              totalConsulted: 4,
              sentiment: {
                approved: 1,
                amendmentsNeeded: 1,
                objected: 0,
              },
            }}
          />,
        );

        expect(
          screen.getByText("4 specialists contacted for consultation"),
        ).toBeInTheDocument();
        expect(screen.getByText("2 yet to respond")).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "1 Approved" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "1 Amendments Needed" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "0 Objected" }),
        ).toBeInTheDocument();

        expect(
          screen.getByText(/View all 2 specialist comments/),
        ).toBeInTheDocument();
      });

      it("shows summary in plural when === 1 ", () => {
        render(
          <CommentsSummary
            params={params}
            type="specialist"
            summary={{
              totalComments: 1,
              totalConsulted: 4,
              sentiment: {
                approved: 1,
                amendmentsNeeded: 0,
                objected: 0,
              },
            }}
          />,
        );

        expect(
          screen.getByText("4 specialists contacted for consultation"),
        ).toBeInTheDocument();
        expect(screen.getByText("3 yet to respond")).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "1 Approved" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "0 Amendments Needed" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "0 Objected" }),
        ).toBeInTheDocument();

        expect(
          screen.getByText(/View specialist comments/),
        ).toBeInTheDocument();
      });
    });
  });
});
