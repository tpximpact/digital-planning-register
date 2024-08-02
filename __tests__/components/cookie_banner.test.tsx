import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CookieBanner from "@/components/cookie_banner";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      refresh: jest.fn(),
    };
  },
}));

jest.mock("../../src/actions", () => ({
  setConsentCookie: jest.fn(),
}));

describe("CookieBanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    document.cookie = "";
  });

  it("renders the initial banner when no consent cookie is set", () => {
    render(<CookieBanner />);
    expect(screen.getByText("Cookies on Register")).toBeInTheDocument();
    expect(screen.getByText("Accept analytics cookies")).toBeInTheDocument();
    expect(screen.getByText("Reject analytics cookies")).toBeInTheDocument();
  });

  it("does not render the banner when consent cookie is set", () => {
    document.cookie = "consentCookie=true";
    render(<CookieBanner />);
    expect(screen.queryByText("Cookies on Register")).not.toBeInTheDocument();
  });
});
