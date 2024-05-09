import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import fs from "fs";
import CouncilCards from "@/components/council_cards";
import config from "../../util/config.json";

jest.mock("fs");

describe("CouncilCards", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders council cards correctly when logo files exist", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    render(<CouncilCards />);

    const councilCards = screen.getAllByRole("link");
    expect(councilCards).toHaveLength(Object.keys(config).length);

    Object.entries(config).forEach(([council, { name }]) => {
      const councilCard = screen.getByTitle(`${name} Council`);
      expect(councilCard).toBeInTheDocument();
      expect(councilCard).toHaveAttribute("href", `/${council}`);
    });
  });

  it("renders council names when logo files do not exist", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    render(<CouncilCards />);

    const councilCards = screen.getAllByRole("link");
    expect(councilCards).toHaveLength(Object.keys(config).length);

    Object.entries(config).forEach(([council, { name }]) => {
      const councilCard = screen.getByTitle(`${name} Council`);
      expect(councilCard).toBeInTheDocument();
      expect(councilCard).toHaveAttribute("href", `/${council}`);

      const councilName = screen.getByText(name);
      expect(councilName).toBeInTheDocument();
    });
  });
});
