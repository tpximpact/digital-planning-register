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
import { Attachment } from "./Attachment";

const meta = {
  title: "Gov UK DPR Components/Attachment",
  component: Attachment,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

// add options here instead of above so thet dont affect other stories
export const Default: Story = {
  args: {
    title: "Full example",
    url: "#",
    fileName: "filename.pdf",
    contentType: "pdf",
    fileSize: 25000,
    numberOfPages: 4,
    alternativeFormatContactEmail: "test@example.com",
    uploadedAt: new Date().toISOString(),
  },
};

export const Blank: Story = {};

export const MimeType: Story = {
  args: {
    mimeType: "application/pdf",
  },
};

export const Tags: Story = {
  args: {
    tagPrefix: "Document type",
    tags: ["one", "two", "three"],
  },
};

export const RequestAccessibleFormatEmail: Story = {
  args: {
    title: "Request accessible format with email",
    url: "#",
    alternativeFormatContactEmail: "test@example.com",
    contentType: "pdf",
    fileSize: 25000,
    numberOfPages: 2,
  },
};
export const WithThumbnail: Story = {
  args: {
    title: "Attachment with Thumbnail",
    url: "#",
    thumbnailUrl: "/govuk/assets/images/govuk-crest.svg",
    contentType: "pdf",
    fileSize: 25000,
    numberOfPages: 2,
  },
};

export const Pdf: Story = {
  name: "Content type: PDF",
  args: {
    contentType: "pdf",
  },
};

export const Document: Story = {
  name: "Content type: Document",
  args: {
    contentType: "document",
  },
};

export const Spreadsheet: Story = {
  name: "Content type: Spreadsheet",
  args: {
    contentType: "spreadsheet",
  },
};

export const Html: Story = {
  name: "Content type: HTML",
  args: {
    contentType: "html",
  },
};

export const External: Story = {
  name: "Content type: External",
  args: {
    contentType: "external",
  },
};

export const Generic: Story = {
  name: "Content type: Generic",
  args: {
    contentType: "generic",
  },
};
