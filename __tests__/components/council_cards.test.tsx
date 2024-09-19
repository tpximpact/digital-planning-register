import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CouncilCards from "@/components/council_cards";
import { getConfig } from "@/lib/config";

jest.mock("../../src/lib/config", () => ({
  getConfig: jest.fn(),
}));

export interface Council {
  name: string;
  isSelectable?: boolean | string;
}

export interface Config {
  [key: string]: Council;
}

describe("CouncilCards", () => {
  const mockedConfig: Config = {
    barnet: { name: "Barnet", isSelectable: "true" },
    camden: { name: "Camden", isSelectable: "true" },
    buckinghamshire: { name: "Buckinghamshire", isSelectable: "false" },
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders council cards correctly when logo files exist", async () => {
    (getConfig as jest.Mock).mockResolvedValue(mockedConfig);

    render(await CouncilCards());

    await waitFor(() => expect(getConfig).toHaveBeenCalled());

    const councilCards = screen.getAllByRole("link");
    const selectableCouncils = Object.keys(mockedConfig).filter(
      (council) => mockedConfig[council].isSelectable === "true",
    );
    expect(councilCards).toHaveLength(selectableCouncils.length);

    selectableCouncils.forEach((council) => {
      const { name } = mockedConfig[council];
      const councilCard = screen.getByTitle(`${name} Council`);
      expect(councilCard).toBeInTheDocument();
      expect(councilCard).toHaveAttribute("href", `/${council}`);
    });
  });

  it("renders council names when logo files do not exist", async () => {
    (getConfig as jest.Mock).mockResolvedValue(mockedConfig);

    render(await CouncilCards());

    await waitFor(() => expect(getConfig).toHaveBeenCalled());

    const councilCards = screen.getAllByRole("link");
    const selectableCouncils = Object.keys(mockedConfig).filter(
      (council) => mockedConfig[council].isSelectable === "true",
    );
    expect(councilCards).toHaveLength(selectableCouncils.length);

    selectableCouncils.forEach((council) => {
      const { name } = mockedConfig[council];
      const councilCard = screen.getByTitle(`${name} Council`);
      expect(councilCard).toBeInTheDocument();
      expect(councilCard).toHaveAttribute("href", `/${council}`);
    });
  });
});
