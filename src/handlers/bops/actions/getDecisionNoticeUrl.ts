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
"use server";
import { ApiResponse } from "@/types";
import { BopsV2PublicPlanningApplicationDocuments } from "../types";
import { handleBopsGetRequest } from "../requests";

export const getDecisionNoticeUrl = async (
  council: string,
  reference: string,
): Promise<string | undefined> => {
  try {
    let url = `public/planning_applications/${reference}/documents`;
    const params = new URLSearchParams({
      page: "1",
      resultsPerPage: "1",
    });
    url = `${url}?${params.toString()}`;
    const documentsRequest = await handleBopsGetRequest<
      ApiResponse<BopsV2PublicPlanningApplicationDocuments | null>
    >(council, url);
    return documentsRequest?.data?.decisionNotice?.url;
  } catch (error) {
    console.error("Error fetching decision notice URL:", error);
    return undefined;
  }
};
