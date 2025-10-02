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

import { getCouncilList, getCouncilConfig, getAppConfig } from "@/config";
import {
  APPLICATION_SEARCH_FIELDS,
  COMMENT_SEARCH_FIELDS,
  DOCUMENT_SEARCH_FIELDS,
} from "@/config/featureFlag";
import { Council } from "@/config/types";

describe("getAppConfig", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.OS_MAP_PROXY_URL = "https://os.example.com";
  });

  afterEach(() => {
    delete process.env.OS_MAP_PROXY_URL;
  });

  it("returns config with council if valid council is provided", () => {
    const config = getAppConfig("public-council-1");
    expect(config.council).toBeDefined();
    expect(config.council?.slug).toBe("public-council-1");
    expect(config.council?.name).toBe("Public Council 1");
    expect(config.councils).toHaveLength(8);
    expect(config.features?.osMapProxyUrl).toBe("https://os.example.com");
  });

  it("returns config with council undefined if invalid council is provided", () => {
    const config = getAppConfig("not-a-council");
    expect(config.council).toBeUndefined();
    expect(config.councils).toHaveLength(8);
  });

  it("returns config with council undefined if no council is provided", () => {
    const config = getAppConfig();
    expect(config.council).toBeUndefined();
    expect(config.councils).toHaveLength(8);
  });

  it.skip("sets features fields correctly", () => {
    const config = getAppConfig("public-council-1");
    expect(config.features?.getApplicationIdFromPrivateEndpoint).toBe(true);
    expect(config.features?.osMapProxyUrl).toBe("https://os.example.com");
    expect(config.features?.documentSearchFields).toEqual(
      DOCUMENT_SEARCH_FIELDS,
    );
    expect(config.features?.commentSearchFields).toEqual(COMMENT_SEARCH_FIELDS);
    expect(config.features?.applicationSearchFields).toEqual(
      APPLICATION_SEARCH_FIELDS,
    );
  });

  it("sets defaults and navigation", () => {
    const config = getAppConfig("public-council-1");
    expect(config.defaults.resultsPerPage).toBe(10);
    expect(config.defaults.revalidate).toBe(60);
    expect(Array.isArray(config.navigation)).toBe(true);
    expect(config.navigation[0]).toHaveProperty("label");
  });

  it("uses OS_MAP_PROXY_URL from env if set, otherwise undefined", () => {
    process.env.OS_MAP_PROXY_URL = "https://os.example.com";
    const configWithUrl = getAppConfig("public-council-1");
    expect(configWithUrl.features?.osMapProxyUrl).toBe(
      "https://os.example.com",
    );

    delete process.env.OS_MAP_PROXY_URL;
    const configWithoutUrl = getAppConfig("public-council-1");
    expect(configWithoutUrl.features?.osMapProxyUrl).toBeUndefined();
  });
});

describe("getCouncilConfig", () => {
  const councils: Council[] = [
    {
      slug: "camden",
      name: "Camden",
      dataSource: "bops",
      publicComments: true,
      specialistComments: false,
      visibility: "public",
      pageContent: {
        privacy_policy: {
          privacy_policy_link: "link",
        },
      },
    },
    {
      slug: "barnet",
      name: "Barnet",
      dataSource: "bops",
      publicComments: true,
      specialistComments: false,
      visibility: "public",
      pageContent: {
        privacy_policy: {
          privacy_policy_link: "link",
        },
      },
    },
    {
      slug: "southwark",
      name: "Southwark",
      dataSource: "bops",
      publicComments: true,
      specialistComments: false,
      visibility: "public",
      pageContent: {
        privacy_policy: {
          privacy_policy_link: "link",
        },
      },
    },
  ];

  it("returns the correct council config when slug matches", () => {
    const result = getCouncilConfig("camden", councils);
    expect(result).toEqual(councils[0]);
  });

  it("returns undefined if slug does not match any council", () => {
    const result = getCouncilConfig("not-a-council", councils);
    expect(result).toBeUndefined();
  });

  it("returns undefined if council argument is falsy", () => {
    expect(
      getCouncilConfig(undefined as unknown as string, councils),
    ).toBeUndefined();
    expect(
      getCouncilConfig(null as unknown as string, councils),
    ).toBeUndefined();
    expect(getCouncilConfig("", councils)).toBeUndefined();
  });

  it("returns undefined if councilConfigs is falsy", () => {
    expect(
      getCouncilConfig("camden", undefined as unknown as Council[]),
    ).toBeUndefined();
    expect(
      getCouncilConfig("camden", null as unknown as Council[]),
    ).toBeUndefined();
  });

  it("returns undefined if councilConfigs is empty", () => {
    expect(getCouncilConfig("camden", [])).toBeUndefined();
  });
});

describe("getCouncilList", () => {
  it("returns an array of slugs for councils with slugs", () => {
    const councils = [
      { slug: "camden", name: "Camden" },
      { slug: "barnet", name: "Barnet" },
      { slug: "lambeth", name: "Lambeth" },
    ];
    expect(getCouncilList(councils as Council[])).toEqual([
      "camden",
      "barnet",
      "lambeth",
    ]);
  });

  it("generates slug from name if slug is missing", () => {
    const councils = [
      { name: "My Council" },
      { slug: "barnet", name: "Barnet" },
      { name: "Another Council" },
    ];
    expect(getCouncilList(councils as Council[])).toEqual([
      "my-council",
      "barnet",
      "another-council",
    ]);
  });

  it("filters out councils with no slug and no name", () => {
    const councils = [{ slug: "barnet", name: "Barnet" }, { name: "" }, {}];
    expect(getCouncilList(councils as Council[])).toEqual(["barnet"]);
  });

  it("handles empty array", () => {
    expect(getCouncilList([])).toEqual([]);
  });

  it("handles undefined or null input gracefully", () => {
    expect(getCouncilList(undefined as unknown as Council[])).toEqual([]);
    expect(getCouncilList(null as unknown as Council[])).toEqual([]);
  });
});
