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
import userEvent from "@testing-library/user-event";
import { FormCommentsSearch } from "@/components/FormCommentsSearch";
import { SearchParams } from "@/types";

describe("FormCommentsSearch", () => {
  const baseProps = {
    council: "camden",
    reference: "123",
    type: "public" as const,
  };

  it("renders with default empty fields when no searchParams are provided", () => {
    render(<FormCommentsSearch {...baseProps} />);

    expect(screen.getByLabelText("Contents")).toHaveValue("");
    expect(screen.getByLabelText("Comments per page")).toHaveValue("10");
  });

  it("renders with provided searchParams", () => {
    const searchParams: SearchParams = {
      query: "climate",
      resultsPerPage: 25,
      page: 1,
    };

    render(<FormCommentsSearch {...baseProps} searchParams={searchParams} />);

    expect(screen.getByLabelText("Contents")).toHaveValue("climate");
    expect(screen.getByLabelText("Comments per page")).toHaveValue("25");
  });

  it("sets the correct form action and method", () => {
    render(<FormCommentsSearch {...baseProps} />);

    const form = screen.getByRole("form", { name: "Search comments" });
    expect(form).toHaveAttribute("action", "/camden/123/comments");
    expect(form).toHaveAttribute("method", "get");
  });

  it("includes a hidden input for comment type", () => {
    render(<FormCommentsSearch {...baseProps} />);
    const hiddenInput = screen.getByDisplayValue("public");
    expect(hiddenInput).toHaveAttribute("type", "hidden");
    expect(hiddenInput).toHaveAttribute("name", "type");
  });

  it("has a working clear search link", () => {
    render(<FormCommentsSearch {...baseProps} />);
    const clearButton = screen.getByRole("button", { name: /Clear search/i });
    expect(clearButton).toHaveAttribute(
      "href",
      "/camden/123/comments?type=public",
    );
  });

  it("allows user input and selection changes", async () => {
    const user = userEvent.setup();
    render(<FormCommentsSearch {...baseProps} />);

    const input = screen.getByLabelText("Contents");
    await user.type(input, "green space");

    expect(input).toHaveValue("green space");

    const select = screen.getByLabelText("Comments per page");
    await user.selectOptions(select, "50");

    expect(select).toHaveValue("50");
  });
});
