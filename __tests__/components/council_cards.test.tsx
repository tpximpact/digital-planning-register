import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CouncilCards } from "@/components/CouncilCards";

jest.mock("../../src/lib/config", () => ({
  getConfig: jest.fn(),
}));

describe("CouncilCards", () => {
  const mockedConfig = {
    barnet: {
      name: "Barnet",
      slug: "barnet",
      visibility: "public",
      isSelectable: "true",
      dataSource: "bops",
      publicComments: false,
      specialistComments: false,
    },
    camden: {
      name: "Camden",
      slug: "camden",
      visibility: "public",
      isSelectable: "true",
      dataSource: "bops",
      publicComments: true,
      specialistComments: true,
    },
    buckinghamshire: {
      name: "Buckinghamshire",
      slug: "buckinghamshire",
      visibility: "public",
      isSelectable: "false",
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
