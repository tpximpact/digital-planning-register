import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CouncilSelector from "@/components/council_selector";
import config from "../../util/config.json";
import { getConfig } from "@/actions";
import { capitalizeFirstLetter } from "@/util";

export interface Council {
  name: string;
  isSelectable?: boolean | string;
}

export interface Config {
  [key: string]: Council;
}

jest.mock("../../src/actions", () => ({
  getConfig: jest.fn(),
}));

const mockLocation = {
  href: "",
  pathname: "/",
};

Object.defineProperty(window, "location", {
  value: mockLocation,
});

describe("CouncilSelector", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the selector with council options", async () => {
    const mockedConfig: Config = {
      barnet: { name: "Barnet", isSelectable: "true" },
      camden: { name: "Camden", isSelectable: "true" },
      buckinghamshire: { name: "Buckinghamshire", isSelectable: "false" },
    };

    (getConfig as jest.Mock).mockResolvedValue(mockedConfig);

    render(<CouncilSelector currentPath={mockLocation.pathname} />);
    await waitFor(() => expect(getConfig).toHaveBeenCalled());

    const selector = screen.getByRole("combobox");
    expect(selector).toBeInTheDocument();

    const options = screen.getAllByRole("option");

    // Check that the number of options corresponds to selectable councils + the default "Select your council"
    const selectableCouncils = Object.keys(mockedConfig).filter(
      (councilKey) => mockedConfig[councilKey].isSelectable === "true",
    );
    expect(options).toHaveLength(selectableCouncils.length + 1);

    // Check the first option is the default
    expect(options[0]).toHaveValue("select");
    expect(options[0]).toHaveTextContent("Select your council");

    // Check the other options correspond to selectable councils
    selectableCouncils.forEach((councilKey, index) => {
      expect(options[index + 1]).toHaveValue(councilKey);
      expect(options[index + 1]).toHaveTextContent(
        capitalizeFirstLetter(councilKey),
      );
    });
  });
});
