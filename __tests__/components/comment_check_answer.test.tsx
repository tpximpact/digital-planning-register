import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { postComment } from "@/actions/api/v1";
import CommentCheckAnswer from "@/components/comment_check_answer";
import "@testing-library/jest-dom";
import { sendGTMEvent } from "@next/third-parties/google";
import { createAppConfig } from "@mocks/appConfigFactory";
import { getAppConfig } from "@/config";

jest.mock("@/actions/api/v1", () => ({
  postComment: jest.fn(),
}));

jest.mock("@next/third-parties/google", () => ({
  sendGTMEvent: jest.fn(),
}));

jest.mock("@/config", () => ({
  getAppConfig: jest.fn(),
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe("CommentCheckAnswer", () => {
  const appConfig = createAppConfig("public-council-1");

  beforeEach(() => {
    (getAppConfig as jest.Mock).mockReturnValue(appConfig);
  });

  const defaultProps = {
    councilConfig: appConfig.council,
    reference: "REF-001",
    applicationId: 1,
    navigateToPage: jest.fn(),
    updateProgress: jest.fn(),
  };

  beforeEach(() => {
    sessionStorage.clear();
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
    sessionStorage.setItem("sentiment_REF-001", "supportive");
    sessionStorage.setItem("selectedTopics_REF-001", "use");
    sessionStorage.setItem("comment_use_REF-001", "Use comment");
    sessionStorage.setItem(
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
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

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

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("submits the comment and navigates to the confirmation page on successful submission", async () => {
    (postComment as jest.Mock).mockResolvedValueOnce({ status: { code: 200 } });

    render(<CommentCheckAnswer {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Accept and send" }));

    await waitFor(() => {
      expect(postComment).toHaveBeenCalledWith(
        "local",
        "public-council-1",
        1,
        expect.any(Object),
      );
      expect(sendGTMEvent).toHaveBeenCalledWith({ event: "comment_submit" });
      expect(defaultProps.updateProgress).toHaveBeenCalledWith(5);
      expect(defaultProps.navigateToPage).toHaveBeenCalledWith(6);
      expect(sessionStorage.getItem("sentiment_REF-001")).toBeNull();
      expect(sessionStorage.getItem("selectedTopics_REF-001")).toBeNull();
      expect(sessionStorage.getItem("personalDetails_REF-001")).toBeNull();
    });
  });

  it("displays an error message when the comment submission fails", async () => {
    (postComment as jest.Mock).mockRejectedValueOnce(
      new Error("Submission failed"),
    );

    render(<CommentCheckAnswer {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Accept and send" }));

    await waitFor(() => {
      expect(
        screen.getByText("There was a problem submitting your comment"),
      ).toBeInTheDocument();
      expect(sendGTMEvent).toHaveBeenCalledWith({ event: "error_submission" });
      expect(defaultProps.updateProgress).not.toHaveBeenCalled();
      expect(defaultProps.navigateToPage).not.toHaveBeenCalled();
    });
  });
});
