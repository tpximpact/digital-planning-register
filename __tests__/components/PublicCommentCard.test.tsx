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
import { PublicCommentCard } from "@/components/PublicCommentCard";
import { generatePublicComment } from "@mocks/dprNewApplicationFactory";
import type { TopicAndComments } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/PublicComment.ts";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

jest.mock("@/util", () => ({
  capitaliseWord: (w: string) => `MOCK_CAP(${w})`,
  formatDateTimeToDprDate: (d: string) => `MOCK_DATE(${d})`,
}));

jest.mock("@/lib/comments", () => ({
  COMMENT_PUBLIC_TOPIC_OPTIONS: [
    { value: "foo", label: "FooLabel", hint: "HintFoo" },
    { value: "bar", label: "BarLabel", hint: "HintBar" },
    { value: "other", label: "OtherLabel", hint: "HintOther" },
  ],
}));

jest.mock("@/components/PublicCommentCard/PublicCommentCard.utils", () => ({
  collapseTopicsByCharLimit: jest.fn((topics: TopicAndComments[]) =>
    topics.map((t) => ({
      ...t,
      comment: t.comment.length > 5 ? t.comment.slice(0, 5) : t.comment,
      truncated: t.comment.length > 5,
    })),
  ),
}));

describe("PublicCommentCard", () => {
  it("renders skeleton placeholders when no comment is provided", () => {
    const { container } = render(<PublicCommentCard comment={undefined} />);
    expect(
      container.getElementsByClassName(
        "dpr-public-comment-card__skeleton--item",
      ),
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName(
        "dpr-public-comment-card__skeleton--title",
      ),
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName(
        "dpr-public-comment-card__skeleton--body",
      ),
    ).toHaveLength(1);
  });

  it("renders an array-based comment and toggles expand/collapse", async () => {
    const comment = generatePublicComment(2);
    const longText = "ABCDEFGHIJKL";
    (comment.commentRedacted as TopicAndComments[])[0].comment = longText;

    render(<PublicCommentCard comment={comment} />);
    expect(screen.getByText(`Comment #${comment.id}`)).toBeInTheDocument();
    expect(
      screen.getByText(`MOCK_DATE(${comment.metadata!.publishedAt})`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`MOCK_CAP(${comment.sentiment!})`),
    ).toBeInTheDocument();
    expect(screen.getByText(longText.slice(0, 5) + "…")).toBeInTheDocument();
    const btn = screen.getByText("Read the rest of this comment");
    await userEvent.click(btn);
    expect(btn).toHaveTextContent("Minimise this comment");
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it("renders a string-only comment correctly", async () => {
    const comment = generatePublicComment(1);
    const original = (comment.commentRedacted as TopicAndComments[])[0].comment;
    comment.commentRedacted = original;

    render(<PublicCommentCard comment={comment} />);
    expect(screen.getByText(`Comment #${comment.id}`)).toBeInTheDocument();
    expect(
      screen.getByText(`MOCK_DATE(${comment.metadata!.publishedAt})`),
    ).toBeInTheDocument();
    const snippet = original.length > 5 ? original.slice(0, 5) + "…" : original;
    expect(screen.getByText(snippet)).toBeInTheDocument();
    const btn = screen.getByText("Read the rest of this comment");
    await userEvent.click(btn);
    expect(btn).toHaveTextContent("Minimise this comment");
    expect(screen.getByText(original)).toBeInTheDocument();
  });
});
