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
import { ContentNoResult } from "./ContentNoResult";
import { createCouncilConfig } from "@mocks/appConfigFactory";

const baseCouncilConfig = createCouncilConfig({
  councilName: "Public Council 1",
  contact: "https://planningregister.org/",
});

const meta = {
  title: "Content/No result",
  component: ContentNoResult,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof ContentNoResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCouncilConfig: Story = {
  args: {
    councilConfig: baseCouncilConfig,
  },
};
