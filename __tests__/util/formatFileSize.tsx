import formatFileSize from "../../util/formatFileSize";

describe("formatFileSize", () => {
  it("should handle zero bytes correctly", () => {
    expect(formatFileSize(0)).toBe("0 KB");
  });

  it("should convert bytes to KB", () => {
    expect(formatFileSize(1023)).toBe("1023.00 B");
    expect(formatFileSize(1024)).toBe("1.00 KB");
  });

  it("should convert bytes to MB", () => {
    expect(formatFileSize(1048576)).toBe("1.00 MB"); // 1024 * 1024
  });

  it("should convert bytes to GB", () => {
    expect(formatFileSize(1073741824)).toBe("1.00 GB"); // 1024 * 1024 * 1024
  });

  it("should round to two decimal places", () => {
    expect(formatFileSize(1500)).toBe("1.46 KB");
  });
});
