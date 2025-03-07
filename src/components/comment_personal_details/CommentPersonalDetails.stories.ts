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
import CommentPersonalDetails from ".";
import { createAppConfig } from "@mocks/appConfigFactory";
import { Council } from "@/config/types";

const appConfig = createAppConfig("public-council-1");
const councilConfig = appConfig.council as Council;
const meta = {
  title: "Comments/CommentPersonalDetails",
  component: CommentPersonalDetails,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilConfig,
    reference: "12345",
    navigateToPage: () => {},
    updateProgress: () => {},
  },
} satisfies Meta<typeof CommentPersonalDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCouncilData: Story = {
  args: {
    councilConfig: {
      ...councilConfig,
      pageContent: {
        ...councilConfig?.pageContent,
        council_reference_submit_comment_personal_details: {
          contact_planning_advice_link: "https://www.example.com",
          corporate_privacy_statement_link: "https://www.example.com",
          planning_service_privacy_statement_link: "https://www.example.com",
        },
      },
    },
  },
};
export const WithOutCouncilData: Story = {
  args: {
    councilConfig: {
      ...councilConfig,
      pageContent: {
        ...councilConfig?.pageContent,
        council_reference_submit_comment_personal_details: undefined,
      },
    },
  },
};
