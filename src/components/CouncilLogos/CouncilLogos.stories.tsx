import type { Meta, StoryObj } from "@storybook/react";
import { councilLogos } from "./CouncilLogos";

const meta = {
  title: "DPR Components/CouncilLogos",
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    docs: {
      description: {
        component: `<strong>Why are they blue?!</strong><br /><br />This is set in this story only to ensure that each logo is configured correctly.<br /><br />In order to be accessible each logo should have its fill set to currentColor <code>fill="currentColor"</code> so that when we use it in different places we can easily change the colour by setting <code>color: red</code> and so that the browser can apply forced-colours on the images correctly.<br />`,
      },
    },
  },
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters }) => {
      return (
        <div style={{ color: "blue" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Barnet: Story = {
  render: () => <>{councilLogos.barnet}</>,
};
export const Buckinghamshire: Story = {
  render: () => <>{councilLogos.buckinghamshire}</>,
};
export const Camden: Story = {
  render: () => <>{councilLogos.camden}</>,
};
export const Gateshead: Story = {
  render: () => <>{councilLogos.gateshead}</>,
};
export const Lambeth: Story = {
  render: () => <>{councilLogos.lambeth}</>,
};
export const Medway: Story = {
  render: () => <>{councilLogos.medway}</>,
};
export const Southwark: Story = {
  render: () => <>{councilLogos.southwark}</>,
};
