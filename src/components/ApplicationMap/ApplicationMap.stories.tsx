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
import {
  ApplicationMap,
  ApplicationMapLoading,
  ApplicationMapLoaderDelay,
  ApplicationMapUnavailable,
} from ".";
import {
  geoJSONFeatureCollectionExample,
  geoJSONFeatureExample,
  geoJSONLineStringExample,
  geoJSONMultilineStringExample,
  geoJSONMultipointExample,
  geoJSONPointExample,
  geoJSONPolygonExample,
} from "@mocks/geoJsonExamples";

const meta = {
  title: "DPR Components/ApplicationMap",
  component: ApplicationMap,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },

  args: {
    osMapProxyUrl: process.env.OS_MAP_PROXY_URL ?? undefined,
    reference: "12345",
    mapData: geoJSONFeatureExample,
    description:
      "This is an aria description for this map to give more context",
  },
} satisfies Meta<typeof ApplicationMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MapTypeContextSetter: Story = {
  args: {
    mapType: "context-setter",
  },
};

export const MapTypeConstraintAccordion: Story = {
  args: {
    mapType: "constraint-accordion",
  },
};

export const MapTypeApplicationSearch: Story = {
  args: {
    mapType: "application-search",
  },
};

export const MapTypeApplicationShow: Story = {
  args: {
    mapType: "application-show",
  },
};

export const NoData: Story = {
  args: {
    mapData: undefined,
  },
};

export const MapStateForceStatic: Story = {
  args: {
    isStatic: true,
  },
};

export const MapStateLoadingMap: Story = {
  render: () => <ApplicationMapLoading {...meta.args} />,
};

export const MapStateUnavailableMap: Story = {
  render: () => <ApplicationMapUnavailable {...meta.args} />,
};

export const MapStateDelayedLoader: Story = {
  render: () => <ApplicationMapLoaderDelay {...meta.args} />,
};

export const GeoJSONPoint: Story = {
  args: {
    mapData: geoJSONPointExample,
  },
};

export const GeoJSONLinestring: Story = {
  args: {
    mapData: geoJSONLineStringExample,
  },
};

export const GeoJSONPolygon: Story = {
  args: {
    mapData: geoJSONPolygonExample,
  },
};

export const GeoJSONMultiline: Story = {
  args: {
    mapData: geoJSONMultilineStringExample,
  },
};

export const GeoJSONMultipoint: Story = {
  args: {
    mapData: geoJSONMultipointExample,
  },
};

export const GeoJSONFeature: Story = {
  args: {
    mapData: geoJSONFeatureExample,
  },
};

export const GeoJSONFeatureCollection: Story = {
  args: {
    mapData: geoJSONFeatureCollectionExample,
  },
};
