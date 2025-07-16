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

/**
 * gotta test the tests!
 */

import { CouncilDataSource } from "@/config/types";
import { createAppConfig, createCouncilConfig } from "@mocks/appConfigFactory";

describe("createAppConfig", () => {
  it("creates a default configuration", () => {
    const config = createAppConfig();
    expect(config.councils).toHaveLength(8);
    expect(config.councils[0].name).toBe("Public Council 1");
    expect(config.councils[1].name).toBe("Public Council 2");
    expect(config.councils[2].name).toBe("Unlisted Council 1");
    expect(config.councils[3].name).toBe("Unlisted Council 2");
    expect(config.councils[4].name).toBe("Private Council 1");
    expect(config.councils[5].name).toBe("Private Council 2");
    expect(config.councils[6].name).toBe("Public overwritten");
    expect(config.councils[7].name).toBe("Public no bops env vars");
  });

  it("returns the correct council when getCouncil is called", () => {
    const config = createAppConfig();
    const council = config.councils.find((c) => c.slug === "public-council-1");
    expect(council).toBeDefined();
    expect(council?.name).toBe("Public Council 1");
  });

  it("returns null when not initiated with a council", () => {
    const config = createAppConfig();
    expect(config.council).toBeUndefined();
  });

  it("returns correct council when initiated with a council", () => {
    const config = createAppConfig("public-council-1");
    expect(config.council).not.toBeUndefined();
    expect(config.council?.name).toBe("Public Council 1");
  });
});

describe("createCouncilConfig", () => {
  it("creates a council configuration with default values", () => {
    const councilConfig = createCouncilConfig({ councilName: "Test Council" });
    expect(councilConfig.name).toBe("Test Council");
    expect(councilConfig.slug).toBe("test-council");
    expect(councilConfig.visibility).toBe("public");
    expect(councilConfig.dataSource).toBe("local");
    expect(councilConfig.publicComments).toBe(true);
    expect(councilConfig.specialistComments).toBe(true);
    expect(councilConfig.pageContent).toEqual({
      privacy_policy: {
        privacy_policy_link: "test-council-privacy-policy-link",
      },
    });
  });

  it("creates a council configuration with custom values", () => {
    const customPageContent = {
      privacy_policy: {
        privacy_policy_link: "custom-link",
      },
    };
    const councilConfig = createCouncilConfig({
      councilName: "Custom Council",
      visibility: "private",
      dataSource: "customSource" as CouncilDataSource,
      publicComments: false,
      specialistComments: false,
      pageContent: customPageContent,
      features: {
        logoInHeader: false,
      },
    });
    expect(councilConfig.name).toBe("Custom Council");
    expect(councilConfig.slug).toBe("custom-council");
    expect(councilConfig.visibility).toBe("private");
    expect(councilConfig.dataSource).toBe("customSource");
    expect(councilConfig.publicComments).toBe(false);
    expect(councilConfig.specialistComments).toBe(false);
    expect(councilConfig.pageContent).toEqual(customPageContent);
    expect(councilConfig.features?.logoInHeader).toBe(false);
  });

  it("creates a council configuration with partial custom values", () => {
    const councilConfig = createCouncilConfig({
      councilName: "Partial Custom Council",
      visibility: "unlisted",
    });
    expect(councilConfig.name).toBe("Partial Custom Council");
    expect(councilConfig.slug).toBe("partial-custom-council");
    expect(councilConfig.visibility).toBe("unlisted");
    expect(councilConfig.dataSource).toBe("local");
    expect(councilConfig.publicComments).toBe(true);
    expect(councilConfig.specialistComments).toBe(true);
    expect(councilConfig.pageContent).toEqual({
      privacy_policy: {
        privacy_policy_link: "partial-custom-council-privacy-policy-link",
      },
    });
  });
});
