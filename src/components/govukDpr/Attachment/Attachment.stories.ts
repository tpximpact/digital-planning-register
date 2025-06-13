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
import Attachment from "./Attachment";

export interface AttachmentProps {
  title?: string;
  url?: string;
  fileName?: string;
  thumbnailUrl?: string;
  contentType?: string;
  fileSize?: number;
  alternativeFormatContactEmail?: string;
  numberOfPages?: number;
}
const meta = {
  title: "Gov UK DPR Components/Attachment",
  component: Attachment,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    title: "Lorem ipsum odor amet, consectetuer adipiscing elit",
    url: "#",
    fileSize: 21234000,
    numberOfPages: 3,
  },
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<AttachmentProps>;

export const Default: Story = {};

export const Pdf: Story = {
  args: {
    contentType: "pdf",
    url: "#",
    fileSize: 200223420,
    title: "Lorem ipsum dolor sit amet",
    numberOfPages: 3,
  },
};

export const Doc: Story = {
  args: {
    contentType: "doc",
    url: "#",
    fileSize: 25000,
    title: "Facilisi porta ante",
    numberOfPages: 1,
  },
};

export const Spreadsheet: Story = {
  args: {
    contentType: "xls",
    url: "#",
    fileSize: 68880,
    title: "Aptent iaculis sem luctus eleifend in nibh netus pharetra vehicula",
  },
};

export const Html: Story = {
  args: {
    contentType: "html",
    url: "#",
    fileSize: 645640,
    title: "Cubilia montes scelerisque",
  },
};

export const External: Story = {
  args: {
    contentType: "external",
    url: "#",
    fileSize: 5000,
    title: "Dui ante volutpat feugiat rutrum aptent arcu sollicitudin euismod",
  },
};

export const Generic: Story = {
  args: {
    contentType: "xxx",
    url: "#",
    title: " Eu vitae aliquam",
  },
};

export const RequestAccessibleFormatEmail: Story = {
  args: {
    contentType: "pdf",
    url: "#",
    fileSize: 2023400,
    title: "Lorem ipsum dolor sit amet",
    numberOfPages: 3,
    alternativeFormatContactEmail: "test@example.com",
  },
};
export const WithThumbnail: Story = {
  args: {
    title: "Attachment with Thumbnail",
    url: "#",
    thumbnailUrl: "/govuk/assets/images/govuk-crest.svg",
    contentType: "pdf",
    fileSize: 1234567,
    numberOfPages: 5,
  },
};
