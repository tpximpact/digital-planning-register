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
  generateComment,
  generateDocument,
  generateNResults,
} from "@mocks/dprApplicationFactory";
import { DprComment, DprDocument } from "@/types";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";
const baseAppConfig = createAppConfig("public-council-1");

const { committeeDetermined } = generateExampleApplications();

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
    application: committeeDetermined,
    documents: generateNResults<DprDocument>(3, generateDocument),
    publicCommentSummary: {
      sentiment: {
        supportive: 10,
        neutral: 5,
        objection: 2,
      },
      totalComments: 17,
    },
    specialistCommentSummary: {
      sentiment: {
        approved: 7,
        amendmentsNeeded: 3,
        objected: 4,
      },
      totalConsulted: 16,
      totalComments: 14,
    },
    publicComments: generateNResults<DprComment>(3, generateComment),
    specialistComments: generateNResults<DprComment>(3, generateComment),
  },
} satisfies Meta<typeof ApplicationDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSentimentSummaryEnabled: Story = {
  args: {
    appConfig: {
      ...baseAppConfig,
      features: {
        getApplicationIdFromPrivateEndpoint:
          baseAppConfig.features?.getApplicationIdFromPrivateEndpoint ?? true,
        commentSearchFields: ["sentiment", "sentimentSpecialist"],
      },
    },
    publicComments: undefined,
    specialistComments: undefined,
  },
};
export const WithSentimentSummaryDisabled: Story = {
  args: {
    appConfig: {
      ...baseAppConfig,
      features: {
        getApplicationIdFromPrivateEndpoint:
          baseAppConfig.features?.getApplicationIdFromPrivateEndpoint ?? true,
        commentSearchFields: [],
      },
    },
    publicCommentSummary: undefined,
    specialistCommentSummary: undefined,
  },
};
