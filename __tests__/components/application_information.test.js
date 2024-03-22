import ApplicationInformation from "@/components/application_information";
import { screen, render } from "@testing-library/react";
describe("Render ApplicationPeople", () => {
  const mockData = {
    reference_in_full: "AAA_BBB_CCC_DDD",
    application_type: "planning_application",
    site: {
      address_1: "40, STANSFIELD ROAD",
      postcode: "SW9 9RZ",
    },
    received_date: "2024-03-18T00:00:00.000+00:00",
    result_flag: null,
    determination_date: "2024-03-19",
    status: "not_started",
    consultation: { end_date: "2024-04-08" },
  };

  it("should render correct", () => {
    render(<ApplicationInformation {...mockData} />);

    expect(
      screen.getByRole("application-reference", {
        Name: mockData.reference_in_full,
      }),
    );
    expect(
      screen.getByRole("application-type", { Name: mockData.application_type }),
    );
    expect(screen.getByRole("application-status", { Name: "not started" }));
  });
});
