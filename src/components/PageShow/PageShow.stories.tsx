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
  generateComment,
  generateDocument,
  generateDprApplication,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { createAppConfig } from "@mocks/appConfigFactory";
import { formatDateToYmd } from "@/util";

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
          startDate: new Date(Date.now() - 86400000).toISOString(),
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
          startDate: new Date(Date.now() - 172800000).toISOString(),
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
        status: "assessment_in_progress",
        decision: null,
        consultation: {
          startDate: formatDateToYmd(new Date(Date.now() - 86400000)),
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
          startDate: new Date(Date.now() - 172800000).toISOString(),
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
          startDate: new Date(Date.now() - 172800000).toISOString(),
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
          startDate: new Date(Date.now() - 172800000).toISOString(),
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
          startDate: new Date(Date.now() - 86400000).toISOString(),
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
          startDate: new Date(Date.now() - 86400000).toISOString(),
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
          startDate: new Date(Date.now() - 86400000).toISOString(),
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
          startDate: new Date(Date.now() - 86400000).toISOString(),
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
          startDate: new Date(Date.now() - 86400000).toISOString(),
          endDate: new Date(Date.now() + 86400000).toISOString(),
          publishedComments: null,
          consulteeComments: generateNResults(1, generateComment),
        },
      },
    },
  },
};
