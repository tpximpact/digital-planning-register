import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CouncilSelector from "@/components/council_selector";
import config from "../../util/config.json";

const mockLocation = {
  href: "",
  pathname: "/",
};

Object.defineProperty(window, "location", {
  value: mockLocation,
});

describe("CouncilSelector", () => {
  const councilOptions = Object.keys(config);

  it("renders the selector with council options", () => {
    render(<CouncilSelector />);
    const selector = screen.getByRole("combobox");
    expect(selector).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(councilOptions.length + 1);

    options.forEach((option, index) => {
      if (index === 0) {
        expect(option).toHaveValue("select");
        expect(option).toHaveTextContent("Select your council");
      } else {
        const councilKey = councilOptions[index - 1];
        expect(option).toHaveValue(councilKey);
      }
    });
  });
});
