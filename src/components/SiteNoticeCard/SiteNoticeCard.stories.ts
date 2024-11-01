import type { Meta, StoryObj } from "@storybook/react";
import { SiteNoticeCard } from "./SiteNoticeCard";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

const meta = {
  title: "DPR Components/SiteNoticeCard",
  component: SiteNoticeCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilSlug: "public-council-1",
    application: generateDprApplication(),
  },
} satisfies Meta<typeof SiteNoticeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
