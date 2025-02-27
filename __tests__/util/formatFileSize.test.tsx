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

import { formatFileSize } from "@/util";

describe("formatFileSize", () => {
  it("should return '0 KB' for size 0", () => {
    const result = formatFileSize(0);
    expect(result).toBe("0 KB");
  });

  it("should format bytes correctly", () => {
    const result = formatFileSize(512);
    expect(result).toBe("512.00 B");
  });

  it("should format kilobytes correctly", () => {
    const result = formatFileSize(1024);
    expect(result).toBe("1.00 KB");
  });

  it("should format megabytes correctly", () => {
    const result = formatFileSize(1048576);
    expect(result).toBe("1.00 MB");
  });

  it("should format gigabytes correctly", () => {
    const result = formatFileSize(1073741824);
    expect(result).toBe("1.00 GB");
  });

  it("should format terabytes correctly", () => {
    const result = formatFileSize(1099511627776);
    expect(result).toBe("1.00 TB");
  });

  it("should handle large sizes correctly", () => {
    const result = formatFileSize(1125899906842624);
    expect(result).toBe("1024.00 TB");
  });
});
