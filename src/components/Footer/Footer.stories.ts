import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    councilConfig: {
      name: "Camden",
      slug: "camden",
      visibility: "public",

      logo: "camdenlogo.svg",
      logowhite: "camdenlogowhite.svg",
      dataSource: "bops",
      publicComments: true,
      specialistComments: false,

      pageContent: {
        privacy_policy: {
          privacy_policy_link:
            "https://www.camden.gov.uk/data-protection-privacy-and-cookies",
        },
      },
    },
  },
};

export const Undefined: Story = {
  args: {
    councilConfig: undefined,
  },
};
