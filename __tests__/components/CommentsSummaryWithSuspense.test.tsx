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
import { CommentsSummaryWithSuspense } from "@/components/CommentsSummaryWithSuspense";

// Mock child components
jest.mock("@/components/CommentsSummary", () => ({
  CommentsSummary: (props: any) => (
    <div data-testid="comments-summary">{JSON.stringify(props)}</div>
  ),
  CommentsSummarySkeleton: (props: any) => (
    <div data-testid="comments-summary-skeleton">{props.type}</div>
  ),
}));

describe("CommentsSummaryWithSuspense", () => {
  const params = { council: "public-council-1", reference: "APP-123" };

  it("renders CommentsSummary directly if summary is provided", () => {
    render(
      <CommentsSummaryWithSuspense
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
    expect(screen.getByTestId("comments-summary")).toBeInTheDocument();
    expect(
      screen.queryByTestId("comments-summary-skeleton"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("comments-summary-loader"),
    ).not.toBeInTheDocument();
  });
});
