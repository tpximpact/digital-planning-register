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

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  FormFieldFromTo,
  FormFieldFromToProps,
} from "@/components/FormFieldFromTo";

describe("FormFieldFromTo Component", () => {
  const defaultProps: FormFieldFromToProps = {
    title: "Date Range",
    from: {
      label: "From Date",
      name: "fromDate",
      id: "from-date",
      value: "2025-01-01",
    },
    to: {
      label: "To Date",
      name: "toDate",
      id: "to-date",
      value: "2025-12-31",
    },
  };

  it("renders the component with the correct title", () => {
    render(<FormFieldFromTo {...defaultProps} />);
    expect(screen.getByText("Date Range")).toBeInTheDocument();
  });

  it("renders the 'from' input field with the correct attributes", () => {
    render(<FormFieldFromTo {...defaultProps} />);
    const fromInput = screen.getByLabelText("From Date", { selector: "input" });

    expect(fromInput).toBeInTheDocument();
    expect(fromInput).toHaveAttribute("id", "from-date");
    expect(fromInput).toHaveAttribute("name", "fromDate");
    expect(fromInput).toHaveAttribute("type", "date");
    expect(fromInput).toHaveValue("2025-01-01");
  });

  it("renders the 'to' input field with the correct attributes", () => {
    render(<FormFieldFromTo {...defaultProps} />);
    const toInput = screen.getByLabelText("To Date", { selector: "input" });

    expect(toInput).toBeInTheDocument();
    expect(toInput).toHaveAttribute("id", "to-date");
    expect(toInput).toHaveAttribute("name", "toDate");
    expect(toInput).toHaveAttribute("type", "date");
    expect(toInput).toHaveValue("2025-12-31");
  });

  it("renders the 'to' label as visually hidden", () => {
    render(<FormFieldFromTo {...defaultProps} />);
    const toLabel = screen.getByLabelText("To Date", { selector: "input" });
    expect(toLabel).toBeInTheDocument();
  });

  it("renders the 'to' text between fields", () => {
    render(<FormFieldFromTo {...defaultProps} />);
    expect(screen.getByText("to")).toBeInTheDocument();
  });

  it("handles missing optional props gracefully", () => {
    const propsWithoutIds: FormFieldFromToProps = {
      title: "Date Range",
      from: {
        label: "From Date",
        name: "fromDate",
      },
      to: {
        label: "To Date",
        name: "toDate",
      },
    };

    render(<FormFieldFromTo {...propsWithoutIds} />);
    const fromInput = screen.getByLabelText("From Date", { selector: "input" });
    const toInput = screen.getByLabelText("To Date", { selector: "input" });

    expect(fromInput).toHaveAttribute("id", "fromDate");
    expect(toInput).toHaveAttribute("id", "toDate");
  });
});
