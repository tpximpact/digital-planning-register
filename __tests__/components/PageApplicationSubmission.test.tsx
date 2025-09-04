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

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageApplicationSubmission } from "@/components/PageApplicationSubmission";

// Mock child components to isolate tests
jest.mock("@/util", () => ({
  formatDateTimeToDprDateTime: (dateString: string) => {
    return `Formatted: ${dateString}`;
  },
}));

jest.mock("@/components/ApplicationForm", () => ({
  ApplicationForm: () => <div data-testid="application-form" />,
}));

jest.mock("@/components/PageMain", () => ({
  PageMain: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-main">{children}</div>
  ),
}));
jest.mock("@/components/BackButton", () => ({
  BackButton: () => <div data-testid="back-button" />,
}));

describe("PageApplicationSubmission", () => {
  it("renders reference and formatted submitted date", () => {
    render(
      <PageApplicationSubmission
        reference="APP/1234/2024"
        submittedAt="2024-06-01T12:00:00Z"
        council="camden"
        applicationSubmissionData={[{ foo: "bar" }]}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Application form as submitted",
        level: 1,
      }),
    ).toBeInTheDocument();
    // application reference
    expect(
      screen.getByRole("heading", { name: "Application Reference", level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText("APP/1234/2024")).toBeInTheDocument();

    // submitted date
    expect(
      screen.getByRole("heading", { name: "Submitted", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Formatted: 2024-06-01T12:00:00Z"),
    ).toBeInTheDocument();

    // application form
    expect(screen.getByTestId("application-form")).toBeInTheDocument();
  });

  it("shows fallback if submittedAt is missing", () => {
    render(
      <PageApplicationSubmission
        reference="APP/5678/2024"
        council="barnet"
        applicationSubmissionData={[{ foo: "bar" }]}
      />,
    );
    expect(screen.getByText("Date not available")).toBeInTheDocument();
  });

  it("shows fallback if applicationSubmissionData is missing", () => {
    render(
      <PageApplicationSubmission
        reference="APP/9999/2024"
        council="lambeth"
        submittedAt="2024-06-01T12:00:00Z"
      />,
    );
    expect(
      screen.getByText("Submission data not available"),
    ).toBeInTheDocument();
  });
});
