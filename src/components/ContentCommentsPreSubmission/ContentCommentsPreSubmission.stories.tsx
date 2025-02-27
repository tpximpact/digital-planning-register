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
import { ContentCommentsPreSubmission } from "./ContentCommentsPreSubmission";
import { createAppConfig } from "@mocks/appConfigFactory";
import { Council } from "@/config/types";

const appConfig = createAppConfig("public-council-1");
const councilConfig = appConfig.council as Council;
const meta = {
  title: "Comments/ContentCommentsPreSubmission",
  component: ContentCommentsPreSubmission,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilConfig,
  },
} satisfies Meta<typeof ContentCommentsPreSubmission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCouncilContent: Story = {
  args: {
    councilConfig: {
      ...councilConfig,
      pageContent: {
        ...councilConfig?.pageContent,
        council_reference_submit_comment_pre_submission: {
          ...councilConfig?.pageContent
            .council_reference_submit_comment_pre_submission,
          what_happens_to_your_comments_link: "http://example.com",
        },
      },
    },
  },
};

export const WithOutCouncilContent: Story = {
  args: {
    councilConfig: {
      ...councilConfig,
      pageContent: {
        ...councilConfig?.pageContent,
        council_reference_submit_comment_pre_submission: undefined,
      },
    },
  },
};
