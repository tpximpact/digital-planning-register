import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import config from "../../util/config.json";
import CommentPersonalDetails from "@/components/comment_personal_details";
import "@testing-library/jest-dom";

jest.mock("../../util/config.json", () => ({
  exampleCouncil: {
    pageContent: {
      council_reference_submit_comment_personal_details: {
        contact_planning_advice_link: "https://example.com/contact",
        corporate_privacy_statement_link: "https://example.com/privacy",
        planning_service_privacy_statement_link:
          "https://example.com/planning-privacy",
      },
    },
  },
}));

describe("CommentPersonalDetails", () => {
  const defaultProps = {
    council: "exampleCouncil",
    reference: "REF-001",
    navigateToPage: jest.fn(),
    isEditing: false,
    updateProgress: jest.fn(),
    setHasUnsavedChanges: jest.fn(),
  };

  beforeEach(() => {
    sessionStorage.clear();
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
    expect(screen.getByLabelText(/I consent to/)).toBeInTheDocument();
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
    expect(screen.getByText("You need to consent")).toBeInTheDocument();
    expect(defaultProps.navigateToPage).not.toHaveBeenCalled();
    expect(defaultProps.updateProgress).not.toHaveBeenCalled();
    expect(defaultProps.setHasUnsavedChanges).not.toHaveBeenCalled();
  });

  it("navigates to the next page, updates progress, and resets unsaved changes when the form is submitted with valid data", () => {
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
    fireEvent.click(screen.getByLabelText(/I consent to/));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(5);
    expect(defaultProps.updateProgress).toHaveBeenCalledWith(4);
    expect(defaultProps.setHasUnsavedChanges).toHaveBeenCalledWith(false);
    const storedData = sessionStorage.getItem("personalDetails_REF-001");
    expect(storedData && JSON.parse(storedData)).toEqual({
      name: "John Doe",
      address: "123 Main St",
      postcode: "AB12 3CD",
      emailAddress: "john@example.com",
      telephoneNumber: "01234567890",
      consent: true,
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
        consent: true,
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
    expect(screen.getByLabelText(/I consent to/)).toBeChecked();
  });

  it("sets hasUnsavedChanges to true when any field is modified", () => {
    render(<CommentPersonalDetails {...defaultProps} />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });

    expect(defaultProps.setHasUnsavedChanges).toHaveBeenCalledWith(true);
  });

  it("sets hasUnsavedChanges to true when consent checkbox is toggled", () => {
    render(<CommentPersonalDetails {...defaultProps} />);
    fireEvent.click(screen.getByLabelText(/I consent to/));

    expect(defaultProps.setHasUnsavedChanges).toHaveBeenCalledWith(true);
  });
});
