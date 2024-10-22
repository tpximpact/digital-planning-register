import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@/components/Header";
import { usePathname } from "next/navigation";
import { createAppConfig } from "@mocks/appConfigFactory";
import { useRouter } from "next/router";

// Mock the usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock the Image component from next/image
// eslint-disable-next-line react/display-name, @next/next/no-img-element
jest.mock("next/image", () => (props: any) => <img alt="test" {...props} />);

// jest.mock("@/components/Menu", () => ({}));

describe("Header", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/test-path");
  });

  it("renders the Header component with no council title when not inside /[council] page", () => {
    const appConfig = createAppConfig();
    const councilConfig = appConfig.council;
    render(<Header appConfig={appConfig} councilConfig={councilConfig} />);
    expect(screen.getByTestId("page-title").textContent).toBe(
      "Digital Planning Register",
    );
    expect(screen.queryByTestId("page-council")).toBeNull();
  });

  it("renders the Header component with no council title when not inside /[council] page", () => {
    const appConfig = createAppConfig("public-council-1");
    const councilConfig = appConfig.council;
    render(<Header appConfig={appConfig} councilConfig={councilConfig} />);
    expect(screen.getByTestId("page-title").textContent).toBe(
      "Digital Planning Register",
    );
    expect(screen.getByTestId("page-council").textContent).toBe(
      "Public Council 1",
    );
  });
});
