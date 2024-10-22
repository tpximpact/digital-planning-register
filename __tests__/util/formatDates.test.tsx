import { formatDprDate, formatIsoDateTime } from "@/util";

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

describe("formatIsoDateTime", () => {
  it('should format a valid ISO date string into "dd MMM yyyy hh:mm aa" format', () => {
    const result = formatIsoDateTime("2024-07-02T11:37:35.069Z");
    expect(result).toBe("02 Jul 2024 11:37 AM");
  });

  it("should handle an invalid ISO date string", () => {
    const result = formatIsoDateTime("invalid-date");
    expect(result).toBe("Invalid Date");
  });

  it("should handle an empty date string", () => {
    const result = formatIsoDateTime("");
    expect(result).toBe("Invalid Date");
  });

  it("should format a date string with a time zone offset correctly", () => {
    const result = formatIsoDateTime("2024-07-05T12:05:14.224+01:00");
    expect(result).toBe("05 Jul 2024 11:05 AM"); // Adjusted for UTC
  });
});
