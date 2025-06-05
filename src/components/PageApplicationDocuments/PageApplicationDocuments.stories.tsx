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
import { PageApplicationDocuments } from "./PageApplicationDocuments";
import {
  generateDocument,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { DprDocument } from "@/types";
import { createAppConfig } from "@mocks/appConfigFactory";
import { generateDprApplication } from "@mocks/dprNewApplicationFactory";

const documents = generateNResults<DprDocument>(10, generateDocument);

const meta = {
  title: "Council pages/Application documents",
  component: PageApplicationDocuments,
  decorators: [
    (Story) => {
      // since this is a page we need to add a decorator to add the main element to make it look a bit more like a page
      return (
        <main className="govuk-width-container" id="main">
          <Story />
        </main>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    params: {
      council: "public-council-1",
      reference: "12345",
    },
    appConfig: createAppConfig("public-council-1"),
    documents: documents,
    searchParams: {
      page: 1,
      resultsPerPage: 10,
    },
    application: generateDprApplication(),
    pagination: generatePagination(1, documents.length * 5),
  },
} satisfies Meta<typeof PageApplicationDocuments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoDocuments: Story = {
  args: {
    documents: undefined,
    pagination: generatePagination(1, 0),
  },
};
export const SearchResults: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      name: "Test Document",
    },
  },
};
export const SearchNoResults: Story = {
  args: {
    documents: null,
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      name: "Test Document",
    },
    pagination: generatePagination(1, 0, documents.length * 5),
  },
};
