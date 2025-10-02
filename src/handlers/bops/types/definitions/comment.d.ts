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
import { SpecialistRedacted } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";

export interface BopsComment {
  id?: number;
  comment: string;
  receivedAt: string;
  sentiment?: string;
}

export type BopsSpecialist = Omit<SpecialistRedacted, "name">;

/**
 * Another one that goes along with the soon to be deprecated endpoint
 * @deprecated
 */
interface BopsNonStandardComment {
  comment: string;
  received_at: string;
  summary_tag?: string;
}
