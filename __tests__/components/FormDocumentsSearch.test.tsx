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
  FormDocumentsSearch,
  FormDocumentsSearchProps,
} from "@/components/FormDocumentsSearch";
import type { PrototypeFileType } from "digital-planning-data-schemas/types/schemas/prototypeApplication/enums/FileType.ts";
import { AppConfig } from "@/config/types";

const defaultProps: FormDocumentsSearchProps = {
  searchParams: {
    page: 1,
    resultsPerPage: 25,
  },
  appConfig: {
    features: {
      documentSearchFields: [
        "name",
        "type",
        "publishedAtFrom",
        "publishedAtTo",
        "resultsPerPage",
      ],
    },
  } as AppConfig,
  action: "/search",
};

describe("FormDocumentsSearch", () => {
  it("renders the form with all fields", () => {
    render(<FormDocumentsSearch {...defaultProps} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Document type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Published from date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Published to date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Documents per page/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Clear search" }),
    ).toBeInTheDocument();
  });

  it("renders without a form if no action is provided", () => {
    render(<FormDocumentsSearch {...defaultProps} action={undefined} />);
    // Should not find a <form>
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    // But should still render the content
    expect(screen.getByText(/Search documents/i)).toBeInTheDocument();
  });

  it("sets default values from searchParams", () => {
    const props = {
      ...defaultProps,
      searchParams: {
        ...defaultProps.searchParams,
        resultsPerPage: 50,
        name: "Test doc",
        type: "bioaerosolAssessment" as PrototypeFileType,
        publishedAtFrom: "2024-01-01",
        publishedAtTo: "2024-01-31",
      },
    };
    render(<FormDocumentsSearch {...props} />);
    expect(screen.getByLabelText(/Name/i)).toHaveValue("Test doc");
    expect(screen.getByLabelText(/Document type/i)).toHaveValue(
      "bioaerosolAssessment",
    );
    expect(screen.getByLabelText(/Published from date/i)).toHaveValue(
      "2024-01-01",
    );
    expect(screen.getByLabelText(/Published to date/i)).toHaveValue(
      "2024-01-31",
    );
    expect(screen.getByLabelText(/Documents per page/i)).toHaveValue("50");
  });

  it("renders only enabled fields based on feature flags", () => {
    const updatedDefaultProps = {
      ...defaultProps,
      appConfig: {} as AppConfig,
    };
    render(<FormDocumentsSearch {...updatedDefaultProps} />);
    // Should not find any of the fields that are disabled by feature flags
    expect(screen.queryByLabelText(/Name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Document type/i)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/Published from date/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/Published to date/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/Documents per page/i),
    ).not.toBeInTheDocument();
  });
});
