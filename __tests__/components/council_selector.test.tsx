import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CouncilSelector } from "@/components/CouncilSelector";
import { capitalizeFirstLetter } from "@/util";
import { AppConfig } from "@/config/types";

const mockedConfig: Pick<
  AppConfig["council"][number],
  "name" | "slug" | "visibility"
>[] = [
  {
    name: "Barnet",
    slug: "barnet",
    visibility: "public",
  },
  {
    name: "Camden",
    slug: "camden",
    visibility: "public",
  },
  {
    name: "Buckinghamshire",
    slug: "buckinghamshire",
    visibility: "public",
  },
];

describe("CouncilSelector", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the selector with council options", async () => {
    render(<CouncilSelector currentPath="/" councilConfig={mockedConfig} />);

    const selector = screen.getByRole("combobox");
    expect(selector).toBeInTheDocument();

    // Check that the number of options corresponds to selectable councils + the default "Select your council"
    const selectableCouncils = Object.keys(mockedConfig).filter(
      (councilKey) => mockedConfig[councilKey].isSelectable === "true",
    );
    const options = screen.getAllByRole("option");

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
