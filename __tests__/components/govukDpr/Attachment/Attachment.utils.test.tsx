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
import { mapMimeToAttachmentContentType } from "@/components/govukDpr/Attachment/Attachment.utils";

describe("mapMimeToAttachmentContentType", () => {
  it("returns the correct types for types BOPS supports", () => {
    expect(mapMimeToAttachmentContentType("application/pdf")).toBe("pdf");
    expect(mapMimeToAttachmentContentType("image/png")).toBe("document");
    expect(mapMimeToAttachmentContentType("image/jpeg")).toBe("document");
  });

  it("returns 'pdf' for PDF mime types", () => {
    expect(mapMimeToAttachmentContentType("application/pdf")).toBe("pdf");
  });

  it("returns 'document' for Word mime types", () => {
    expect(mapMimeToAttachmentContentType("application/msword")).toBe(
      "document",
    );
    expect(
      mapMimeToAttachmentContentType(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ),
    ).toBe("document");
    expect(mapMimeToAttachmentContentType("image/png")).toBe("document");
  });

  it("returns 'spreadsheet' for Excel mime types", () => {
    expect(mapMimeToAttachmentContentType("application/vnd.ms-excel")).toBe(
      "spreadsheet",
    );
    expect(
      mapMimeToAttachmentContentType(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ),
    ).toBe("spreadsheet");
  });

  it("returns 'html' for HTML mime types", () => {
    expect(mapMimeToAttachmentContentType("text/html")).toBe("html");
  });

  // there is currently nothing assigned to 'external', we've swapped
  // out the logic now to support mimeType and directly contentType
  it.skip("returns 'external' for 'external' mime type", () => {
    expect(mapMimeToAttachmentContentType("external")).toBe("external");
  });

  it("returns 'generic' for unknown or undefined mime types", () => {
    expect(mapMimeToAttachmentContentType("application/zip")).toBe("generic");
    expect(mapMimeToAttachmentContentType("")).toBe("generic");
    expect(mapMimeToAttachmentContentType(undefined as unknown as string)).toBe(
      "generic",
    );
    expect(mapMimeToAttachmentContentType(null as unknown as string)).toBe(
      "generic",
    );
  });
});
