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
import { PageShow } from "./PageShow";
import {
  generateDocument,
  generateNResults,
} from "@mocks/dprApplicationFactory";

import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";

import { createAppConfig } from "@mocks/appConfigFactory";

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
  appealDeterminedWithdrawn,
  appealDeterminedAllowed,
  appealDeterminedDismissed,
  appealDeterminedSplitDecision,
  withdrawn,
} = generateExampleApplications();

const meta = {
  title: "Council pages/Show",
  component: PageShow,
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
    appConfig: createAppConfig("public-council-1"),
    application: committeeDetermined,
    documents: generateNResults(10, generateDocument),
    publicCommentSummary: {
      sentiment: {
        supportive: 0,
        neutral: 0,
        objection: 0,
      },
      totalComments: 0,
    },
    specialistCommentSummary: {
      sentiment: {
        approved: 0,
        amendmentsNeeded: 0,
        objected: 0,
      },
      totalConsulted: 0,
      totalComments: 0,
    },
    params: {
      council: "public-council-1",
      reference: "123456",
    },
  },
} satisfies Meta<typeof PageShow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    application: committeeDetermined,
  },
};

export const NoResult: Story = {
  args: {
    application: null,
  },
};

// 03-consultation
export const Consultation: Story = {
  name: "03-consultation",
  args: {
    application: consultation,
  },
};

// 04-assessment-00-assessment-in-progress
export const AssessmentInProgress: Story = {
  name: "04-assessment-00-assessment-in-progress",
  args: {
    application: assessmentInProgress,
  },
};

// 04-assessment-01-council-determined
export const PlanningOfficerDetermined: Story = {
  name: "04-assessment-01-council-determined",
  args: {
    application: planningOfficerDetermined,
  },
};

// 04-assessment-02-assessment-in-committee
export const AssessmentInCommittee: Story = {
  name: "04-assessment-02-assessment-in-committee",
  args: {
    application: assessmentInCommittee,
  },
};

// 04-assessment-03-committee-determined
export const CommitteeDetermined: Story = {
  name: "04-assessment-03-committee-determined",
  args: {
    application: committeeDetermined,
  },
};

// 05-appeal-00-appeal-lodged
export const AppealLodged: Story = {
  name: "05-appeal-00-appeal-lodged",
  args: {
    application: appealLodged,
  },
};

// 05-appeal-01-appeal-validated
export const AppealValid: Story = {
  name: "05-appeal-01-appeal-validated",
  args: {
    application: appealValid,
  },
};

// 05-appeal-02-appeal-started
export const AppealStarted: Story = {
  name: "05-appeal-02-appeal-started",
  args: {
    application: appealStarted,
  },
};

// 05-appeal-03-appeal-determined
export const AppealDetermined: Story = {
  name: "05-appeal-03-appeal-determined",
  args: {
    application: appealDetermined,
  },
};
export const AppealDeterminedWithdrawn: Story = {
  name: "05-appeal-03-appeal-determined--withdrawn",
  args: {
    application: appealDeterminedWithdrawn,
  },
};
export const AppealDeterminedAllowed: Story = {
  name: "05-appeal-03-appeal-determined--allowed",
  args: {
    application: appealDeterminedAllowed,
  },
};
export const AppealDeterminedDismissed: Story = {
  name: "05-appeal-03-appeal-determined--dismissed",
  args: {
    application: appealDeterminedDismissed,
  },
};
export const AppealDeterminedSplitDecision: Story = {
  name: "05-appeal-03-appeal-determined--split-decision",
  args: {
    application: appealDeterminedSplitDecision,
  },
};
// 06-assessment-withdrawn
export const Withdrawn: Story = {
  name: "06-assessment-withdrawn",
  args: {
    application: withdrawn,
  },
};
