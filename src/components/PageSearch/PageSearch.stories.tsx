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
import { PageSearch } from "./PageSearch";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";
import { createAppConfig } from "@mocks/appConfigFactory";
import { generatePagination } from "@mocks/dprApplicationFactory";

const defaultAppConfig = createAppConfig("public-council-1");

const {
  consultation,
  assessmentInProgress,
  planningOfficerDetermined,
  assessmentInCommittee,
  committeeDetermined,
  appealLodged,
  appealValid,
  appealStarted,
  appealDetermined,
  withdrawn,
} = generateExampleApplications();

const meta = {
  title: "Council pages/Search",
  component: PageSearch,
  decorators: [
    (Story) => {
      // since this is a page we need to add a decorator to add the main element to make it look a bit more like a page
      return (
        <main className="govuk-width-container" id="main">
          <Story />
        </main>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    params: {
      council: "test-council-1",
    },
    appConfig: defaultAppConfig,
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "simple",
    },
    response: {
      status: {
        code: 200,
        message: "OK",
      },
      data: [
        consultation,
        assessmentInProgress,
        planningOfficerDetermined,
        assessmentInCommittee,
        committeeDetermined,
        appealLodged,
        appealValid,
        appealStarted,
        appealDetermined,
        withdrawn,
      ],
      pagination: generatePagination(1, 100),
    },
  },
} satisfies Meta<typeof PageSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithEmailAlerts: Story = {
  args: {
    appConfig: {
      ...defaultAppConfig,
      council: defaultAppConfig.council && {
        ...defaultAppConfig.council,
        features: {
          alertsAllApplications: true,
        },
        pageContent: {
          ...defaultAppConfig.council.pageContent,
          email_alerts: {
            sign_up_for_alerts_link: "email alerts link",
          },
        },
      },
    },
  },
};
export const SimpleSearchNoResults: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "simple",
      query: "search query",
    },
    response: {
      status: {
        code: 200,
        message: "OK",
      },
      data: null,
      pagination: generatePagination(1, 0),
    },
  },
};
export const SimpleSearchPerformed: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "simple",
      query: "search query",
    },
  },
};
export const SimpleSearchSorted: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "simple",
      query: "search query",
      sortBy: "receivedAt",
      orderBy: "asc",
    },
  },
};
export const QuickFiltered: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "simple",
      dprFilter: "inConsultation",
    },
  },
};
export const AdvancedSearchNoResults: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "full",
      reference: "12345",
    },
    response: {
      status: {
        code: 200,
        message: "OK",
      },
      data: null,
      pagination: generatePagination(1, 0),
    },
  },
};
export const AdvancedSearchPerformed: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "full",
      reference: "12345",
    },
  },
};

export const LastPageShowsNotOnDprYet: Story = {
  args: {
    searchParams: {
      page: 10,
      resultsPerPage: 10,
      type: "simple",
      reference: "12345",
    },
    response: {
      status: {
        code: 200,
        message: "OK",
      },
      data: [],
      pagination: generatePagination(10, 100),
    },
  },
};
