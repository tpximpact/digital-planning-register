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
import { render, screen, fireEvent } from "@testing-library/react";
import {
  FormCommentsSort,
  FormCommentsSortProps,
} from "@/components/FormCommentsSort";
import {
  COMMENT_ORDERBY_DEFAULT,
  COMMENT_SORTBY_DEFAULT,
} from "@/lib/comments";

describe("FormCommentsSort", () => {
  const defaultProps: FormCommentsSortProps = {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "public",
    },
    action: "/test-action",
  };

  it("renders the form correctly", () => {
    render(<FormCommentsSort {...defaultProps} />);

    // Check if the form is rendered
    const form = screen.getByRole("form", { name: /Sort comments/i });
    expect(form).toBeInTheDocument();

    // Check if the select element has the correct default value
    expect(form).toHaveAttribute("action", "/test-action");

    // shows the correct default sort order
    const select = screen.getByLabelText(/Sort by/i);
    expect(select).toHaveValue(
      `${COMMENT_SORTBY_DEFAULT}_${COMMENT_ORDERBY_DEFAULT}`,
    );

    // renders the Apply sorting button
    const button = screen.getByRole("button", { name: /apply sorting/i });
    expect(button).toBeInTheDocument();

    // renders the hidden input for sortBy
    const hiddenSortBy = screen.getByDisplayValue(COMMENT_SORTBY_DEFAULT);
    expect(hiddenSortBy).toHaveAttribute("type", "hidden");
    expect(hiddenSortBy).toHaveAttribute("name", "sortBy");

    // renders the hidden input for orderBy
    const hiddenOrderBy = screen.getByDisplayValue(COMMENT_ORDERBY_DEFAULT);
    expect(hiddenOrderBy).toHaveAttribute("type", "hidden");
    expect(hiddenOrderBy).toHaveAttribute("name", "orderBy");
  });

  it("renders without the form tag when action is not provided", () => {
    render(<FormCommentsSort searchParams={defaultProps.searchParams} />);

    // Check that the form is not rendered
    const form = screen.queryByRole("form", { name: /Sort comments/i });
    expect(form).not.toBeInTheDocument();

    // Check that the select element is still rendered
    const select = screen.getByLabelText(/Sort by/i);
    expect(select).toBeInTheDocument();
  });

  it("updates the state when a new sorting option is selected", () => {
    render(<FormCommentsSort {...defaultProps} />);

    // Select a new sorting option
    const select = screen.getByLabelText(/Sort by/i);
    fireEvent.change(select, { target: { value: "receivedAt_asc" } });

    // Check if the select value is updated
    expect(select).toHaveValue("receivedAt_asc");
  });

  it("includes hidden inputs for sortBy and orderBy in the form", () => {
    render(<FormCommentsSort {...defaultProps} />);

    // Check if the hidden inputs are rendered with the correct values
    const sortByInput = screen.getByDisplayValue(COMMENT_SORTBY_DEFAULT);
    const orderByInput = screen.getByDisplayValue(COMMENT_ORDERBY_DEFAULT);

    expect(sortByInput).toHaveAttribute("name", "sortBy");
    expect(orderByInput).toHaveAttribute("name", "orderBy");
  });

  it("calls the handleChange function when a new option is selected", () => {
    render(<FormCommentsSort {...defaultProps} />);

    // Select a new sorting option
    const select = screen.getByLabelText(/Sort by/i);
    fireEvent.change(select, { target: { value: "receivedAt_asc" } });

    // Check if the hidden inputs are updated
    const sortByInput = screen.getByDisplayValue("receivedAt");
    const orderByInput = screen.getByDisplayValue("asc");

    expect(sortByInput).toHaveAttribute("name", "sortBy");
    expect(orderByInput).toHaveAttribute("name", "orderBy");
  });
});
