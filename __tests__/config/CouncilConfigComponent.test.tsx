import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useParams } from "next/navigation";
import { getCouncilConfig } from "@/config";
import { CouncilConfigComponent } from "@/config/CouncilConfigComponent";
import { createAppConfig } from "@mocks/appConfigFactory";
import { AppConfig } from "@/config/types";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/config", () => ({
  getCouncilConfig: jest.fn(),
}));

const MockComponent = ({
  appConfig,
  councilConfig,
}: {
  appConfig: AppConfig;
  councilConfig?: AppConfig["council"];
}) => (
  <>
    <div>{appConfig ? "appConfig Loaded" : "No appConfig"}</div>
    <div>{councilConfig ? "councilConfig Loaded" : "No councilConfig"}</div>
    <div>
      {appConfig?.council
        ? "appConfig.council is set"
        : "appConfig.council is not set"}
    </div>
  </>
);

describe("CouncilConfigComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.todo("Should respect env var rules");

  it("with no params it should render the wrapped component with appConfig as a passed prop", () => {
    (useParams as jest.Mock).mockReturnValue({});
    const appConfig = createAppConfig();

    render(
      <CouncilConfigComponent
        appConfig={appConfig}
        Component={MockComponent}
      />,
    );

    expect(screen.getByText("appConfig Loaded")).toBeInTheDocument();
    expect(screen.getByText("No councilConfig")).toBeInTheDocument();
    // this is correct behaviour because we can't use council prop when we getAppConfig so we find it and pass it through as councilConfig
    // everywhere else appConfig.council should be set but clientComponents 🤷‍♀️
    expect(
      screen.getByText("appConfig.council is not set"),
    ).toBeInTheDocument();
  });

  it("with valid council param it should render the wrapped component with appConfig and councilConfig as a passed prop", () => {
    const appConfig = createAppConfig();
    (useParams as jest.Mock).mockReturnValue({ council: "public-council-1" });
    (getCouncilConfig as jest.Mock).mockReturnValue(
      appConfig.councils.find((council) => council.slug === "public-council-1"),
    );

    render(
      <CouncilConfigComponent
        appConfig={appConfig}
        Component={MockComponent}
      />,
    );

    expect(screen.getByText("appConfig Loaded")).toBeInTheDocument();
    expect(screen.getByText("councilConfig Loaded")).toBeInTheDocument();
    expect(
      screen.getByText("appConfig.council is not set"),
    ).toBeInTheDocument();
  });

  it('should render "No appConfig" when appConfig is not passed', () => {
    (useParams as jest.Mock).mockReturnValue({});
    render(
      <CouncilConfigComponent
        appConfig={undefined as unknown as AppConfig}
        Component={MockComponent}
      />,
    );
    expect(screen.getByText("No appConfig")).toBeInTheDocument();
    expect(screen.getByText("No councilConfig")).toBeInTheDocument();
  });
});
