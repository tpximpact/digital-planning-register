import React from "react";
import { render, screen } from "@testing-library/react";
import { PhaseBanner } from "@/components/govuk/PhaseBanner";
import "@testing-library/jest-dom";

describe("PhaseBanner", () => {
  it("renders the banner with correct text", () => {
    render(<PhaseBanner />);
    const link = screen.getByRole("link", { name: /give your feedback/i });

    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText(/This is a new service/i)).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://docs.google.com/forms/d/e/1FAIpQLSfERu46lRoEk6hBQj6diQNwe8QM8HZorNotNRPj-yJ3FkJaxQ/viewform",
    );
  });
});
