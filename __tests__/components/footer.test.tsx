/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

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
      screen.getByRole("img", { name: "Open Digital Planning Logo" }),
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
