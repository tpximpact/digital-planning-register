import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BackLink } from "@/components/govuk/BackLink";
import { useRouter } from "next/navigation";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackLink component", () => {
  const router = { back: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(router);
    document.documentElement.className = ""; // Reset classes
  });

  it("renders the link with 'Back' text when JavaScript is enabled", () => {
    render(<BackLink href="/test" />);

    // Simulate the effect that enables JavaScript
    expect(document.documentElement.className).toBe("js-enabled");
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("applies the correct className and href attributes", () => {
    render(<BackLink href="/test" />);
    const backLink = screen.getByRole("link", { name: /back/i });

    expect(backLink).toHaveClass("govuk-back-link back-button");
    expect(backLink).toHaveAttribute("href", "/test");
  });

  it("calls router.back() when no href is provided and link is clicked", () => {
    render(<BackLink />);
    const backLink = screen.getByRole("link", { name: /back/i });
    fireEvent.click(backLink);
    expect(router.back).toHaveBeenCalled();
  });
});
