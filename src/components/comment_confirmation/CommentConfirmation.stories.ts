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
import CommentConfirmation from ".";
import { createAppConfig } from "@mocks/appConfigFactory";
import { Council } from "@/config/types";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";

const appConfig = createAppConfig("public-council-1");
const councilConfig = appConfig.council as Council;
const { consultation } = generateExampleApplications();
const meta = {
  title: "Comments/CommentConfirmation",
  component: CommentConfirmation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    reference: "12345",
    council: "public-council-1",
    councilConfig,
    application: consultation,
    navigateToPage: () => {},
  },
} satisfies Meta<typeof CommentConfirmation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithEmailAlerts: Story = {
  args: {
    councilConfig: {
      ...councilConfig,
      pageContent: {
        ...councilConfig?.pageContent,
        email_alerts: {
          sign_up_for_alerts_link: "http://example.com",
        },
      },
    },
  },
};

export const WithoutEmailAlerts: Story = {
  args: {
    councilConfig: {
      ...councilConfig,
      pageContent: {
        ...councilConfig?.pageContent,
      },
    },
  },
};
