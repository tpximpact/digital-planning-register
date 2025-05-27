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
import {
  ApplicationPeople,
  ApplicationPeopleApplicant,
  ApplicationPeopleCaseOfficer,
} from "@/components/ApplicationPeople";
import { screen, render } from "@testing-library/react";
import {
  generateAgent,
  generateCaseOfficer,
} from "@mocks/dprNewApplicationFactory";
import { DprApplication } from "@/types";

describe("Render ApplicationPeople", () => {
  const applicant = generateAgent;
  const caseOfficer = generateCaseOfficer;

  it("should render correctly if it has all the data", async () => {
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

  it("shouldn't show anything if no data", async () => {
    render(<ApplicationPeople />);

    // it should be showing
    expect(
      screen.queryByRole("heading", { name: "People" }),
    ).not.toBeInTheDocument();
  });

  it("shouldn't show agent column if the fields we need are empty", async () => {
    // Remove agent.name and agent.address
    const { agent, ...restApplicant } = generateAgent;
    const { name, address, ...restAgent } = agent;
    const updatedAgent = {
      ...restApplicant,
      agent: restAgent,
    };

    render(<ApplicationPeople applicant={updatedAgent} />);

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
    const updatedApplicant =
      restApplicant as DprApplication["submission"]["data"]["applicant"];
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

describe("ApplicationPeopleCaseOfficer", () => {
  it("should return null if case officer name is empty", () => {
    const caseOfficer = { name: "" };
    const { container } = render(
      <ApplicationPeopleCaseOfficer caseOfficer={caseOfficer} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe("ApplicationPeopleApplicant", () => {
  it("should show Same as site address if sameAsSiteAddress is true ", () => {
    const applicant: DprApplication["submission"]["data"]["applicant"] = {
      ...generateAgent,
      address: { ...generateAgent.address, sameAsSiteAddress: true },
    };
    const { container } = render(
      <ApplicationPeopleApplicant applicant={applicant} />,
    );
    expect(container).toHaveTextContent("Same as site address");
  });
});
