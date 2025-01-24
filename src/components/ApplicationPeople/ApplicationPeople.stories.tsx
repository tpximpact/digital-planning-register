import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationPeople } from "./ApplicationPeople";
import { generateDprApplication } from "@mocks/dprApplicationFactory";
import { faker, fakerEN_GB } from "@faker-js/faker";

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

export const Default: Story = {
  args: {
    applicant: generateDprApplication().applicant,
    caseOfficer: generateDprApplication().officer,
  },
};

export const AllApplicationPeople: Story = {
  args: {
    applicant: generateDprApplication().applicant,
    caseOfficer: generateDprApplication().officer,
  },
};

export const OnlyApplicantAndAgent: Story = {
  args: {
    applicant: generateDprApplication().applicant,
  },
};

export const OnlyApplicant: Story = {
  args: {
    applicant: {
      type: "company",
      name: {
        first: faker.person.firstName(),
        last: faker.person.lastName(),
      },
      address: {
        sameAsSiteAddress: true,
      },
    },
  },
};

export const OnlyAgent: Story = {
  args: {
    applicant: {
      agent: {
        name: {
          first: faker.person.firstName(),
          last: faker.person.lastName(),
        },
        address: {
          line1: fakerEN_GB.location.street(),
          line2: "",
          town: fakerEN_GB.location.city(),
          county: "",
          postcode: fakerEN_GB.location.zipCode(),
          country: "",
        },
      },
    },
  },
};

export const OnlyCaseOfficer: Story = {
  args: {
    caseOfficer: {
      name: faker.person.fullName(),
    },
  },
};
