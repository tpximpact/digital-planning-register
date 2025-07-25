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
import { fetchConstraintData } from "@/components/ApplicationConstraints/ApplicationConstraints.data";
import { fetchEntityFromPlanningData } from "@/actions/planningData";
import { getEntityFromUrl } from "@/components/ApplicationConstraints/ApplicationConstraints.utils";
import { DprPlanningDataEntity } from "@/components/ApplicationConstraints/ApplicationConstraints.types";

jest.mock("@/actions/planningData", () => ({
  fetchEntityFromPlanningData: jest.fn(),
}));
jest.mock(
  "@/components/ApplicationConstraints/ApplicationConstraints.utils",
  () => ({
    getEntityFromUrl: jest.fn(),
  }),
);

describe("fetchConstraintData", () => {
  const mockEntity: DprPlanningDataEntity = {
    name: "Entity 1",
    source: {
      text: "Planning Data",
      url: "https://www.planning.data.gov.uk/entity/7010002192",
    },
  };

  const mockEntityNoUrl: DprPlanningDataEntity = {
    name: "Entity 2",
    source: {
      text: "Ordnance Survey MasterMap Highways",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data for constraint with a valid planning data url and adds data prop", async () => {
    (getEntityFromUrl as jest.Mock).mockReturnValue(7010002192);
    (fetchEntityFromPlanningData as jest.Mock).mockResolvedValue({
      data: {
        entity: 7010002192,
        name: "Whole District excluding the Town of Chesham - Poultry production.",
        dataset: "article-4-direction-area",
      },
    });

    const result = await fetchConstraintData(mockEntity);

    expect(getEntityFromUrl).toHaveBeenCalledWith(
      "https://www.planning.data.gov.uk/entity/7010002192",
    );
    expect(fetchEntityFromPlanningData).toHaveBeenCalledWith(7010002192);

    expect(result).toMatchObject({
      ...mockEntity,
      data: {
        entity: 7010002192,
        name: "Whole District excluding the Town of Chesham - Poultry production.",
        dataset: "article-4-direction-area",
      },
    });
  });

  it("fetches data for constraint with a valid planning data url and adds data prop", async () => {
    (getEntityFromUrl as jest.Mock).mockReturnValue(7010002192);
    (fetchEntityFromPlanningData as jest.Mock).mockResolvedValue({
      data: {
        entity: 7010002192,
        name: "Whole District excluding the Town of Chesham - Poultry production.",
        dataset: "article-4-direction-area",
      },
    });

    const result = await fetchConstraintData(mockEntityNoUrl);

    expect(getEntityFromUrl).not.toHaveBeenCalled();
    expect(fetchEntityFromPlanningData).not.toHaveBeenCalled();

    // Entity without a valid url should not have data
    expect(result).toEqual(mockEntityNoUrl);
  });

  it("returns the original entity if fetchEntityFromPlanningData throws", async () => {
    (getEntityFromUrl as jest.Mock).mockReturnValue(7010002192);
    (fetchEntityFromPlanningData as jest.Mock).mockRejectedValue(
      new Error("fail"),
    );

    const result = await fetchConstraintData(mockEntity);

    expect(result).toEqual(mockEntity);
  });

  it("returns the original entity if getEntityFromUrl returns null", async () => {
    (getEntityFromUrl as jest.Mock).mockReturnValue(null);

    const result = await fetchConstraintData(mockEntity);

    expect(result).toEqual(mockEntity);
  });

  it("returns the original entity if entity.source.url does not include planning.data.gov.uk/entity", async () => {
    const constraint: DprPlanningDataEntity = {
      name: "Entity 3",
      source: {
        text: "Planning Data",
        url: "https://example.com/entity/999",
      },
    };

    const result = await fetchConstraintData(constraint);

    expect(result).toEqual(constraint);
    expect(getEntityFromUrl).not.toHaveBeenCalled();
    expect(fetchEntityFromPlanningData).not.toHaveBeenCalled();
  });
});
