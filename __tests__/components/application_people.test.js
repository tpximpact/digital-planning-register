import ApplicationPeople from "@/components/application_people";
import { screen, render } from "@testing-library/react";
describe("Render ApplicationPeople", () => {
  const mockData = {
    agent_first_name: "John",
    agent_last_name: "Schmitt",
    applicant_first_name: "Rachel",
    applicant_last_name: "Green",
  };

  it("should render correct", async () => {
    render(<ApplicationPeople {...mockData} />);

    expect(
      screen.getByRole("agent-name", {
        Name: `${mockData.agent_first_name} ${mockData.agent_first_name}`,
      }),
    );
    expect(
      screen.getByRole("applicant-name", {
        Name: `${mockData.applicant_first_name} ${mockData.applicant_first_name}`,
      }),
    );
  });
});
