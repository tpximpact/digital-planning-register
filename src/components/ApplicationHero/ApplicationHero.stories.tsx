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
          endDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
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
          endDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
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
          endDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
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
          endDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          publishedComments: null,
          consulteeComments: null,
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

export const DecisionWithdrawn: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "determined",
        decision: "withdrawn",
      },
    },
  },
};

export const DecisionPriorApprovalRequired: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        type: {
          description: "prior_approval",
        },
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
      application: {
        ...baseApplication.application,
        type: {
          description: "prior_approval",
        },
        status: "determined",
        decision: "not_required",
      },
    },
  },
};

export const DecisionPriorApprovalRefused: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        type: {
          description: "prior_approval",
        },
        status: "determined",
        decision: "refused",
      },
    },
  },
};
