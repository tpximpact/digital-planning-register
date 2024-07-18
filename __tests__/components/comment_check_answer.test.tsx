import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { submitComment } from "@/actions";
import CommentCheckAnswer from "@/components/comment_check_answer";
import "@testing-library/jest-dom";

jest.mock("../../src/actions", () => ({
  submitComment: jest.fn(),
}));

describe("CommentCheckAnswer", () => {
  const defaultProps = {
    council: "exampleCouncil",
    reference: "REF-001",
    applicationId: 1,
    navigateToPage: jest.fn(),
    updateProgress: jest.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders the component with the correct content", () => {
    render(<CommentCheckAnswer {...defaultProps} />);

    expect(
      screen.getByRole("heading", {
        name: "Check what you have written before sending your comment",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Accept and send" }),
    ).toBeInTheDocument();
  });

  it("displays the stored sentiment, selected topics, comments, and personal details", () => {
    localStorage.setItem("sentiment_REF-001", "supportive");
    localStorage.setItem("selectedTopics_REF-001", "use");
    localStorage.setItem("comment_use_REF-001", "Use comment");
    localStorage.setItem(
      "personalDetails_REF-001",
      JSON.stringify({
        name: "John Doe",
        emailAddress: "john@example.com",
        address: "123 Main St",
        postcode: "AB12 3CD",
        telephoneNumber: "01234567890",
      }),
    );

    render(<CommentCheckAnswer {...defaultProps} />);

    expect(screen.getByText("Supportive")).toBeInTheDocument();
    expect(screen.getByText("Use comment")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("AB12 3CD")).toBeInTheDocument();
    expect(screen.getByText("01234567890")).toBeInTheDocument();
  });

  it('navigates to the correct page when the "Change" link is clicked', () => {
    render(<CommentCheckAnswer {...defaultProps} />);

    fireEvent.click(
      screen.getByLabelText("Change how you feel about this development"),
    );
    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(1, { edit: true });

    fireEvent.click(
      screen.getByLabelText("Change what topics you want to comment on"),
    );
    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(2, { edit: true });

    fireEvent.click(screen.getByLabelText("Change name"));
    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(4, { edit: true });

    fireEvent.click(screen.getByLabelText("Change address"));
    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(4, { edit: true });

    fireEvent.click(screen.getByLabelText("Change postcode"));
    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(4, { edit: true });

    fireEvent.click(screen.getByLabelText("Change email address"));
    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(4, { edit: true });

    fireEvent.click(screen.getByLabelText("Change telephone number"));
    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(4, { edit: true });
  });

  it("submits the comment and navigates to the confirmation page on successful submission", async () => {
    (submitComment as jest.Mock).mockResolvedValueOnce({ status: 200 });

    render(<CommentCheckAnswer {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Accept and send" }));

    await waitFor(() => {
      expect(submitComment).toHaveBeenCalledWith(
        1,
        "exampleCouncil",
        expect.any(Object),
      );
      expect(defaultProps.updateProgress).toHaveBeenCalledWith(5);
      expect(defaultProps.navigateToPage).toHaveBeenCalledWith(6);
      expect(localStorage.getItem("sentiment_REF-001")).toBeNull();
      expect(localStorage.getItem("selectedTopics_REF-001")).toBeNull();
      expect(localStorage.getItem("personalDetails_REF-001")).toBeNull();
    });
  });

  it("displays an error message when the comment submission fails", async () => {
    (submitComment as jest.Mock).mockRejectedValueOnce(
      new Error("Submission failed"),
    );

    render(<CommentCheckAnswer {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Accept and send" }));

    await waitFor(() => {
      expect(
        screen.getByText("There was a problem submitting your comment"),
      ).toBeInTheDocument();
      expect(defaultProps.updateProgress).not.toHaveBeenCalled();
      expect(defaultProps.navigateToPage).not.toHaveBeenCalled();
    });
  });
});
