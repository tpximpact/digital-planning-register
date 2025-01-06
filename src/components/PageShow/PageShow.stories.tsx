import type { Meta, StoryObj } from "@storybook/react";
import { PageShow } from "./PageShow";
import {
  generateComment,
  generateDocument,
  generateDprApplication,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { createAppConfig } from "@mocks/appConfigFactory";

const baseApplication = generateDprApplication();

const meta = {
  title: "Council pages/Show",
  component: PageShow,
  decorators: [
    (Story, { args }) => {
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
    application: generateDprApplication(),
    documents: generateNResults(10, generateDocument),
    params: {
      council: "public-council-1",
      reference: "123456",
    },
  },
} satisfies Meta<typeof PageShow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoResult: Story = {
  args: {
    application: null,
  },
};

export const CommentingEnabled: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "in_assessment",
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

export const CommentingDisabled: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "determined",
        decision: "granted",
        consultation: {
          endDate: new Date(Date.now() - 86400000).toISOString(),
          publishedComments: null,
          consulteeComments: null,
        },
      },
    },
  },
};

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

export const NoMapData: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
      },
      property: {
        address: {
          singleLine: baseApplication.property.address.singleLine,
        },
        boundary: {
          site: undefined,
        },
      },
    },
  },
};

export const FewerDocumentsWithoutViewAllButton: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
      },
    },
    documents: generateNResults(3, generateDocument),
  },
};

export const NoDocuments: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
      },
    },
    documents: [],
  },
};

// base council config for the following stories that require it
const baseCouncilConfig = {
  name: "Public Council 2",
  slug: "public-council-2",
  logo: "public-council-2-logo.svg",
  visibility: "public" as const,
  dataSource: "local",
  pageContent: {
    privacy_policy: {
      privacy_policy_link: "public-council-2-privacy-policy-link",
    },
  },
};

export const AllCommentsDisabled: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "in_assessment",
        decision: null,
        consultation: {
          endDate: new Date(Date.now() + 86400000).toISOString(),
          publishedComments: null,
          consulteeComments: null,
        },
      },
    },
    appConfig: {
      ...createAppConfig("Public Council 2"),
      council: {
        ...baseCouncilConfig,
        publicComments: false,
        specialistComments: false,
      },
    },
  },
};

export const OnlyPublicCommentsDisabled: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "in_assessment",
        decision: null,
        consultation: {
          endDate: new Date(Date.now() + 86400000).toISOString(),
          publishedComments: null,
          consulteeComments: null,
        },
      },
    },
    appConfig: {
      ...createAppConfig("Public Council 2"),
      council: {
        ...baseCouncilConfig,
        publicComments: false,
        specialistComments: true,
      },
    },
  },
};

export const OnlySpecialistCommentsDisabled: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "in_assessment",
        decision: null,
        consultation: {
          endDate: new Date(Date.now() + 86400000).toISOString(),
          publishedComments: null,
          consulteeComments: null,
        },
      },
    },
    appConfig: {
      ...createAppConfig("Public Council 2"),
      council: {
        ...baseCouncilConfig,
        publicComments: true,
        specialistComments: false,
      },
    },
  },
};

export const NoViewAllPublicCommentsButton: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "in_assessment",
        decision: null,
        consultation: {
          endDate: new Date(Date.now() + 86400000).toISOString(),
          publishedComments: generateNResults(1, generateComment),
          consulteeComments: null,
        },
      },
    },
  },
};

export const NoViewAllSpecialistCommentsButton: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "in_assessment",
        decision: null,
        consultation: {
          endDate: new Date(Date.now() + 86400000).toISOString(),
          publishedComments: null,
          consulteeComments: generateNResults(1, generateComment),
        },
      },
    },
  },
};
