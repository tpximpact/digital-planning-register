import Header from "../../src/components/header";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { usePathname, useParams } from "next/navigation";
import React from "react";
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock("../../mocks", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockConfig = {
  camden: { name: "Camden", logowhite: "camden-logo.png", isShowDSN: true },
  barnet: { name: "Barnet", logowhite: "barnet-logo.png", isShowDSN: false },
};

describe("Header", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    usePathname.mockReturnValue("/");
    useParams.mockReturnValue({ council: "camden" });
  });
  it("it should render correctly", async () => {
    const useEffectMock = jest.spyOn(React, "useEffect");

    // Mock implementation of useEffect
    useEffectMock.mockImplementationOnce((fn) => fn());
    render(<Header councilConfig={mockConfig} />);
    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "Digital Planning Register" }),
      ).toBeInTheDocument();
    });
  });
});
