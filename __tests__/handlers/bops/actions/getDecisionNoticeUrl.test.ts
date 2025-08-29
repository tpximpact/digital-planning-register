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

import { getDecisionNoticeUrl } from "@/handlers/bops/actions/getDecisionNoticeUrl";
import { handleBopsGetRequest } from "@/handlers/bops/requests";

jest.mock("@/handlers/bops/requests", () => ({
  handleBopsGetRequest: jest.fn(),
}));

const logErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("getDecisionNoticeUrl", () => {
  const council = "camden";
  const reference = "APP/1234/2024";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns the decision notice url if present", async () => {
    (handleBopsGetRequest as jest.Mock).mockResolvedValue({
      data: {
        decisionNotice: { url: "https://example.com/decision.pdf" },
      },
    });

    const url = await getDecisionNoticeUrl(council, reference);
    expect(url).toBe("https://example.com/decision.pdf");
    expect(handleBopsGetRequest).toHaveBeenCalledWith(
      council,
      expect.stringContaining(reference),
    );
  });

  it("returns undefined if decisionNotice is missing", async () => {
    (handleBopsGetRequest as jest.Mock).mockResolvedValue({
      data: {},
    });

    const url = await getDecisionNoticeUrl(council, reference);
    expect(url).toBeUndefined();
  });

  it("returns undefined if data is null", async () => {
    (handleBopsGetRequest as jest.Mock).mockResolvedValue({
      data: null,
    });

    const url = await getDecisionNoticeUrl(council, reference);
    expect(url).toBeUndefined();
  });

  it("returns undefined if handleBopsGetRequest throws", async () => {
    (handleBopsGetRequest as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );

    const url = await getDecisionNoticeUrl(council, reference);
    expect(url).toBeUndefined();
    expect(logErrorSpy).toHaveBeenCalled();
  });
});
