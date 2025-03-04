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
import { ApplicationProgressInfo } from "./ApplicationProgressInfo";
import { formatDateTimeToDprDate } from "@/util";

const meta = {
  title: "DPR Components/ApplicationProgressInfo",
  component: ApplicationProgressInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    sections: [
      {
        title: "Received",
        date: "2 Jan 2021",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Valid from",
        date: "3 Jan 2021",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Published",
        date: "4 Jan 2021",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Consultation ended",
        date: "5 Jan 2021",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Council decision made",
        date: (
          <time dateTime={"2025-07-05T06:37:03.217Z"}>
            {formatDateTimeToDprDate("2025-07-05T06:37:03.217Z")}
          </time>
        ),
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Appeal lodged",
        date: "6 Jan 2021",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Appeal valid from",
        date: "7 Jan 2021",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Appeal started",
        date: "8 Jan 2021",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Appeal decided",
        date: "9 Jan 2021",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
    ],
  },
} satisfies Meta<typeof ApplicationProgressInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const One: Story = {
  args: {
    sections: [
      {
        title: "Received",
        date: "2025-01-02",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
    ],
  },
};
