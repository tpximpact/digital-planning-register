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
import { ApplicationProgressInfo } from "./ApplicationProgressInfo";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";
import { buildApplicationProgress } from "@/lib/planningApplication/progress";

const {
  consultation,
  assessmentInProgress,
  planningOfficerDetermined,
  assessmentInCommittee,
  committeeDetermined,
  appealLodged,
  appealValid,
  // appealStarted,
  // appealDetermined,
  // appealDeterminedWithdrawn,
  // appealDeterminedAllowed,
  // appealDeterminedDismissed,
  // appealDeterminedSplitDecision,
  withdrawn,
} = generateExampleApplications();

const meta = {
  title: "DPR Components/ApplicationProgressInfo",
  component: ApplicationProgressInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    sections: buildApplicationProgress(committeeDetermined),
  },
} satisfies Meta<typeof ApplicationProgressInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// 01-submission
// 02-validation-01-invalid
// 03-consultation
export const Consultation: Story = {
  name: "03-consultation",
  args: {
    sections: buildApplicationProgress(consultation),
    application: consultation,
  },
};

// 04-assessment-00-assessment-in-progress
export const AssessmentInProgress: Story = {
  name: "04-assessment-00-assessment-in-progress",
  args: {
    sections: buildApplicationProgress(assessmentInProgress),
    application: assessmentInProgress,
  },
};

// 04-assessment-01-council-determined
export const PlanningOfficerDetermined: Story = {
  name: "04-assessment-01-council-determined",
  args: {
    sections: buildApplicationProgress(planningOfficerDetermined),
    application: planningOfficerDetermined,
  },
};

// 04-assessment-02-assessment-in-committee
export const AssessmentInCommittee: Story = {
  name: "04-assessment-02-assessment-in-committee",
  args: {
    sections: buildApplicationProgress(assessmentInCommittee),
    application: assessmentInCommittee,
  },
};

// 04-assessment-03-committee-determined
export const CommitteeDetermined: Story = {
  name: "04-assessment-03-committee-determined",
  args: {
    sections: buildApplicationProgress(committeeDetermined),
    application: committeeDetermined,
  },
};

// 05-appeal-00-appeal-lodged
export const AppealLodged: Story = {
  name: "05-appeal-00-appeal-lodged",
  args: {
    sections: buildApplicationProgress(appealLodged),
    application: appealLodged,
  },
};

// 05-appeal-01-appeal-validated
export const AppealValid: Story = {
  name: "05-appeal-01-appeal-validated",
  args: {
    sections: buildApplicationProgress(appealValid),
    application: appealValid,
  },
};

// @TODO error in storybook with circular json here - which is fixed if we remove the <Link> from the started content
// // 05-appeal-02-appeal-started
// export const AppealStarted: Story = {
//   name: "05-appeal-02-appeal-started",
//   args: {
//     sections: buildApplicationProgress(appealStarted),
//   },
// };

// // 05-appeal-03-appeal-determined
// export const AppealDetermined: Story = {
//   name: "05-appeal-03-appeal-determined",
//   args: {
//     sections: buildApplicationProgress(appealDetermined),
//   },
// };
// export const AppealDeterminedWithdrawn: Story = {
//   name: "05-appeal-03-appeal-determined--withdrawn",
//   args: {
//     sections: buildApplicationProgress(appealDeterminedWithdrawn),
//   },
// };
// export const AppealDeterminedAllowed: Story = {
//   name: "05-appeal-03-appeal-determined--allowed",
//   args: {
//     sections: buildApplicationProgress(appealDeterminedAllowed),
//   },
// };
// export const AppealDeterminedDismissed: Story = {
//   name: "05-appeal-03-appeal-determined--dismissed",
//   args: {
//     sections: buildApplicationProgress(appealDeterminedDismissed),
//   },
// };
// export const AppealDeterminedSplitDecision: Story = {
//   name: "05-appeal-03-appeal-determined--split-decision",
//   args: {
//     sections: buildApplicationProgress(appealDeterminedSplitDecision),
//   },
// };

// 06-assessment-withdrawn
export const Withdrawn: Story = {
  name: "06-assessment-withdrawn",
  args: {
    sections: buildApplicationProgress(withdrawn),
  },
};
