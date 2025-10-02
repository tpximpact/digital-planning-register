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
import {
  PageApplicationComments,
  PageApplicationCommentsProps,
} from "@/components/PageApplicationComments";
import { createAppConfig } from "@mocks/appConfigFactory";
import {
  generateComment,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { DprComment } from "@/types";
import type { CommentType } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/CommentType.ts";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";

jest.mock("@/components/ContextSetter", () => ({
  ContextSetterWithSuspense: jest.fn(() => (
    <div data-testid="ContextSetterWithSuspense" />
  )),
}));

jest.mock("@/components/FormCommentsSearch", () => ({
  FormCommentsSearch: jest.fn(() => <div data-testid="FormCommentsSearch" />),
}));

jest.mock("@/components/FormCommentsSort", () => ({
  FormCommentsSort: jest.fn(() => <div data-testid="FormCommentsSort" />),
}));

jest.mock("@/components/PublicCommentCard", () => ({
  PublicCommentCard: jest.fn(() => <div data-testid="PublicCommentCard"></div>),
}));

jest.mock("@/components/govuk/Pagination", () => ({
  Pagination: jest.fn(() => <div data-testid="Pagination" />),
}));

jest.mock("@/components/ContentNotFound", () => ({
  ContentNotFound: jest.fn(() => <div data-testid="ContentNotFound" />),
}));

jest.mock("@/components/ContentNoResult", () => ({
  ContentNoResult: jest.fn(() => <div data-testid="ContentNoResult" />),
}));

const { consultation } = generateExampleApplications();
const appConfig = createAppConfig("public-council-1");
const comments = generateNResults<DprComment>(10, generateComment);

describe("PageApplicationComments", () => {
  const defaultProps = {
    params: {
      council: "public-council-1",
      reference: "12345",
    },
    application: consultation,
    appConfig: appConfig,
    pagination: generatePagination(1, 50),
    searchParams: {
      page: 1,
      resultsPerPage: 25,
      type: "public" as CommentType,
    },
    comments: comments,
  };

  it("renders the default component correctly", () => {
    render(<PageApplicationComments {...defaultProps} />);

    // Check the heading
    const heading = screen.getByRole("heading", {
      name: "Public Comments",
      level: 1,
    });
    expect(heading).toBeInTheDocument();

    // check search and sort filters present
    expect(screen.getByTestId("FormCommentsSearch")).toBeInTheDocument();
    expect(screen.getByTestId("FormCommentsSort")).toBeInTheDocument();

    // Check if PublicCommentCard is rendered for each comment
    const commentCards = screen.getAllByTestId("PublicCommentCard");
    expect(commentCards).toHaveLength(10);

    // Check if Pagination is rendered
    expect(screen.getByTestId("Pagination")).toBeInTheDocument();
  });

  it("renders the ContentNotFound component when appConfig is missing", () => {
    const props = {
      ...defaultProps,
      appConfig: null,
    } as unknown as PageApplicationCommentsProps;
    render(<PageApplicationComments {...props} />);

    // Check if ContentNotFound is rendered
    expect(screen.getByTestId("ContentNotFound")).toBeInTheDocument();
  });

  // remove this when unskipping the below tests
  it("renders the ContentNoResult component when there are no comments", () => {
    const props = { ...defaultProps, comments: null };
    render(<PageApplicationComments {...props} />);

    // Check if ContentNoResult is rendered
    expect(screen.getByTestId("ContentNoResult")).toBeInTheDocument();
  });

  it.skip("renders the ContentNoResult component when there are no results from the query", () => {
    const props = {
      ...defaultProps,
      searchParams: { ...defaultProps.searchParams, query: "some results" },
    };
    render(<PageApplicationComments {...props} />);
    // Check if ContentNoResult is rendered
    expect(screen.getByTestId("ContentNoResult")).toBeInTheDocument();
  });

  it.skip("renders no comments have been published when there are no comments at all", () => {
    const props = {
      ...defaultProps,
      comments: [],
      pagination: generatePagination(1, 0),
    };
    render(<PageApplicationComments {...props} />);

    // Check if ContentNoResult is rendered
    const notFound = screen.getByText(
      /No comments from the public have been published at this time./i,
    );
    expect(notFound).toBeInTheDocument();
  });

  it("does not render Pagination when totalPages is 1", () => {
    const props = {
      ...defaultProps,
      pagination: generatePagination(1, 10),
    };
    render(<PageApplicationComments {...props} />);

    // Check that Pagination is not rendered
    expect(screen.queryByTestId("Pagination")).not.toBeInTheDocument();
  });
});
