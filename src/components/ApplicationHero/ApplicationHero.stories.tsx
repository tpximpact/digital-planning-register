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
import { ApplicationHero } from "./ApplicationHero";
import { generateDprApplication } from "@mocks/dprApplicationFactory";
import { formatDateToYmd } from "@/util";

const baseApplication = generateDprApplication();

const meta = {
  title: "DPR Components/ApplicationHero",
  component: ApplicationHero,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilSlug: "public-council-1",
    application: baseApplication,
  },
} satisfies Meta<typeof ApplicationHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const StatusConsultationInProgress: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "assessment_in_progress",
        decision: null,
        consultation: {
          startDate: formatDateToYmd(new Date(Date.now() - 5 * 86400000)),
          endDate: formatDateToYmd(new Date(Date.now() + 86400000)),
          publishedComments: null,
          consulteeComments: null,
        },
      },
    },
  },
};

export const StatusAssessmentInProgress: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "in_assessment",
        decision: null,
        consultation: {
          startDate: formatDateToYmd(new Date(Date.now() - 5 * 86400000)),
          endDate: formatDateToYmd(new Date(Date.now() - 86400000)),
          publishedComments: null,
          consulteeComments: null,
        },
      },
    },
  },
};

export const StatusDetermined: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "determined",
        decision: null,
        consultation: {
          startDate: new Date(Date.now() - 5 * 86400000).toISOString(),
          endDate: new Date(Date.now() - 86400000).toISOString(),
          publishedComments: null,
          consulteeComments: null,
        },
      },
    },
  },
};

export const StatusWithdrawn: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "withdrawn",
        decision: null,
      },
    },
  },
};

export const StatusClosed: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "closed",
        decision: null,
      },
    },
  },
};
export const StatusReturned: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "returned",
        decision: null,
      },
    },
  },
};

export const StatusNotStarted: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "not_started",
        decision: null,
      },
    },
  },
};

export const StatusPending: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "pending",
        decision: null,
      },
    },
  },
};

export const StatusInvalid: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "invalid",
        decision: null,
      },
    },
  },
};

export const StatusAppealLodged: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "Appeal lodged",
        decision: "refused",
      },
    },
  },
};

export const StatusAppealValid: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "Appeal valid",
        decision: "granted",
      },
    },
  },
};

export const StatusAppealStarted: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "Appeal started",
        decision: "granted",
      },
    },
  },
};

export const StatusAppealDetermined: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "Appeal determined",
        decision: "granted",
        appeal: {
          decision: "allowed",
          decisionDate: new Date().toISOString(),
          lodgedDate: new Date().toISOString(),
          startedDate: new Date().toISOString(),
          validatedDate: new Date().toISOString(),
        },
      },
    },
  },
};

export const StatusAppealAllowed: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "Appeal allowed",
        decision: "granted",
        appeal: {
          decision: "allowed",
          decisionDate: new Date().toISOString(),
          lodgedDate: new Date().toISOString(),
          startedDate: new Date().toISOString(),
          validatedDate: new Date().toISOString(),
        },
      },
    },
  },
};

export const StatusAppealDismissed: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "Appeal dismissed",
        decision: "refused",
        appeal: {
          decision: "dismissed",
          decisionDate: new Date().toISOString(),
          lodgedDate: new Date().toISOString(),
          startedDate: new Date().toISOString(),
          validatedDate: new Date().toISOString(),
        },
      },
    },
  },
};

export const StatusAppealSplitDecision: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "Appeal split decision",
        decision: "granted",
        appeal: {
          decision: "split_decision",
          decisionDate: new Date().toISOString(),
          lodgedDate: new Date().toISOString(),
          startedDate: new Date().toISOString(),
          validatedDate: new Date().toISOString(),
        },
      },
    },
  },
};

export const StatusAppealWithdrawn: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "Appeal withdrawn",
        decision: "granted",
        appeal: {
          decision: "withdrawn",
          decisionDate: new Date().toISOString(),
          lodgedDate: new Date().toISOString(),
          startedDate: new Date().toISOString(),
          validatedDate: new Date().toISOString(),
        },
      },
    },
  },
};

export const DecisionGranted: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "determined",
        decision: "granted",
      },
    },
  },
};

export const DecisionRefused: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "determined",
        decision: "refused",
      },
    },
  },
};

export const DecisionPriorApprovalRequiredAndApproved: Story = {
  args: {
    application: {
      ...baseApplication,
      applicationType: "pa",
      application: {
        ...baseApplication.application,
        status: "determined",
        decision: "granted",
      },
    },
  },
};

export const DecisionPriorApprovalNotRequired: Story = {
  args: {
    application: {
      ...baseApplication,
      applicationType: "pa",
      application: {
        ...baseApplication.application,

        status: "determined",
        decision: "not_required",
      },
    },
  },
};

export const DecisionPriorApprovalRequiredAndRefused: Story = {
  args: {
    application: {
      ...baseApplication,
      applicationType: "pa",
      application: {
        ...baseApplication.application,
        status: "determined",
        decision: "refused",
      },
    },
  },
};

export const AppealDecisionAllowed: Story = {
  args: {
    application: generateDprApplication({
      decision: "refused",
      applicationStatus: "Appeal allowed",
      appeal: {
        decision: "allowed",
        decisionDate: new Date().toISOString(),
        lodgedDate: new Date().toISOString(),
        startedDate: new Date().toISOString(),
        validatedDate: new Date().toISOString(),
      },
    }),
  },
};

export const AppealDecisionDismissed: Story = {
  args: {
    application: generateDprApplication({
      decision: "refused",
      applicationStatus: "Appeal allowed",
      appeal: {
        decision: "dismissed",
        decisionDate: new Date().toISOString(),
        lodgedDate: new Date().toISOString(),
        startedDate: new Date().toISOString(),
        validatedDate: new Date().toISOString(),
      },
    }),
  },
};

export const AppealDecisionSplitDecision: Story = {
  args: {
    application: generateDprApplication({
      decision: "refused",
      applicationStatus: "Appeal allowed",
      appeal: {
        decision: "split_decision",
        decisionDate: new Date().toISOString(),
        lodgedDate: new Date().toISOString(),
        startedDate: new Date().toISOString(),
        validatedDate: new Date().toISOString(),
      },
    }),
  },
};

export const AppealDecisionWithdrawn: Story = {
  args: {
    application: generateDprApplication({
      decision: "refused",
      applicationStatus: "Appeal allowed",
      appeal: {
        decision: "withdrawn",
        decisionDate: new Date().toISOString(),
        lodgedDate: new Date().toISOString(),
        startedDate: new Date().toISOString(),
        validatedDate: new Date().toISOString(),
      },
    }),
  },
};

export const AppealDecisionNotDecidedYet: Story = {
  args: {
    application: generateDprApplication({
      decision: "refused",
      applicationStatus: "Appeal lodged",
      appeal: {
        decision: undefined, // explicitly setting it to null
        lodgedDate: new Date().toISOString(),
        startedDate: new Date().toISOString(),
        validatedDate: new Date().toISOString(),
      },
    }),
  },
};
