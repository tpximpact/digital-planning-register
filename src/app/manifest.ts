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

import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Digital planning register",
    short_name: "DPR",
    description:
      "Find planning applications submitted through the Open Digital Planning system for your local council planning authority.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b0c0c",
    icons: [
      {
        src: "/assets/favicon.ico",
        type: "image/x-icon",
        sizes: "48x48",
      },
      {
        src: "/assets/favicon.svg",
        type: "image/svg+xml",
        sizes: "150x150",
        purpose: "any",
      },
      {
        src: "/govuk/assets/images/govuk-icon-180.png",
        type: "image/png",
        sizes: "180x180",
        purpose: "maskable",
      },
      {
        src: "/govuk/assets/images/govuk-icon-192.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "maskable",
      },
      {
        src: "/govuk/assets/images/govuk-icon-512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
      {
        src: "/govuk/assets/images/govuk-icon-mask.svg",
        type: "image/svg+xml",
        sizes: "150x150",
        purpose: "monochrome",
      },
    ],
  };
}
