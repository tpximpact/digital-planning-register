import type { Preview } from "@storybook/react";

import "../src/styles/global.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Public pages",
          "Council pages",
          "Templates",
          "DPR Components",
          "GOV UK Components",
          "Forms",
        ],
      },
    },
  },
};

export default preview;
