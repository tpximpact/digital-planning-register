import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ContextSetter, ContextSetterProps } from "@/components/ContextSetter";
import { createPathFromParams } from "@/lib/navigation";
import { DprApplication } from "@/types";
import {
  generateExampleApplications,
  generateSiteAddress,
} from "@mocks/dprNewApplicationFactory";

jest.mock("@/lib/navigation", () => ({
  createPathFromParams: jest.fn(),
}));

jest.mock("@/components/ApplicationMap", () => ({
  ApplicationMapLoader: () => (
    <div data-testid="mock-application-map-loader">Mocked ApplicationMap</div>
  ),
}));

const { assessmentInProgress } = generateExampleApplications();

describe("ContextSetter Component", () => {
  const reference = "12345";
  const address = generateSiteAddress;
  const mockApplication: DprApplication = {
    ...assessmentInProgress,
    data: {
      ...assessmentInProgress.data,
      application: {
        ...assessmentInProgress.data.application,
        reference: reference,
      },
    },
    submission: {
      ...assessmentInProgress.submission,
      data: {
        ...assessmentInProgress.submission.data,
        property: {
          ...assessmentInProgress.submission.data.property,
          address,
        },
      },
    },
  };
  const defaultProps: ContextSetterProps = {
    councilSlug: "public-council-1",
    reference: reference,
    application: mockApplication,
  };

  beforeEach(() => {
    (createPathFromParams as jest.Mock).mockReturnValue(
      `/public-council-1/${reference}`,
    );
  });

  it("renders the component with map and address", () => {
    render(<ContextSetter {...defaultProps} />);

    // Check if the address is rendered
    expect(screen.getByText(address.singleLine)).toBeInTheDocument();

    // Check if the application reference is rendered
    const link = screen.getByRole("link", { name: reference });
    expect(link).toHaveAttribute("href", `/public-council-1/${reference}`);
    expect(link).toHaveTextContent(reference);

    // Check if the map is rendered
    expect(
      screen.getByTestId("mock-application-map-loader"),
    ).toBeInTheDocument();
  });

  it("renders without the map when boundary_geojson is missing", () => {
    const propsWithoutMap = {
      ...defaultProps,
      application: {
        ...mockApplication,
        submission: {
          ...mockApplication.submission,
          data: {
            ...mockApplication.submission.data,
            property: {
              ...mockApplication.submission.data.property,
              boundary: undefined,
            },
          },
        },
      },
    };

    render(<ContextSetter {...propsWithoutMap} />);

    // Check if the address is rendered
    expect(screen.getByText(address.singleLine)).toBeInTheDocument();

    // Check if the application reference is rendered
    const link = screen.getByRole("link", { name: reference });
    expect(link).toHaveAttribute("href", `/public-council-1/${reference}`);
    expect(link).toHaveTextContent(reference);

    // Ensure the map is not rendered
    expect(
      screen.queryByTestId("mock-application-map-loader"),
    ).not.toBeInTheDocument();
  });

  it("renders nothing when application is null", () => {
    render(
      <ContextSetter
        councilSlug="test-council"
        reference="APP-12345"
        application={null as unknown as DprApplication}
      />,
    );

    // Ensure nothing is rendered
    expect(screen.queryByText("Application Reference")).not.toBeInTheDocument();
  });
});
