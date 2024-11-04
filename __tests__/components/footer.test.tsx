import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "@/components/Footer";
import { createAppConfig } from "@mocks/appConfigFactory";
import { Council } from "@/config/types";

// Mock the Image component from next/image
// eslint-disable-next-line react/display-name
jest.mock("next/image", () => (props: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img alt={props.alt} {...props} />
));

describe("Footer", () => {
  it("renders the Footer component", () => {
    const appConfig = createAppConfig("public-council-1");
    const councilConfig = appConfig.council;
    render(<Footer councilConfig={councilConfig} />);
    expect(
      screen.getByAltText("Open Digital Planning Logo"),
    ).toBeInTheDocument();
  });

  it("displays the privacy policy link if provided", () => {
    const appConfig = createAppConfig("public-council-1");
    const councilConfig = appConfig.council;
    render(<Footer councilConfig={councilConfig} />);
    const privacyPolicyLink = screen.getByText("Privacy policy");
    expect(privacyPolicyLink).toBeInTheDocument();
    expect(privacyPolicyLink).toHaveAttribute(
      "href",
      councilConfig?.pageContent.privacy_policy.privacy_policy_link,
    );
  });

  it("does not display the privacy policy link if not provided", () => {
    const appConfig = createAppConfig("public-council-1");
    const councilConfig: Partial<Council> = {
      ...appConfig.council,
      pageContent: undefined,
    };
    render(<Footer councilConfig={councilConfig as Council} />);
    expect(screen.queryByText("Privacy policy")).toBeNull();
  });
});
