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

// test row component
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ApplicationForm } from "@/components/ApplicationForm";

// Mock processApplicationForm to just return its input
jest.mock("@/components/ApplicationForm/ApplicationForm.utils", () => ({
  processApplicationForm: (data: unknown) => data,
}));

// Mock RecursiveObjectRenderer to render a simple div with JSON
jest.mock("@/components/ApplicationForm/ApplicationForm.components", () => ({
  RecursiveObjectRenderer: ({ data }: { data: unknown }) => (
    <div data-testid="recursive-renderer">{JSON.stringify(data)}</div>
  ),
}));

describe("ApplicationForm", () => {
  it("renders nothing if submissionData is undefined", () => {
    const { container } = render(
      <ApplicationForm submissionData={undefined} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing if submissionData is null", () => {
    const { container } = render(<ApplicationForm submissionData={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders RecursiveObjectRenderer with processed data", () => {
    const mockData = { foo: "bar", baz: 123 };
    render(<ApplicationForm submissionData={mockData} />);
    expect(screen.getByTestId("recursive-renderer")).toHaveTextContent(
      JSON.stringify(mockData),
    );
  });
});
