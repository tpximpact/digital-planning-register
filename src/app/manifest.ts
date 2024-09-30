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
        src: "/govuk-assets/images/favicon.ico",
        type: "image/x-icon",
        sizes: "48x48",
      },
      {
        src: "/govuk-assets/images/favicon.svg",
        type: "image/svg+xml",
        sizes: "150x150",
        purpose: "any",
      },
      {
        src: "/govuk-assets/images/govuk-icon-180.png",
        type: "image/png",
        sizes: "180x180",
        purpose: "maskable",
      },
      {
        src: "/govuk-assets/images/govuk-icon-192.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "maskable",
      },
      {
        src: "/govuk-assets/images/govuk-icon-512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
      {
        src: "/govuk-assets/images/govuk-icon-mask.svg",
        type: "image/svg+xml",
        sizes: "150x150",
        purpose: "monochrome",
      },
    ],
  };
}
