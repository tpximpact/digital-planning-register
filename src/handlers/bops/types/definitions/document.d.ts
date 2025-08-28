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

export interface BopsDocumentsMetadata {
  results: number;
  totalResults: number;
}

export interface BopsFile {
  name: string;
  url: string;
  type: FileType[];
  createdAt: string;
  applicantDescription: string | null;
  metadata: {
    byteSize: number;
    contentType: string;
  };
}

interface FileType {
  value: string;
  description: string;
}

/**
 * this goes along with the older endpoint's we're deprecating
 * @deprecated
 */
export interface BopsNonStandardDocument {
  url: string;
  /**
   * Optional because of the need to insert fake application form document
   */
  created_at?: string;
  tags: string[];
  numbers: string;
  applicant_description: string | null;

  /**
   * @warning This field is only used by the 'fake' document for application form
   */
  metadata?: {
    contentType: string;
  };
}
