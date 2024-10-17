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
