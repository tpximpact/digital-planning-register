import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CouncilSelector } from "@/components/CouncilSelector";
import { useRouter } from "next/navigation";
import { createAppConfig } from "@mocks/appConfigFactory";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CouncilSelector", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it("renders the CouncilSelector component", () => {
    const appConfig = createAppConfig("public-council-1");
    render(
      <CouncilSelector
        councils={appConfig.councils}
        selectedCouncil={appConfig.council}
      />,
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(5);
  });

  it("displays only public councils in the dropdown", () => {
    const appConfig = createAppConfig("public-council-1");
    render(
      <CouncilSelector
        councils={appConfig.councils}
        selectedCouncil={appConfig.council}
      />,
    );
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(5); // "select" + 2 public councils
    expect(screen.getByText("Public Council 1")).toBeInTheDocument();
    expect(screen.getByText("Public Council 2")).toBeInTheDocument();
    expect(screen.queryByText("Unlisted Council 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Unlisted Council 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Private Council 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Private Council 2")).not.toBeInTheDocument();

    // unit tests have no env vars
    expect(screen.getByText("Public overwritten")).toBeInTheDocument();
    expect(screen.getByText("Public no env vars")).toBeInTheDocument();
  });

  it("selects the correct council when changed", () => {
    const appConfig = createAppConfig("public-council-1");
    render(
      <CouncilSelector
        councils={appConfig.councils}
        selectedCouncil={appConfig.council}
      />,
    );
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "public-council-2" } });
    expect(select).toHaveValue("public-council-2");
    expect(mockRouter.push).toHaveBeenCalledWith("/public-council-2");
  });

  it('does not navigate when "select" is chosen', () => {
    const appConfig = createAppConfig("public-council-1");
    render(
      <CouncilSelector
        councils={appConfig.councils}
        selectedCouncil={appConfig.council}
      />,
    );
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "select" } });
    expect(select).toHaveValue("select");
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
