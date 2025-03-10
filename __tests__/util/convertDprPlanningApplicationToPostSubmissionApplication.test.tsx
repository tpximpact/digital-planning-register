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

import { DprApplication } from "@/types";
import { convertToDprApplication } from "@/util/convertToDprApplication";
import { generateDprApplication as generateNewDprApplication } from "@mocks/dprNewApplicationFactory";
import { generateDprApplication as generateOldDprApplication } from "@mocks/dprApplicationFactory";

describe("convertToDprApplication", () => {
  it("should return the same DprApplication if already in the correct structure", () => {
    const newApp: DprApplication = generateNewDprApplication();
    const result = convertToDprApplication(newApp);
    expect(result).toBe(newApp);
  });

  it("should convert an old DprPlanningApplication to a DprApplication with the correct structure", () => {
    const oldApp = generateOldDprApplication();
    const result = convertToDprApplication(oldApp);
    expect(result?.data?.submission).toBeDefined();
    expect(result?.data?.application).toBeDefined();
    expect(result?.data?.application.reference).toBe(
      oldApp?.application?.reference,
    );
    expect(result?.data?.application.status).toBe(oldApp?.application?.status);
    if (oldApp?.application?.validDate) {
      expect(result?.data?.validation).toBeDefined();
      expect(result?.data?.validation?.receivedAt).toBe(
        oldApp?.application?.receivedDate,
      );
      expect(result?.data?.validation?.validatedAt).toBe(
        oldApp?.application?.validDate,
      );
    } else {
      expect(result?.data?.validation).toBeUndefined();
    }
    if (oldApp?.application?.consultation) {
      expect(result?.data?.consultation).toBeDefined();
      expect(result?.data?.consultation?.startDate).toBe(
        oldApp?.application?.consultation?.startDate,
      );
      expect(result?.data?.consultation?.endDate).toBe(
        oldApp?.application?.consultation.endDate,
      );
    } else {
      expect(result?.data?.consultation).toBeUndefined();
    }
    if (oldApp?.application?.appeal) {
      expect(result?.data?.appeal).toBeDefined();
      expect(result?.data?.appeal?.lodgedDate).toBe(
        oldApp?.application?.appeal.lodgedDate,
      );
      expect(result?.data?.appeal?.reason).toBe(
        oldApp?.application?.appeal?.reason,
      );
    } else {
      expect(result?.data?.appeal).toBeUndefined();
    }
    expect(result.metadata.publishedAt).toBe(
      oldApp?.application?.publishedDate,
    );
    expect(result.metadata.submittedAt).toBe(oldApp?.application?.receivedDate);
    console.log("2 structure (post):", result);
  });
});
