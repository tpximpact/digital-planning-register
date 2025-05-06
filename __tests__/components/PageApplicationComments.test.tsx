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
import { PageApplicationComments } from "@/components/PageApplicationComments";
import { createAppConfig } from "@mocks/appConfigFactory";
import {
  generateComment,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { generateApplicationSubmission } from "@mocks/odpApplicationSubmission";
import { DprComment } from "@/types";
import { CommentType } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentType";

const baseProps = {
  reference: "123",
  application: generateApplicationSubmission,
  appConfig: createAppConfig("public-council-1"),
  params: { council: "public-council-1", reference: "123" },
  type: "public" as CommentType,
  pagination: generatePagination(1, 10),
  searchParams: {
    page: 1,
    resultsPerPage: 10,
    orderBy: "desc",
  },
};

jest.mock("@/components/govuk/Pagination", () => ({
  Pagination: () => <nav data-testid="pagination">Mocked Pagination</nav>,
}));

describe("PageApplicationComments", () => {
  it("displays the correct heading based on the type prop", () => {
    const { getByRole } = render(
      <PageApplicationComments comments={null} {...baseProps} />,
    );

    const heading = getByRole("heading", { name: /public/i });
    expect(heading).toBeInTheDocument();
  });

  it("calls the CommentCard component when there are comments", () => {
    const comments = generateNResults<DprComment>(5, generateComment);
    render(<PageApplicationComments {...baseProps} comments={comments} />);

    const commentCards = screen.getAllByRole("heading", { name: /Comment #/i });
    expect(commentCards).toHaveLength(5); // Expect 5 CommentCard components
  });

  it("calls the ContentNoResult component when there are no comments", () => {
    render(<PageApplicationComments {...baseProps} comments={[]} />);

    const noResult = screen.getByText(/no comments match your search/i);
    expect(noResult).toBeInTheDocument();
  });

  it("calls the ContentNotFound component when appConfig isn’t provided", () => {
    render(<PageApplicationComments {...baseProps} appConfig={null} />);

    const notFound = screen.getByText(/page not found/i);
    expect(notFound).toBeInTheDocument();
  });

  it("calls the Pagination component if pagination.totalPages > 1", () => {
    const pagination = generatePagination(1, 20); // page 1, 20 results per page, total = 2 pages
    const comments = generateNResults<DprComment>(20, generateComment);

    render(
      <PageApplicationComments
        {...baseProps}
        comments={comments}
        pagination={pagination}
      />,
    );

    const paginationComponent = screen.getByTestId("pagination");
    expect(paginationComponent).toBeInTheDocument();
  });

  it("hides the Pagination component if pagination.totalPages <= 1", () => {
    const pagination = generatePagination(1, 10); // only 1 page
    const comments = generateNResults<DprComment>(10, generateComment);

    render(
      <PageApplicationComments
        {...baseProps}
        comments={comments}
        pagination={pagination}
      />,
    );

    const paginationComponent = screen.queryByTestId("pagination");
    expect(paginationComponent).not.toBeInTheDocument();
  });
});
