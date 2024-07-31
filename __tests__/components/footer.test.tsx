import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer";
import "@testing-library/jest-dom";
import { useParams, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("../../util/config.json", () => ({
  someCouncil: {
    privacyPolicy: "https://example.com/privacy",
  },
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage({ alt, ...props }: any) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img alt={alt || ""} {...props} data-testid="mocked-image" />;
  },
}));

describe("Footer", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ council: "someCouncil" });
    (usePathname as jest.Mock).mockReturnValue("/someCouncil/somepath");
  });
  it("renders the Planning logo", () => {
    render(<Footer />);
    const logo = screen.getByTestId("mocked-image");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/logos/odp-logo.svg");
    expect(logo).toHaveAttribute("alt", "Open Digital Planning Logo");
  });

  it("renders the privacy policy link when on a council page", () => {
    render(<Footer />);
    const privacyPolicy = screen.getByText("Privacy policy");
    expect(privacyPolicy).toBeInTheDocument();
    expect(privacyPolicy).toHaveAttribute(
      "href",
      "https://example.com/privacy",
    );
  });

  it("does not render the privacy policy link when not on a council page", () => {
    (usePathname as jest.Mock).mockReturnValue("/somepath");
    render(<Footer />);
    const privacyPolicy = screen.queryByText("Privacy policy");
    expect(privacyPolicy).not.toBeInTheDocument();
  });
});
