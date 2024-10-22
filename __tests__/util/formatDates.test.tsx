import { formatDprDate, formatDprDateTime } from "@/util";

describe("formatDprDate", () => {
  it("should format a date string into 'dd MMM yyyy' format", () => {
    const result = formatDprDate("2024-07-05T12:05:14.224+01:00");
    expect(result).toBe("05 Jul 2024");
  });

  it("should handle an invalid date string", () => {
    const result = formatDprDate("invalid-date");
    expect(result).toBe("Invalid Date");
  });

  it("should handle an empty date string", () => {
    const result = formatDprDate("");
    expect(result).toBe("Invalid Date");
  });
});

describe("formatDprDateTime", () => {
  it("should format a date string into 'dd MMM yyyy hh:mm aa' format", () => {
    const result = formatDprDateTime("2024-07-05T12:05:14.224+01:00");
    expect(result).toBe("05 Jul 2024 12:05 PM");
  });

  it("should handle an invalid date string", () => {
    const result = formatDprDateTime("invalid-date");
    expect(result).toBe("Invalid Date");
  });

  it("should handle an empty date string", () => {
    const result = formatDprDateTime("");
    expect(result).toBe("Invalid Date");
  });
});
