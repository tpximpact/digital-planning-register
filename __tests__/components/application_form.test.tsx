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
import { Row } from "../../src/components/application_form/row";
import {
  DprApplicationSubmissionSubtopic,
  DprApplicationSubmissionSubtopicValue,
  DprBoundaryGeojson,
} from "@/types";
import { Section } from "@/components/application_form/section";
import ApplicationForm from "@/components/application_form";

// Mock the ApplicationMap component
jest.mock("@/components/ApplicationMap", () => ({
  ApplicationMapLoader: () => (
    <div data-testid="mock-application-map-loader">Mocked ApplicationMap</div>
  ),
}));

const mapData: DprBoundaryGeojson = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-0.07716178894042969, 51.50094238217541],
        [-0.07645905017852783, 51.50053497847238],
        [-0.07615327835083008, 51.50115276135022],
        [-0.07716178894042969, 51.50094238217541],
      ],
    ],
  },
};

describe("Row component", () => {
  it("should return null when no map and value is null", () => {
    const props: DprApplicationSubmissionSubtopicValue = {
      description: "Test Description",
      value: null,
    };

    const { container } = render(<Row {...props} />);
    expect(container.firstChild).toBeNull();
  });

  it("should return when map and value is null", () => {
    const props: DprApplicationSubmissionSubtopicValue = {
      description: "Test Description",
      value: null,
      map: mapData,
    };

    const { container } = render(<Row {...props} />);
    expect(container.firstChild).not.toBeNull();
  });

  it("should render description and value when value is a string", () => {
    const props: DprApplicationSubmissionSubtopicValue = {
      description: "Test Description",
      value: "Test Value",
    };

    const { container } = render(<Row {...props} />);
    const elm = container.querySelector(".govuk-body");
    expect(elm).toHaveTextContent("Test Value");
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("should render description and value when value is JSX", () => {
    const props: DprApplicationSubmissionSubtopicValue = {
      description: "Test Description",
      value: <>Test Value</>,
    };

    render(<Row {...props} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("should render ApplicationMap when map is provided", () => {
    const props: DprApplicationSubmissionSubtopicValue = {
      description: "Test Description",
      value: null,
      map: mapData,
    };

    render(<Row {...props} />);
    expect(screen.getByText("Mocked ApplicationMap")).toBeInTheDocument();
  });
});

describe("Section component", () => {
  it("should render subtopic and a single row", () => {
    const subtopic = "Test Subtopic";
    const value: DprApplicationSubmissionSubtopicValue = {
      description: "Test Description",
      value: "Test Value",
    };

    render(<Section subtopic={subtopic} value={[value]} />);

    expect(screen.getByText("Test Subtopic")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("should render nested rows", () => {
    const subtopic = "Test Subtopic";
    const nestedValue: DprApplicationSubmissionSubtopicValue = {
      description: "Nested Description",
      value: "Nested Value",
    };
    const value: DprApplicationSubmissionSubtopicValue = {
      description: "Description wont be rendered",
      value: [nestedValue],
    };

    render(<Section subtopic={subtopic} value={[value]} />);
    expect(screen.getByText("Test Subtopic")).toBeInTheDocument();
    expect(
      screen.queryByText("Description wont be rendered"),
    ).not.toBeInTheDocument();

    expect(screen.getByText("Nested Description")).toBeInTheDocument();
    expect(screen.getByText("Nested Value")).toBeInTheDocument();
  });

  it("should render multiple rows", () => {
    const subtopic = "Test Subtopic";
    const value1: DprApplicationSubmissionSubtopicValue = {
      description: "Description 1",
      value: "Value 1",
    };
    const value2: DprApplicationSubmissionSubtopicValue = {
      description: "Description 2",
      value: "Value 2",
    };

    render(<Section subtopic={subtopic} value={[value1, value2]} />);

    expect(screen.getByText("Test Subtopic")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Value 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
    expect(screen.getByText("Value 2")).toBeInTheDocument();
  });
});

describe("ApplicationForm component", () => {
  it("should render nothing when submissionData is null", () => {
    render(<ApplicationForm submissionData={null} />);

    expect(
      screen.queryByText("govuk-grid-row faux-document"),
    ).not.toBeInTheDocument();
  });

  it("should render the submission data correctly", () => {
    const submissionData: DprApplicationSubmissionSubtopic[] = [
      {
        subtopic: "Subtopic 1",
        value: [{ description: "Description 1", value: "Value 1" }],
      },
      {
        subtopic: "Subtopic 2",
        value: [{ description: "Description 2", value: "Value 2" }],
      },
    ];

    render(<ApplicationForm submissionData={submissionData} />);

    expect(screen.getByText("Subtopic 1")).toBeInTheDocument();
    expect(screen.getByText("Subtopic 2")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  it("should render multiple sections correctly", () => {
    const submissionData: DprApplicationSubmissionSubtopic[] = [
      {
        subtopic: "Subtopic 1",
        value: [{ description: "Description 1", value: "Value 1" }],
      },
      {
        subtopic: "Subtopic 2",
        value: [{ description: "Description 2", value: "Value 2" }],
      },
      {
        subtopic: "Subtopic 3",
        value: [
          { description: "Description 3", value: "Value 3" },
          { description: "Description 4", value: "Value 4" },
        ],
      },
    ];

    render(<ApplicationForm submissionData={submissionData} />);

    expect(screen.getByText("Subtopic 1")).toBeInTheDocument();
    expect(screen.getByText("Subtopic 2")).toBeInTheDocument();
    expect(screen.getByText("Subtopic 3")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
    expect(screen.getByText("Description 3")).toBeInTheDocument();
    expect(screen.getByText("Description 4")).toBeInTheDocument();
  });
});
