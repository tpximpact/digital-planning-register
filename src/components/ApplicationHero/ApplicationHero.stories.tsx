import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationHero } from "./ApplicationHero";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

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
        status: "in_progress",
        decision: null,
        consultation: {
          endDate: new Date(Date.now() + 86400000).toISOString(),
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
          endDate: new Date(Date.now() - 86400000).toISOString(),
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
          endDate: new Date(Date.now() - 86400000).toISOString(),
          publishedComments: null,
          consulteeComments: null,
        },
      },
    },
  },
};

export const StatusAwaitingDetermination: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "awaiting_determination",
        decision: null,
        consultation: {
          endDate: new Date(Date.now() - 86400000).toISOString(),
          publishedComments: null,
          consulteeComments: null,
        },
      },
    },
  },
};

export const StatusAwaitingCorrection: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "awaiting_correction",
        decision: null,
        consultation: {
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
