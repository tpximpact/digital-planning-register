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
import { thumbnails } from "./Thumbnails";

const meta: Meta = {
  title: "Gov UK DPR Components/Thumbnails",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Document: Story = {
  render: () => <>{thumbnails.document}</>,
};
export const Html: Story = {
  render: () => <>{thumbnails.html}</>,
};
export const Pdf: Story = {
  render: () => <>{thumbnails.pdf}</>,
};
export const Spreadsheet: Story = {
  render: () => <>{thumbnails.spreadsheet}</>,
};
export const Generic: Story = {
  render: () => <>{thumbnails.generic}</>,
};
export const External: Story = {
  render: () => <>{thumbnails.external}</>,
};
