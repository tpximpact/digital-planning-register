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

export type AttachmentContentType =
  | "pdf"
  | "document"
  | "spreadsheet"
  | "html"
  | "external"
  | "generic";

export function mapMimeToAttachmentContentType(
  mime?: string,
): AttachmentContentType {
  const type = mime?.toLowerCase() || "";

  if (type.includes("pdf")) return "pdf";

  if (
    type.endsWith("doc") ||
    type.endsWith("docx") ||
    type.includes("msword") ||
    type.includes("wordprocessingml")
  ) {
    return "document";
  }

  if (
    type.endsWith("xls") ||
    type.endsWith("xlsx") ||
    type.includes("excel") ||
    type.includes("spreadsheet")
  ) {
    return "spreadsheet";
  }

  if (type.includes("html")) return "html";

  if (type === "external") return "external";

  return "generic";
}
