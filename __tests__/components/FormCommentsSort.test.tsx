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
import { FormCommentsSort } from "@/components/FormCommentsSort";
import { SearchParams } from "@/types";
import { CommentType } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentType";

export interface FormCommentsSortProps {
  council: string;
  reference: string;
  type: CommentType;
  searchParams?: SearchParams;
}

const baseProps: FormCommentsSortProps = {
  council: "camden",
  reference: "123",
  type: "public",
  searchParams: {
    orderBy: "asc",
    page: 1,
    resultsPerPage: 10,
  },
};

describe("FormCommentsSort", () => {
  it("renders the form correctly", () => {
    render(<FormCommentsSort {...baseProps} />);
    const form = screen.getByRole("form", { name: /sort comments/i });
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute("action", "/camden/123/comments");
    expect(form).toHaveAttribute("method", "get");
  });

  it("shows the correct default sort order", () => {
    render(<FormCommentsSort {...baseProps} />);
    const select = screen.getByRole("combobox", { name: /sort by/i });
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("asc");
  });

  it("renders the hidden input for type", () => {
    render(<FormCommentsSort {...baseProps} />);
    const hiddenInput = screen.getByDisplayValue("public");
    expect(hiddenInput).toHaveAttribute("type", "hidden");
    expect(hiddenInput).toHaveAttribute("name", "type");
  });

  it("renders the Apply sorting button", () => {
    render(<FormCommentsSort {...baseProps} />);
    const button = screen.getByRole("button", { name: /apply sorting/i });
    expect(button).toBeInTheDocument();
  });

  it("submits with selected sort order", async () => {
    const user = userEvent.setup();
    render(<FormCommentsSort {...baseProps} />);

    const select = screen.getByLabelText(/sort by/i);
    await user.selectOptions(select, "desc");

    expect((select as HTMLSelectElement).value).toBe("desc");
  });
});
