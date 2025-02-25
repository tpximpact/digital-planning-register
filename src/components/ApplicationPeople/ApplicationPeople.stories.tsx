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

import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationPeople } from "./ApplicationPeople";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

const meta = {
  title: "DPR Components/ApplicationPeople",
  component: ApplicationPeople,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof ApplicationPeople>;

export default meta;
type Story = StoryObj<typeof meta>;

const fullApplication = generateDprApplication();

export const Default: Story = {
  args: {
    applicant: fullApplication.applicant,
    caseOfficer: fullApplication.officer,
  },
};

export const AllApplicationPeople: Story = {
  args: {
    applicant: fullApplication.applicant,
    caseOfficer: fullApplication.officer,
  },
};

export const ApplicantAndAgent: Story = {
  args: {
    applicant: {
      ...fullApplication.applicant,
      agent: fullApplication.applicant.agent,
    },
  },
};

export const ApplicantAndCaseOfficer: Story = {
  args: {
    applicant: {
      ...fullApplication.applicant,
      agent: undefined,
    },
    caseOfficer: fullApplication.officer,
  },
};

export const CaseOfficerAndAgent: Story = {
  args: {
    caseOfficer: fullApplication.officer,
    applicant: {
      agent: fullApplication.applicant.agent,
    },
  },
};

export const OnlyApplicant: Story = {
  args: {
    applicant: {
      ...fullApplication.applicant,
      agent: undefined,
    },
  },
};

export const OnlyApplicantMinimalData: Story = {
  args: {
    applicant: {
      name: fullApplication.applicant.name,
    },
  },
};

export const OnlyAgent: Story = {
  args: {
    applicant: {
      agent: fullApplication.applicant.agent,
    },
  },
};

export const OnlyAgentMinimalData: Story = {
  args: {
    applicant: {
      agent: {
        name: fullApplication.applicant.agent?.name,
      },
    },
  },
};

export const OnlyCaseOfficer: Story = {
  args: {
    caseOfficer: fullApplication.officer,
  },
};
