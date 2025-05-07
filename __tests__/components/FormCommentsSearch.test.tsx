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
import { fireEvent, render, screen } from "@testing-library/react";
import {
  FormCommentsSearch,
  FormCommentsSearchProps,
} from "@/components/FormCommentsSearch";
import { COMMENT_RESULTSPERPAGE_DEFAULT } from "@/lib/comments";
import { useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("FormCommentsSearch", () => {
  const defaultProps: FormCommentsSearchProps = {
    council: "public-council-1",
    reference: "12345",
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "public",
    },
    action: "/test-action",
  };

  it("renders the form with the correct default values", () => {
    render(<FormCommentsSearch {...defaultProps} />);

    // Check if the form is rendered
    const form = screen.getByRole("form", { name: /Search comments/i });
    expect(form).toBeInTheDocument();

    // Check if the select element has the correct default value
    expect(form).toHaveAttribute("action", "/test-action");

    // Check if the various inputs have the correct default values

    // query
    const queryInput = screen.getByLabelText(/Contents/i);
    expect(queryInput).not.toHaveValue();

    // resultsPerPage
    const resultsPerPageSelect = screen.getByLabelText(/Comments per page/i);
    expect(resultsPerPageSelect).toHaveValue(
      COMMENT_RESULTSPERPAGE_DEFAULT.toString(),
    );

    // add other fields defaults here
  });

  it("renders without the form tag when action is not provided", () => {
    render(
      <FormCommentsSearch
        council={defaultProps.council}
        reference={defaultProps.reference}
        searchParams={defaultProps.searchParams}
      />,
    );

    // Check that the form is not rendered
    const form = screen.queryByRole("form", { name: /Search comments/i });
    expect(form).not.toBeInTheDocument();

    // Check that the query input is still rendered
    const queryInput = screen.getByLabelText(/Contents/i);
    expect(queryInput).toBeInTheDocument();
  });

  it("submits the correct values for fields", () => {
    render(<FormCommentsSearch {...defaultProps} />);

    // Check the form submission
    const form = screen.getByRole("form", { name: /Search comments/i });

    // get input fields for each field
    const queryInput = screen.getByLabelText(/Contents/i);
    const resultsPerPageSelect = screen.getByLabelText(/Comments per page/i);

    // Simulate form submission for each field
    fireEvent.change(queryInput, { target: { value: "new-query" } });
    fireEvent.change(resultsPerPageSelect, { target: { value: "50" } });

    fireEvent.submit(form);

    // Check if the form has the updated values for each field
    expect(queryInput).toHaveValue("new-query");
    expect(resultsPerPageSelect).toHaveValue("50");
  });

  it("resets the query parameters when 'Clear search' is clicked", () => {
    render(<FormCommentsSearch {...defaultProps} />);

    // Check the "Clear search" link
    const clearSearchLink = screen.getByRole("button", {
      name: /Clear search/i,
    });
    expect(clearSearchLink).toHaveAttribute(
      "href",
      "/public-council-1/12345/comments?",
    );
  });

  describe("url has query parameters", () => {
    const mockSearchParams = new URLSearchParams({
      type: "public",
      query: "test",
      resultsPerPage: "10",
      sortBy: "receivedAt",
      orderBy: "desc",
    });

    beforeEach(() => {
      (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    });

    const defaultProps: FormCommentsSearchProps = {
      council: "public-council-1",
      reference: "12345",
      searchParams: {
        page: 1,
        resultsPerPage: 10,
        type: "public",
      },
      action: "/test-action",
    };

    it("resets the query parameters when 'Clear search' is clicked", () => {
      render(<FormCommentsSearch {...defaultProps} />);

      // Check the "Clear search" link
      const clearSearchLink = screen.getByRole("button", {
        name: /Clear search/i,
      });
      expect(clearSearchLink).toHaveAttribute(
        "href",
        "/public-council-1/12345/comments?type=public&sortBy=receivedAt&orderBy=desc",
      );
    });
  });
});
