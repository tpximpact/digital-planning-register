import "@testing-library/jest-dom";
import { ApplicationPeople } from "@/components/ApplicationPeople";
import { screen, render } from "@testing-library/react";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

describe("Render ApplicationPeople", () => {
  const applicant = generateDprApplication().applicant;
  const caseOfficer = generateDprApplication().officer;

  it("should render correct if it has all the data", async () => {
    render(
      <ApplicationPeople applicant={applicant} caseOfficer={caseOfficer} />,
    );

    // it should be showing
    expect(screen.getByRole("heading", { name: "People" })).toBeInTheDocument();

    // all agents details should be showing
    expect(
      screen.getByRole("heading", { name: "Applicant's Agent" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Applicant's Agent Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Applicant's Agent Address" }),
    ).toBeInTheDocument();

    // all applicants details should be showing
    expect(
      screen.getByRole("heading", { name: "Applicant" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Applicant Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Applicant Type" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Applicant Address" }),
    ).toBeInTheDocument();
  });

  it("shouldn't show anything if no applicant", async () => {
    render(<ApplicationPeople applicant={{}} />);

    // it should be showing
    expect(
      screen.queryByRole("heading", { name: "People" }),
    ).not.toBeInTheDocument();
  });

  it("shouldn't show agent column if the fields we need are empty", async () => {
    // Remove agent.name and agent.address
    const {
      agent: { name, address, ...restAgent },
      ...restApplicant
    } = applicant;
    const updatedApplicant = {
      ...restApplicant,
      agent: restAgent,
    };
    render(<ApplicationPeople applicant={updatedApplicant} />);

    // it should be showing
    expect(screen.getByRole("heading", { name: "People" })).toBeInTheDocument();

    // no agents details should be showing
    expect(
      screen.queryByRole("heading", { name: "Applicant's Agent" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Applicant's Agent Name" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Applicant's Agent Address" }),
    ).not.toBeInTheDocument();

    // all applicants details should be showing
    expect(
      screen.getByRole("heading", { name: "Applicant" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Applicant Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Applicant Type" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Applicant Address" }),
    ).toBeInTheDocument();
  });

  it("shouldn't show applicant column if the fields we need are empty", async () => {
    // Remove type, name, and address
    const { type, name, address, ...restApplicant } = applicant;
    const updatedApplicant = restApplicant;
    render(<ApplicationPeople applicant={updatedApplicant} />);

    // it should be showing
    expect(screen.getByRole("heading", { name: "People" })).toBeInTheDocument();

    // all agents details should be showing
    expect(
      screen.getByRole("heading", { name: "Applicant's Agent" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Applicant's Agent Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Applicant's Agent Address" }),
    ).toBeInTheDocument();

    // no applicants details should be showing
    expect(
      screen.queryByRole("heading", { name: "Applicant" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Applicant Name" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Applicant Type" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Applicant Address" }),
    ).not.toBeInTheDocument();
  });

  it("should show the case officer column if there is data", async () => {
    render(
      <ApplicationPeople applicant={applicant} caseOfficer={caseOfficer} />,
    );
    expect(
      screen.getByRole("heading", { name: "Case Officer" }),
    ).toBeInTheDocument();
  });

  it("shouldn't show the case officer column if there the field we need is empty", async () => {
    render(<ApplicationPeople applicant={applicant} />);
    expect(
      screen.queryByRole("heading", { name: "Case Officer" }),
    ).not.toBeInTheDocument();
  });
});
