import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PageSearch, PageSearchProps } from "@/components/PageSearch";
import { AppConfig } from "@/config/types";
import { DprPlanningApplication, DprPagination } from "@/types";

// Mock components used within PageSearch
jest.mock("../../src/components/button", () => ({
  BackLink: () => <div data-testid="back-link">Back Link</div>,
}));
jest.mock("../../src/components/FormSearch", () => ({
  FormSearch: () => <div data-testid="form-search"></div>,
}));

describe("PageSearch Component", () => {
  const mockAppConfig: AppConfig = {
    council: {
      slug: "test-council",
      name: "camden",
      visibility: "public",
      dataSource: "",
      publicComments: false,
      specialistComments: false,
      pageContent: {
        privacy_policy: {
          privacy_policy_link: "",
        },
      },
      features: {},
    },
    defaults: { resultsPerPage: 10 },
  };

  const mockApplications: DprPlanningApplication[] = [
    {
      application: {
        reference: "app123",
        type: { description: "" },
        consultation: { endDate: "10-10-2024" },
      },
      property: { address: { singleLine: "1234" }, boundary: { site: {} } },
      proposal: { description: "" },
    } as DprPlanningApplication,
    {
      application: {
        reference: "app456",
        type: { description: "" },
        consultation: { endDate: "10-10-2024" },
      },
    } as DprPlanningApplication,
  ];

  const mockPagination: DprPagination = {
    total_pages: 3,
    page: 1,
    total_results: 30,
  };

  const renderComponent = (props: Partial<PageSearchProps> = {}) =>
    render(
      <PageSearch
        appConfig={props.appConfig || mockAppConfig}
        applications={props.applications || mockApplications}
        pagination={props.pagination || mockPagination}
        searchParams={
          props.searchParams || { query: "valid", page: 1, resultsPerPage: 2 }
        }
      />,
    );

  it("does not display validation error when query length is valid", () => {
    renderComponent({
      searchParams: { query: "valid", page: 2, resultsPerPage: 10 },
    });
    expect(screen.getByTestId("form-search")).toBeInTheDocument();
  });
});
