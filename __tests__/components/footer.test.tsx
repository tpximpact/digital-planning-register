import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer";
import "@testing-library/jest-dom";

// Mock the Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage({ alt, ...props }: any) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img alt={alt || ""} {...props} data-testid="mocked-image" />;
  },
}));

describe("Footer", () => {
  it("renders the Planning logo", () => {
    render(<Footer />);
    const logo = screen.getByTestId("mocked-image");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/logos/odp-logo.svg");
    expect(logo).toHaveAttribute("alt", "Open Digital Planning Logo");
  });
});
