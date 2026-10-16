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

import {
  applicationSubmission,
  documents,
  postComment,
  publicComments,
  search,
  show,
  specialist,
  specialistComments,
} from "./v1.actions";

/**
 * Access to the planning data, whatever the council's source is. Safe to import
 * from server and client components, each method is a server action.
 *
 *   const { data, pagination, status } = await ApiV1.search(council, searchParams);
 */
export const ApiV1 = {
  search,
  show,
  applicationSubmission,
  documents,
  publicComments,
  specialistComments,
  specialist,
  postComment,
};
