import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@/components/Header";
import Link, { LinkProps } from "next/link";
import { createAppConfig } from "@mocks/appConfigFactory";

jest.mock("@/components/Menu", () => ({
  Menu: () => <div data-testid="menu"></div>,
}));

jest.mock("next/link", () => {
  return ({
    href,
    children,
    className,
  }: LinkProps & { children: ReactNode; className?: string }) => {
    return (
      <a href={typeof href === "string" ? href : "#"} className={className}>
        {children}
      </a>
    );
  };
});

jest.mock("@/components/CouncilLogos", () => ({
  councilLogos: {
    "public-council-1": <svg />,
  },
}));

describe("Header", () => {
  describe("no council selected", () => {
    const appConfig = createAppConfig();
    it("shows the correct text", () => {
      render(<Header appConfig={appConfig} />);

      expect(
        screen.getByRole("link", { name: "Digital Planning Register" }),
      ).toBeInTheDocument();

      expect(
        screen.queryByRole("link", { name: "Public Council 1" }),
      ).not.toBeInTheDocument();
    });

    it('shows the "menu" component on click', () => {
      render(<Header appConfig={appConfig} />);

      const button = screen.getByRole("button", {
        name: "Open and close the primary menu",
      });
      const headerElement = screen.getByRole("banner");

      // Initial state
      expect(headerElement).not.toHaveClass("dpr-header--menu-open");

      // Click to open
      fireEvent.click(button);
      expect(headerElement).toHaveClass("dpr-header--menu-open");

      // Click to close
      fireEvent.click(button);
      expect(headerElement).not.toHaveClass("dpr-header--menu-open");
    });
  });

  describe("council with logo enabled is selected", () => {
    const appConfig = createAppConfig("public-council-1");
    it("shows the correct text", () => {
      render(<Header appConfig={appConfig} />);
      expect(
        screen.getByRole("link", { name: "Digital Planning Register" }),
      ).toBeInTheDocument();

      const councilElement = screen.getByRole("link", {
        name: "Public Council 1",
      });
      expect(councilElement).toBeInTheDocument();
      expect(councilElement).toHaveClass("dpr-header__logo");

      const headerElement = screen.getByRole("banner");
      expect(headerElement).toHaveClass("dpr-header--council");
    });
  });

  describe("council with logo disabled is selected", () => {
    const appConfig = createAppConfig("public-council-2");
    it("shows the correct text", () => {
      render(<Header appConfig={appConfig} />);
      expect(
        screen.getByRole("link", { name: "Digital Planning Register" }),
      ).toBeInTheDocument();

      const councilElement = screen.getByRole("link", {
        name: "Public Council 2",
      });
      expect(councilElement).toBeInTheDocument();
      expect(councilElement).toHaveClass("dpr-header__council-name");

      const headerElement = screen.getByRole("banner");
      expect(headerElement).toHaveClass("dpr-header--council");
    });
  });
});
