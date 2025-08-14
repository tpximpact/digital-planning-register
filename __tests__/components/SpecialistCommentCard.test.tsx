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
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { generateSpecialistComment } from "@mocks/dprNewApplicationFactory";
import { SpecialistComment } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";
import { SpecialistCommentCard } from "@/components/SpecialistCommentCard";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

jest.mock("@/util", () => ({
  formatDateTimeToDprDate: (d: string) => `MOCK_DATE(${d})`,
  pascalToSentenceCase: (s: string) => `MOCK_PASCAL(${s})`,
  capitalizeFirstLetter: (s: string) => `MOCK_CAPITAL(${s})`,
}));

jest.mock("@/lib/comments", () => ({
  ...jest.requireActual<typeof import("@/lib/comments")>("@/lib/comments"),
  formatSpecialistSentiment: (s: string) => `MOCK_SENTIMENT(${s})`,
}));

jest.mock("@/components/govukDpr/Attachment", () => ({
  Attachment: jest.fn(({ title, fileName }) => (
    <div data-testid="mock-attachment">{title || fileName}</div>
  )),
}));

describe("SpecialistCommentCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders skeleton placeholders when no specialist is provided", () => {
    const { container } = render(
      <SpecialistCommentCard specialist={undefined} />,
    );
    expect(
      container.querySelector(".dpr-specialist-comment-card__skeleton--item"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".dpr-specialist-comment-card__skeleton--title"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".dpr-specialist-comment-card__skeleton--body"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Organisation or specialism"),
    ).not.toBeInTheDocument();
  });

  it("renders all main sections with complete specialist data", () => {
    const specialistData = generateSpecialistComment(1);
    specialistData.organisationSpecialism = "Mock Org";
    specialistData.reason = "Other";
    specialistData.firstConsultedAt = "2023-01-15T10:00:00Z";
    specialistData.comments[0].sentiment = "approved";
    specialistData.comments[0].metadata!.publishedAt = "2023-01-20T11:00:00Z";
    specialistData.comments[0].files = [
      {
        id: 1,
        name: "File A",
        url: "urlA",
        type: ["otherEvidence"],
        association: "specialistComment",
      },
      {
        id: 2,
        name: "File B",
        url: "urlB",
        type: ["otherEvidence"],
        association: "specialistComment",
      },
    ] as SpecialistComment["files"];
    specialistData.comments[0].commentRedacted = "This is a short comment.";

    render(<SpecialistCommentCard specialist={specialistData} />);

    expect(screen.getByText("Organisation or specialism")).toBeInTheDocument();
    expect(screen.getByText("Mock Org")).toBeInTheDocument();

    expect(screen.getByText("Reason for consultation")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();

    expect(
      screen.getByText("Sentiment towards application"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("MOCK_CAPITAL(MOCK_PASCAL(approved))"),
    ).toBeInTheDocument();

    expect(screen.getByText("Date Consulted")).toBeInTheDocument();
    expect(
      screen.getByText("MOCK_DATE(2023-01-15T10:00:00Z)"),
    ).toBeInTheDocument();

    expect(screen.getByText("Date of Response")).toBeInTheDocument();
    expect(
      screen.getByText("MOCK_DATE(2023-01-20T11:00:00Z)"),
    ).toBeInTheDocument();

    expect(screen.getByText("Files")).toBeInTheDocument();
    expect(screen.getByText("File A")).toBeInTheDocument();
    expect(screen.getByText("File B")).toBeInTheDocument();
    expect(screen.queryByText("No files")).not.toBeInTheDocument();

    expect(screen.getByText("Full comment")).toBeInTheDocument();
    expect(screen.getByText("This is a short comment.")).toBeInTheDocument();
    expect(
      screen.queryByText("Read the rest of this comment"),
    ).not.toBeInTheDocument();
  });

  it("renders constraint reason with intersecting entities", () => {
    const specialistData = generateSpecialistComment(1);
    specialistData.reason = "Constraint";
    specialistData.constraints = [
      {
        value: "greenBelt",
        description: "Area Viridis I",
        intersects: true,
        entities: [
          {
            name: "Sectio Parci Loci",
            source: { text: "Planning Data", url: "https://example.com/" },
          },
          {
            name: "Zona Urbana",
            source: { text: "Planning Data", url: "https://example.com/" },
          },
        ],
      },
    ];

    render(<SpecialistCommentCard specialist={specialistData} />);

    expect(screen.getByText("Reason for consultation")).toBeInTheDocument();
    expect(screen.getByText("Area Viridis I")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("Sectio Parci Loci")).toBeInTheDocument();
    expect(screen.getByText("Zona Urbana")).toBeInTheDocument();
  });

  it("renders constraint reason with non-intersecting constraint", () => {
    const specialistData = generateSpecialistComment(1);
    specialistData.reason = "Constraint";
    specialistData.constraints = [
      {
        value: "flood.zoneThree.a",
        description: "Flumen Zona Tres A",
        intersects: false,
      },
    ];

    render(<SpecialistCommentCard specialist={specialistData} />);

    expect(screen.getByText("Reason for consultation")).toBeInTheDocument();
    expect(screen.getByText("Flumen Zona Tres A")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders 'Constraint' text if reason is Constraint but no constraint data", () => {
    const specialistData = generateSpecialistComment(1);
    specialistData.reason = "Constraint";
    specialistData.constraints = [];

    render(<SpecialistCommentCard specialist={specialistData} />);

    expect(screen.getByText("Reason for consultation")).toBeInTheDocument();
    expect(screen.getByText("Constraint")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("truncates long comments and allows expansion/minimization", async () => {
    const specialistLongComment = generateSpecialistComment(1000);

    render(<SpecialistCommentCard specialist={specialistLongComment} />);
    const expandButton = screen.getByText("Read the rest of this comment");
    expect(expandButton).toBeInTheDocument();

    await userEvent.click(expandButton);

    expect(screen.getByText("Minimise this comment")).toBeInTheDocument();
  });

  it("does not show expand button for short comments", () => {
    const shortComment = "Short comment.";
    const specialistData = generateSpecialistComment(1);
    specialistData.comments[0].commentRedacted = shortComment;

    render(<SpecialistCommentCard specialist={specialistData} />);

    expect(screen.getByText(shortComment)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /read the rest/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /minimise/i }),
    ).not.toBeInTheDocument();
  });

  it("renders 'No files' when files array is empty", () => {
    const specialistData = generateSpecialistComment(1);
    specialistData.comments[0].files = [];

    render(<SpecialistCommentCard specialist={specialistData} />);

    expect(screen.getByText("Files")).toBeInTheDocument();
    expect(screen.getByText("No files")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-attachment")).not.toBeInTheDocument();
  });

  it("renders 'View all responses' button when multiple comments exist", () => {
    const specialistData = generateSpecialistComment(2);
    specialistData.comments.push(generateSpecialistComment(1).comments[0]);
    specialistData.comments[0].commentRedacted = "Comment 1";
    specialistData.comments[1].commentRedacted = "Comment 2";

    render(<SpecialistCommentCard specialist={specialistData} />);

    const viewAllButton = screen.getByText(
      `View all responses (${specialistData.comments.length})`,
    );
    expect(viewAllButton).toBeInTheDocument();
  });

  it("does not render 'View all responses' button when only one comment exists", () => {
    const specialistData = generateSpecialistComment(1);

    render(<SpecialistCommentCard specialist={specialistData} />);

    expect(
      screen.queryByRole("button", { name: /view all responses/i }),
    ).not.toBeInTheDocument();
  });
});
