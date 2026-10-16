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

import type {
  SearchParamsComments,
  SearchParamsDocuments,
  SearchParamsSpecialistComments,
} from "@/types";
import type { ApiHandler } from "../types";
import { applicationSubmission } from "./v1/applicationSubmission";
import { documents } from "./v1/documents";
import { postComment } from "./v1/postComment";
import { publicComments } from "./v1/publicComments";
import { search } from "./v1/search";
import { show } from "./v1/show";
import { specialist } from "./v1/specialist";
import { specialistComments } from "./v1/specialistComments";

/**
 * Generated example data, used for councils whose dataSource is "local".
 */
export const localHandler: ApiHandler = {
  search: (_council, searchParams) => search(searchParams),
  show,
  applicationSubmission,
  // the mocks read their params with `?.`, so a missing one is fine at runtime
  documents: (council, reference, searchParams) =>
    documents(council, reference, searchParams as SearchParamsDocuments),
  publicComments: (council, reference, searchParams) =>
    publicComments(council, reference, searchParams as SearchParamsComments),
  specialistComments: (council, reference, searchParams) =>
    specialistComments(
      council,
      reference,
      searchParams as SearchParamsComments,
    ),
  specialist: (council, reference, specialistId, searchParams) =>
    specialist(
      council,
      reference,
      specialistId,
      searchParams as SearchParamsSpecialistComments,
    ),
  postComment,
};
