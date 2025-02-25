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

import { DprBoundaryGeojson } from "./definitions/boundaryGeojson";

export interface DprApplicationSubmissionData {
  data: DprApplicationSubmissionSubtopic[];
  metadata: {
    submittedAt: string;
    /**
     * This is the raw JSON string of the submission - in case we need to display just that at some point in the future
     */
    raw: string;
  };
}

/**
 * We convert into subtopic and value pairs
 */
export interface DprApplicationSubmissionSubtopic {
  subtopic: string;
  value: DprApplicationSubmissionSubtopicValue[];
}

export interface DprApplicationSubmissionSubtopicValue {
  description: string;
  value: string | null | JSX.Element | DprApplicationSubmissionSubtopicValue[];
  map?: DprBoundaryGeojson;
}
