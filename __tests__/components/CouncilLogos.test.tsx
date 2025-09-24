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

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  BarnetLogo,
  BuckinghamshireLogo,
  CamdenLogo,
  GatesheadLogo,
  LambethLogo,
  MedwayLogo,
  SouthwarkLogo,
  SouthGloucestershireLogo,
  PublicCouncil1Logo,
  PublicCouncil2Logo,
  CavyshireBoroughLogo,
  councilLogos,
} from "@/components/CouncilLogos";

describe("CouncilLogos individual components", () => {
  const logoComponents = [
    { name: "BarnetLogo", Component: BarnetLogo, viewBox: "0 0 726 195" },
    {
      name: "BuckinghamshireLogo",
      Component: BuckinghamshireLogo,
      viewBox: "0 0 295 76",
    },
    { name: "CamdenLogo", Component: CamdenLogo, viewBox: "0 0 350 75" },
    { name: "GatesheadLogo", Component: GatesheadLogo, viewBox: "0 0 227 65" },
    { name: "LambethLogo", Component: LambethLogo, viewBox: "0 0 320 113" },
    { name: "MedwayLogo", Component: MedwayLogo, viewBox: "0 0 124 86" },
    { name: "SouthwarkLogo", Component: SouthwarkLogo, viewBox: "0 0 190 84" },
    {
      name: "SouthGloucestershireLogo",
      Component: SouthGloucestershireLogo,
      viewBox: "0 0 194 75",
    },
    {
      name: "PublicCouncil1Logo",
      Component: PublicCouncil1Logo,
      viewBox: "0 0 435 107",
    },
    {
      name: "PublicCouncil2Logo",
      Component: PublicCouncil2Logo,
      viewBox: "0 0 298 247",
    },
    {
      name: "CavyshireBoroughLogo",
      Component: CavyshireBoroughLogo,
      viewBox: "0 0 2048 582",
    },
  ];

  logoComponents.forEach(({ name, Component, viewBox }) => {
    it(`renders ${name} as an SVG with correct attributes`, () => {
      render(<Component />);
      const svg = screen.getByRole("img", { hidden: true });
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
      expect(svg).toHaveAttribute("viewBox", viewBox);
      expect(svg).toHaveAttribute("aria-hidden", "true");
      expect(svg).toHaveAttribute("focusable", "false");
    });

    it(`${name} contains at least one <path> with fill='currentColor'`, () => {
      render(<Component />);
      const svg = screen.getByRole("img", { hidden: true });
      const paths = svg.querySelectorAll("path");
      expect(paths.length).toBeGreaterThan(0);
      Array.from(paths).forEach((path) => {
        expect(path).toHaveAttribute("fill", "currentColor");
      });
    });
  });
});

describe("councilLogos object", () => {
  it("contains all expected keys and renders the correct logo", () => {
    const keys = [
      "barnet",
      "buckinghamshire",
      "camden",
      "gateshead",
      "lambeth",
      "medway",
      "newcastle",
      "southwark",
      "south-gloucestershire",
      "public-council-1",
      "public-council-2",
      "cavyshire-borough",
    ];
    keys.forEach((key) => {
      expect(councilLogos).toHaveProperty(key);
      // Render the logo node and check for SVG
      const { container } = render(<>{councilLogos[key]}</>);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });
});
