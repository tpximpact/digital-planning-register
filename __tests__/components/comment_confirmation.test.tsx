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

import { render, screen, fireEvent } from "@testing-library/react";
import CommentConfirmation from "@/components/comment_confirmation";
import "@testing-library/jest-dom";
import { createAppConfig } from "@mocks/appConfigFactory";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";

jest.mock("@/components/ApplicationMap", () => ({
  ApplicationMapLoader: () => (
    <div data-testid="mock-application-map-loader">Mocked ApplicationMap</div>
  ),
}));

const { consultation } = generateExampleApplications();
const appConfig = createAppConfig("public-council-1");

// stop Not implemented: HTMLFormElement.prototype.requestSubmit error
beforeAll(() => {
  window.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});

describe("CommentConfirmation", () => {
  const defaultProps = {
    params: {
      council: "public-council-1",
      reference: consultation.data.application.reference,
    },
    application: consultation,
    appConfig: appConfig,
    navigateToPage: jest.fn(),
  };

  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it("renders the component with the correct content", () => {
    render(
      <CommentConfirmation
        {...defaultProps}
        reference={defaultProps.params.reference}
        council={defaultProps.params.council}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Comment submitted" }),
    ).toBeInTheDocument();
    const { reference } = defaultProps.params;
    expect(screen.getByText(reference)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Discover other planning applications in your area",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Back to application search" }),
    ).toBeInTheDocument();
  });
  it("does not navigate to page 0 if the comment has been submitted", () => {
    sessionStorage.setItem("submitted_REF-001", "true");
    render(
      <CommentConfirmation
        {...defaultProps}
        reference={defaultProps.params.reference}
        council={defaultProps.params.council}
      />,
    );

    expect(defaultProps.navigateToPage).not.toHaveBeenCalled();
  });
  it("renders the map component when boundary_geojson is provided", () => {
    render(
      <CommentConfirmation
        reference={defaultProps.params.reference}
        council={defaultProps.params.council}
        {...defaultProps}
      />,
    );

    expect(
      screen.getByTestId("mock-application-map-loader"),
    ).toBeInTheDocument();
  });

  it('navigates to the council page when the "Back to application search" button is clicked', () => {
    render(
      <CommentConfirmation
        reference={defaultProps.params.reference}
        council={defaultProps.params.council}
        {...defaultProps}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Back to application search" }),
    );

    expect(
      screen.getByRole("button", { name: "Back to application search" }),
    ).toHaveAttribute("type", "submit");
    expect(
      screen
        .getByRole("button", { name: "Back to application search" })
        .closest("form"),
    ).toHaveAttribute("action", "/public-council-1");
    expect(
      screen
        .getByRole("button", { name: "Back to application search" })
        .closest("form"),
    ).toHaveAttribute("method", "GET");
  });
});
