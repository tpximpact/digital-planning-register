import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CouncilCards from "@/components/council_cards";
import { getConfig } from "@/lib/config";
import { Config } from "@/types";

jest.mock("../../src/lib/config", () => ({
  getConfig: jest.fn(),
}));

export interface Council {
  name: string;
  visibility: "public" | "private" | "unlisted";
}

describe("CouncilCards", () => {
  const mockedConfig: Config = {
    barnet: {
      name: "Barnet",
      visibility: "public",
      dataSource: "bops",
      publicComments: false,
      specialistComments: false,
    },
    camden: {
      name: "Camden",
      dataSource: "bops",
      visibility: "public",
      publicComments: true,
      specialistComments: true,
    },
    buckinghamshire: {
      name: "Buckinghamshire",
      visibility: "public",
      dataSource: "bops",
      publicComments: false,
      specialistComments: false,
    },
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
      (council) => mockedConfig[council].visibility === "public",
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
      (council) => mockedConfig[council].visibility === "public",
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
