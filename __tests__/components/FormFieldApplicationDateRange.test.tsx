import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormFieldApplicationDateRange } from "@/components/FormFieldApplicationDateRange";
import {
  APPLICATION_DATERANGE_OPTIONS,
  APPLICATION_DATETYPE_OPTIONS,
} from "@/lib/planningApplication/search";
import { SearchParamsApplication } from "@/types";

const defaultSearchParams: SearchParamsApplication = {
  page: 1,
  resultsPerPage: 10,
  type: "simple",
  dateRange: undefined,
  dateType: undefined,
  dateRangeFrom: undefined,
  dateRangeTo: undefined,
};

describe("FormFieldApplicationDateRange", () => {
  it("renders all date type options", () => {
    render(
      <FormFieldApplicationDateRange searchParams={defaultSearchParams} />,
    );
    APPLICATION_DATETYPE_OPTIONS.forEach((option) => {
      expect(
        screen.getByRole("option", { name: option.label }),
      ).toBeInTheDocument();
    });
  });

  it("renders all date range radio options", () => {
    render(
      <FormFieldApplicationDateRange searchParams={defaultSearchParams} />,
    );
    APPLICATION_DATERANGE_OPTIONS.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it("checks the correct radio when dateRange is set", () => {
    render(
      <FormFieldApplicationDateRange
        searchParams={{ ...defaultSearchParams, dateRange: "fixed" }}
      />,
    );
    expect(screen.getByLabelText(/fixed/i)).toBeChecked();
  });

  it("shows the conditional date range fields when 'fixed' is selected", () => {
    render(
      <FormFieldApplicationDateRange
        searchParams={{ ...defaultSearchParams, dateRange: "fixed" }}
      />,
    );
    expect(screen.getByLabelText("From date")).toBeInTheDocument();
    expect(screen.getByLabelText("To date")).toBeInTheDocument();
  });

  it("hides the conditional date range fields when not 'fixed'", () => {
    render(
      <FormFieldApplicationDateRange
        searchParams={{ ...defaultSearchParams, dateRange: "month" }}
      />,
    );
    const conditionalDiv = document.getElementById("conditional-fixed");
    expect(conditionalDiv?.className).toMatch(
      /govuk-radios__conditional--hidden/,
    );
  });

  it("calls setShow when a radio is changed", () => {
    // Since setShow is internal, we test the visible effect
    render(
      <FormFieldApplicationDateRange searchParams={defaultSearchParams} />,
    );
    const fixedRadio = screen.getByLabelText(/fixed/i);
    fireEvent.click(fixedRadio);
    // The conditional should now be visible
    const conditionalDiv = document.getElementById("conditional-fixed");
    expect(conditionalDiv?.className).not.toMatch(
      /govuk-radios__conditional--hidden/,
    );
  });
});
