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
import { ApplicationDetails } from "./ApplicationDetails";
import { createAppConfig } from "@mocks/appConfigFactory";
import {
  generateDocument,
  generateDprApplication,
  generateNResults,
} from "@mocks/dprApplicationFactory";
import { DprDocument } from "@/types";

const baseApplication = generateDprApplication();
let baseAppConfig = createAppConfig("public-council-1");
if (baseAppConfig?.council) {
  baseAppConfig.council.pageContent.email_alerts = {
    sign_up_for_alerts_link: "/signup",
  };
}

const meta = {
  title: "DPR Components/ApplicationDetails",
  component: ApplicationDetails,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    reference: "12345",
    appConfig: baseAppConfig,
    application: baseApplication,
    documents: generateNResults<DprDocument>(3, generateDocument),
  },
} satisfies Meta<typeof ApplicationDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoDocuments: Story = {
  args: {
    documents: undefined,
  },
};
export const FewDocuments: Story = {
  args: {
    documents: generateNResults<DprDocument>(3, generateDocument),
  },
};
export const ManyDocuments: Story = {
  args: {
    documents: generateNResults<DprDocument>(30, generateDocument),
  },
};
export const CommentsEnabled: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        consultation: {
          ...baseApplication.application.consultation,
          allowComments: true,
        },
      },
    },
  },
};
export const CommentsDisabledBecauseDetermined: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        status: "determined",
      },
    },
  },
};
export const CommentsDisabledBecauseFlag: Story = {
  args: {
    application: {
      ...baseApplication,
      application: {
        ...baseApplication.application,
        consultation: {
          ...baseApplication.application.consultation,
          allowComments: false,
        },
      },
    },
  },
};
