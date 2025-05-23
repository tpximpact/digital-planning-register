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
import { render, screen, fireEvent } from "@testing-library/react";
import CommentPersonalDetails from "@/components/comment_personal_details";
import "@testing-library/jest-dom";
import { createAppConfig } from "@mocks/appConfigFactory";
import { trackClient } from "@/lib/dprAnalytics";

jest.mock("@/lib/dprAnalytics", () => ({
  trackClient: jest.fn(),
}));

describe("CommentPersonalDetails", () => {
  const defaultProps = {
    councilConfig: createAppConfig("public-council-1").council,
    reference: "REF-001",
    navigateToPage: jest.fn(),
    isEditing: false,
    updateProgress: jest.fn(),
  };

  beforeEach(() => {
    sessionStorage.clear();
    window.scrollTo = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();
    jest.clearAllMocks();
  });

  it("renders the component with the correct content", () => {
    render(<CommentPersonalDetails {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: "Your details" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Postcode")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Telephone number")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();
  });

  it("displays validation errors when the form is submitted with invalid data", () => {
    render(<CommentPersonalDetails {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Your name is required")).toBeInTheDocument();
    expect(screen.getByText("Your address is required")).toBeInTheDocument();
    expect(
      screen.getByText("A valid postcode is required"),
    ).toBeInTheDocument();
    expect(defaultProps.navigateToPage).not.toHaveBeenCalled();
    expect(defaultProps.updateProgress).not.toHaveBeenCalled();
    expect(trackClient).toHaveBeenCalledWith("comment_validation_error", {
      message: "error in personal details",
    });
  });

  it("navigates to the next page, updates progress when the form is submitted with valid data", () => {
    render(<CommentPersonalDetails {...defaultProps} />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("Postcode"), {
      target: { value: "AB12 3CD" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Telephone number"), {
      target: { value: "01234567890" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(5);
    expect(defaultProps.updateProgress).toHaveBeenCalledWith(4);
    const storedData = sessionStorage.getItem("personalDetails_REF-001");
    expect(storedData && JSON.parse(storedData)).toEqual({
      name: "John Doe",
      address: "123 Main St",
      postcode: "AB12 3CD",
      emailAddress: "john@example.com",
      telephoneNumber: "01234567890",
    });
  });

  it("loads the stored personal details from sessionStorage when available", () => {
    sessionStorage.setItem(
      "personalDetails_REF-001",
      JSON.stringify({
        name: "Jane Smith",
        address: "456 Oak St",
        postcode: "XY98 7ZA",
        emailAddress: "jane@example.com",
        telephoneNumber: "09876543210",
      }),
    );
    render(<CommentPersonalDetails {...defaultProps} />);

    expect(screen.getByLabelText("Name")).toHaveValue("Jane Smith");
    expect(screen.getByLabelText("Address")).toHaveValue("456 Oak St");
    expect(screen.getByLabelText("Postcode")).toHaveValue("XY98 7ZA");
    expect(screen.getByLabelText("Email address")).toHaveValue(
      "jane@example.com",
    );
    expect(screen.getByLabelText("Telephone number")).toHaveValue(
      "09876543210",
    );
    expect(trackClient).not.toHaveBeenCalled();
  });
});
