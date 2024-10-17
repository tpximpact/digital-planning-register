import { getCouncilList } from "@/config"; // Adjust the import path as necessary
import { Council } from "@/config/types";
import { createAppConfig } from "@mocks/appConfigFactory";

describe("getCouncilList", () => {
  it("should return an array of council slugs", () => {
    const appConfig = createAppConfig();
    const councilConfigs = appConfig.councils;
    const result = getCouncilList(councilConfigs);
    expect(result).toEqual([
      "public-council-1",
      "public-council-2",
      "unlisted-council-1",
      "unlisted-council-2",
      "private-council-1",
      "private-council-2",
    ]);
  });

  it("should return an empty array if no council configs are provided", () => {
    const councilConfigs: Council[] = [];

    const result = getCouncilList(councilConfigs);

    expect(result).toEqual([]);
  });

  it("should handle council configs with missing slugs", () => {
    const appConfig = createAppConfig();
    const councilConfigs: Partial<Council>[] = appConfig.councils.map(
      (council) => ({ ...council, slug: undefined }),
    );

    const result = getCouncilList(councilConfigs as Council[]);

    expect(result).toEqual([
      "public-council-1",
      "public-council-2",
      "unlisted-council-1",
      "unlisted-council-2",
      "private-council-1",
      "private-council-2",
    ]);
  });
});
