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
import { Meta, StoryObj } from "@storybook/react";
import { ContentNotOnDprYet } from "./ContentNotOnDprYet";
import { createCouncilConfig } from "@mocks/appConfigFactory";

const council = createCouncilConfig({
  councilName: "Public Council 1",
  currentLiveRegister: "example.com",
});

const meta = {
  title: "DPR Components/ContentNotOnDprYet",
  component: ContentNotOnDprYet,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    council: council,
  },
} satisfies Meta<typeof ContentNotOnDprYet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoCurrentLiveRegister: Story = {
  args: {
    council: createCouncilConfig({
      councilName: "Public Council 2",
      currentLiveRegister: undefined,
    }),
  },
};
