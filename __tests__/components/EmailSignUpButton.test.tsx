import { render, screen } from "@testing-library/react";
import { EmailSignUpButton } from "@/components/EmailSignUpButton";
import "@testing-library/jest-dom";

describe("EmailSignUpButton Component", () => {
  it("renders as a button element by default", () => {
    render(<EmailSignUpButton href="/" />);
    const buttonElement = screen.getByText("Sign up for email alerts");
    expect(buttonElement).toBeInTheDocument();
  });
});
