import {
  formatDateToDprDate,
  formatDateTimeToDprDate,
  isDate,
  isDateTime,
  formatDateTimeToDmyDate,
  formatDateTimeToDprDateTime,
  convertDateTimeToUtc,
  convertDateNoTimeToDprDate,
  formatDateToYmd,
} from "@/util";

describe("isDate", () => {
  it("should return true for a valid date string in YYYY-MM-DD format", () => {
    const dateString = "2024-07-02";
    const result = isDate(dateString);
    expect(result).toBe(true);
  });

  it("should return false for an invalid date string", () => {
    const dateString = "invalid-date";
    const result = isDate(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a date string in an incorrect format", () => {
    const dateString = "02-07-2024";
    const result = isDate(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a date string with an invalid month", () => {
    const dateString = "2024-13-02";
    const result = isDate(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a date string with an invalid day", () => {
    const dateString = "2024-07-32";
    const result = isDate(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a date string with an invalid year", () => {
    const dateString = "abcd-07-02";
    const result = isDate(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a null value", () => {
    const result = isDate(null as unknown as string);
    expect(result).toBe(false);
  });

  it("should return false for an undefined value", () => {
    const result = isDate(undefined as unknown as string);
    expect(result).toBe(false);
  });

  it("should return false for an ISO 8601 extended format", () => {
    const dateString = "2023-05-18T00:00:00.000+01:00";
    const result = isDate(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a UTC ISO 8601 extended format", () => {
    const dateString = "2023-05-18T00:00:00.000Z";
    const result = isDate(dateString);
    expect(result).toBe(false);
  });
});

describe("isDateTime", () => {
  it("should return true for a valid date-time string in YYYY-MM-DDTHH:MM:SS.SSSZ format", () => {
    const dateString = "2024-07-02T11:37:35.069Z";
    const result = isDateTime(dateString);
    expect(result).toBe(true);
  });

  it("should return false for an invalid date-time string", () => {
    const dateString = "invalid-date-time";
    const result = isDateTime(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a date-time string in an incorrect format", () => {
    const dateString = "2024-07-02 11:37:35";
    const result = isDateTime(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a date-time string with an invalid month", () => {
    const dateString = "2024-13-02T11:37:35.069Z";
    const result = isDateTime(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a date-time string with an invalid day", () => {
    const dateString = "2024-07-32T11:37:35.069Z";
    const result = isDateTime(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a date-time string with an invalid hour", () => {
    const dateString = "2024-07-02T25:37:35.069Z";
    const result = isDateTime(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a date-time string with an invalid minute", () => {
    const dateString = "2024-07-02T11:61:35.069Z";
    const result = isDateTime(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a date-time string with an invalid second", () => {
    const dateString = "2024-07-02T11:37:61.069Z";
    const result = isDateTime(dateString);
    expect(result).toBe(false);
  });

  it("should return false for a null value", () => {
    const result = isDateTime(null as unknown as string);
    expect(result).toBe(false);
  });

  it("should return false for an undefined value", () => {
    const result = isDateTime(undefined as unknown as string);
    expect(result).toBe(false);
  });

  it("should return false for a YYYY-MM-DD format", () => {
    const dateString = "2023-05-18";
    const result = isDateTime(dateString);
    expect(result).toBe(false);
  });

  it("should return false for an ISO 8601 extended format", () => {
    const dateString = "2023-05-18T00:00:00.000+01:00";
    const result = isDateTime(dateString);
    expect(result).toBe(false);
  });
});

describe("convertDateNoTimeToDprDate", () => {
  it("should convert a date string without a time and a timezone offset to YYYY-MM-DD", () => {
    const dateString = "2024-07-05T00:00:00.000+01:00";
    const utcDateString = convertDateNoTimeToDprDate(dateString);
    expect(utcDateString).toBe("2024-07-05");
  });

  it("should convert a date string without a time and a timezone offset to YYYY-MM-DD", () => {
    const dateString = "2024-07-05T00:00:00.000+00:00";
    const utcDateString = convertDateNoTimeToDprDate(dateString);
    expect(utcDateString).toBe("2024-07-05");
  });

  it("should convert a date string with a timezone offset to a UTC date string", () => {
    const dateString = "2024-07-05T12:05:14.224+00:00";
    const utcDateString = convertDateNoTimeToDprDate(dateString);
    expect(utcDateString).toBe("2024-07-05");
  });

  it("should convert a date string with a timezone offset to a UTC date string", () => {
    const dateString = "2024-07-05T12:05:14.224+01:00";
    const utcDateString = convertDateNoTimeToDprDate(dateString);
    expect(utcDateString).toBe("2024-07-05");
  });

  it("should handle different timezone offsets correctly", () => {
    const dateString = "2024-07-05T12:05:14.224-04:00";
    const utcDateString = convertDateNoTimeToDprDate(dateString);
    expect(utcDateString).toBe("2024-07-05");
  });

  it("should handle dates already in UTC correctly", () => {
    const dateString = "2024-07-05T12:05:14.224Z";
    const utcDateString = convertDateNoTimeToDprDate(dateString);
    expect(utcDateString).toBe("2024-07-05");
  });

  it('should return "Invalid Date" for an invalid date string', () => {
    const dateString = "invalid-date";
    const utcDateString = convertDateNoTimeToDprDate(dateString);
    expect(utcDateString).toBe("Invalid Date");
  });

  it("should convert a YYYY-MM-DD to YYYY-MM-DD", () => {
    const dateString = "2023-05-18";
    const formattedDate = convertDateNoTimeToDprDate(dateString);
    expect(formattedDate).toBe("2023-05-18");
  });
});

describe("convertDateTimeToUtc", () => {
  it("should convert a date string with a timezone offset to a UTC date string", () => {
    const dateString = "2024-07-05T12:05:14.224+01:00";
    const utcDateString = convertDateTimeToUtc(dateString);
    expect(utcDateString).toBe("2024-07-05T11:05:14Z");
  });

  it("should handle different timezone offsets correctly", () => {
    const dateString = "2024-07-05T12:05:14.224-04:00";
    const utcDateString = convertDateTimeToUtc(dateString);
    expect(utcDateString).toBe("2024-07-05T16:05:14Z");
  });

  it("should handle dates already in UTC correctly", () => {
    const dateString = "2024-07-05T12:05:14.224Z";
    const utcDateString = convertDateTimeToUtc(dateString);
    expect(utcDateString).toBe("2024-07-05T12:05:14Z");
  });

  it("should handle dates already in UTC correctly", () => {
    const dateString = "2024-04-25T14:51:36.349Z";
    const utcDateString = convertDateTimeToUtc(dateString);
    expect(utcDateString).toBe("2024-04-25T14:51:36Z");
  });

  it('should return "Invalid Date" for an invalid date string', () => {
    const dateString = "invalid-date";
    const utcDateString = convertDateTimeToUtc(dateString);
    expect(utcDateString).toBe("Invalid Date");
  });

  it("should convert a date string with no time to a UTC date string", () => {
    const dateString = "2024-07-02T00:00:00.000+00:00";
    const utcDateString = convertDateTimeToUtc(dateString);
    expect(utcDateString).toBe("2024-07-02T00:00:00Z");
  });

  it("should convert a date string with a timezone offset and no time to a UTC date string", () => {
    const dateString = "2024-07-02T00:00:00.000+01:00";
    const utcDateString = convertDateTimeToUtc(dateString);
    expect(utcDateString).toBe("2024-07-01T23:00:00Z");
  });

  it("should convert a YYYY-MM-DD to a UTC date string", () => {
    const dateString = "2023-05-18";
    const formattedDate = convertDateTimeToUtc(dateString);
    expect(formattedDate).toBe("2023-05-17T23:00:00Z");
  });
});

describe("formatDateToDprDate", () => {
  it('should format a valid "YYYY-MM-DD" date string to "DD MMM YYYY"', () => {
    const dateString = "2024-07-02";
    const formattedDate = formatDateToDprDate(dateString);
    expect(formattedDate).toBe("2 Jul 2024");
  });

  it("should handle single-digit months and days correctly", () => {
    const dateString = "2024-01-05";
    const formattedDate = formatDateToDprDate(dateString);
    expect(formattedDate).toBe("5 Jan 2024");
  });

  it("should handle leap years correctly", () => {
    const dateString = "2024-02-29";
    const formattedDate = formatDateToDprDate(dateString);
    expect(formattedDate).toBe("29 Feb 2024");
  });

  it("should handle end of the year correctly", () => {
    const dateString = "2024-12-31";
    const formattedDate = formatDateToDprDate(dateString);
    expect(formattedDate).toBe("31 Dec 2024");
  });

  it("should handle beginning of the year correctly", () => {
    const dateString = "2024-01-01";
    const formattedDate = formatDateToDprDate(dateString);
    expect(formattedDate).toBe("1 Jan 2024");
  });

  it('should return "Invalid Date" for an invalid date string', () => {
    const dateString = "invalid-date";
    const formattedDate = formatDateToDprDate(dateString);
    expect(formattedDate).toBe("Invalid Date");
  });

  it('should return "Invalid Date" for an ISO 8601 extended format', () => {
    const dateString = "2023-05-18T00:00:00.000+01:00";
    const formattedDate = formatDateToDprDate(dateString);
    expect(formattedDate).toBe("Invalid Date");
  });

  it('should return "Invalid Date" for a UTC ISO 8601 extended format', () => {
    const dateString = "2023-05-18T00:00:00.000Z";
    const formattedDate = formatDateToDprDate(dateString);
    expect(formattedDate).toBe("Invalid Date");
  });
});

describe("formatDateTimeToDprDate", () => {
  it('should format a valid "YYYY-MM-DDTHH:MM:SS.SSSZ" date-time string to "DD MMM YYYY"', () => {
    const dateTimeString = "2024-07-02T11:37:35.069Z";
    const formattedDate = formatDateTimeToDprDate(dateTimeString);
    expect(formattedDate).toBe("2 Jul 2024");
  });

  it("should handle single-digit months and days correctly", () => {
    const dateTimeString = "2024-01-05T11:37:35.069Z";
    const formattedDate = formatDateTimeToDprDate(dateTimeString);
    expect(formattedDate).toBe("5 Jan 2024");
  });

  it("should handle leap years correctly", () => {
    const dateTimeString = "2024-02-29T11:37:35.069Z";
    const formattedDate = formatDateTimeToDprDate(dateTimeString);
    expect(formattedDate).toBe("29 Feb 2024");
  });

  it("should handle end of the year correctly", () => {
    const dateTimeString = "2024-12-31T11:37:35.069Z";
    const formattedDate = formatDateTimeToDprDate(dateTimeString);
    expect(formattedDate).toBe("31 Dec 2024");
  });

  it("should handle beginning of the year correctly", () => {
    const dateTimeString = "2024-01-01T11:37:35.069Z";
    const formattedDate = formatDateTimeToDprDate(dateTimeString);
    expect(formattedDate).toBe("1 Jan 2024");
  });

  it('should return "Invalid Date" for an invalid date-time string', () => {
    const dateTimeString = "invalid-date-time";
    const formattedDate = formatDateTimeToDprDate(dateTimeString);
    expect(formattedDate).toBe("Invalid Date");
  });

  it('should return "Invalid Date" for an ISO 8601 extended format', () => {
    const dateString = "2023-05-18T00:00:00.000+01:00";
    const formattedDate = formatDateTimeToDprDate(dateString);
    expect(formattedDate).toBe("Invalid Date");
  });

  it('should return "Invalid Date" for a YYYY-MM-DD date', () => {
    const dateString = "2023-05-18";
    const formattedDate = formatDateTimeToDprDate(dateString);
    expect(formattedDate).toBe("Invalid Date");
  });
});

describe("formatDateTimeToDprDateTime", () => {
  it('should format a valid "YYYY-MM-DDTHH:MM:SS.SSSZ" date-time string to "DD MMM YYYY"', () => {
    const dateTimeString = "2024-07-02T11:37:35.069Z";
    const formattedDate = formatDateTimeToDprDateTime(dateTimeString);
    expect(formattedDate).toBe("02 Jul 2024 11:37 AM");
  });

  it("should handle single-digit months and days correctly", () => {
    const dateTimeString = "2024-01-05T11:37:35.069Z";
    const formattedDate = formatDateTimeToDprDateTime(dateTimeString);
    expect(formattedDate).toBe("05 Jan 2024 11:37 AM");
  });

  it("should handle leap years correctly", () => {
    const dateTimeString = "2024-02-29T11:37:35.069Z";
    const formattedDate = formatDateTimeToDprDateTime(dateTimeString);
    expect(formattedDate).toBe("29 Feb 2024 11:37 AM");
  });

  it("should handle end of the year correctly", () => {
    const dateTimeString = "2024-12-31T11:37:35.069Z";
    const formattedDate = formatDateTimeToDprDateTime(dateTimeString);
    expect(formattedDate).toBe("31 Dec 2024 11:37 AM");
  });

  it("should handle beginning of the year correctly", () => {
    const dateTimeString = "2024-01-01T11:37:35.069Z";
    const formattedDate = formatDateTimeToDprDateTime(dateTimeString);
    expect(formattedDate).toBe("01 Jan 2024 11:37 AM");
  });

  it('should return "Invalid Date" for an invalid date-time string', () => {
    const dateTimeString = "invalid-date-time";
    const formattedDate = formatDateTimeToDprDateTime(dateTimeString);
    expect(formattedDate).toBe("Invalid Date");
  });

  it('should return "Invalid Date" for an ISO 8601 extended format', () => {
    const dateString = "2023-05-18T00:00:00.000+01:00";
    const formattedDate = formatDateTimeToDprDateTime(dateString);
    expect(formattedDate).toBe("Invalid Date");
  });

  it('should return "Invalid Date" for a YYYY-MM-DD date', () => {
    const dateString = "2023-05-18";
    const formattedDate = formatDateTimeToDprDateTime(dateString);
    expect(formattedDate).toBe("Invalid Date");
  });
});

describe("formatDateTimeToDmyDate", () => {
  it('should format a valid "YYYY-MM-DDTHH:MM:SS.SSSZ" date-time string to "DD MMM YYYY"', () => {
    const dateTimeString = "2024-07-02T11:37:35.069Z";
    const formattedDate = formatDateTimeToDmyDate(dateTimeString);
    expect(formattedDate).toBe("02-07-2024");
  });

  it("should handle single-digit months and days correctly", () => {
    const dateTimeString = "2024-01-05T11:37:35.069Z";
    const formattedDate = formatDateTimeToDmyDate(dateTimeString);
    expect(formattedDate).toBe("05-01-2024");
  });

  it("should handle leap years correctly", () => {
    const dateTimeString = "2024-02-29T11:37:35.069Z";
    const formattedDate = formatDateTimeToDmyDate(dateTimeString);
    expect(formattedDate).toBe("29-02-2024");
  });

  it("should handle end of the year correctly", () => {
    const dateTimeString = "2024-12-31T11:37:35.069Z";
    const formattedDate = formatDateTimeToDmyDate(dateTimeString);
    expect(formattedDate).toBe("31-12-2024");
  });

  it("should handle beginning of the year correctly", () => {
    const dateTimeString = "2024-01-01T11:37:35.069Z";
    const formattedDate = formatDateTimeToDmyDate(dateTimeString);
    expect(formattedDate).toBe("01-01-2024");
  });

  it('should return "Invalid Date" for an invalid date-time string', () => {
    const dateTimeString = "invalid-date-time";
    const formattedDate = formatDateTimeToDmyDate(dateTimeString);
    expect(formattedDate).toBe("Invalid Date");
  });

  it('should return "Invalid Date" for an ISO 8601 extended format', () => {
    const dateString = "2023-05-18T00:00:00.000+01:00";
    const formattedDate = formatDateTimeToDmyDate(dateString);
    expect(formattedDate).toBe("Invalid Date");
  });

  it('should return "Invalid Date" for a YYYY-MM-DD date', () => {
    const dateString = "2023-05-18";
    const formattedDate = formatDateTimeToDmyDate(dateString);
    expect(formattedDate).toBe("Invalid Date");
  });
});

describe("formatDateToYmd", () => {
  it('should format a Date object to "YYYY-MM-DD" string', () => {
    const date = new Date("2024-06-12T00:00:00.000Z");
    const formattedDate = formatDateToYmd(date);
    expect(formattedDate).toBe("2024-06-12");
  });

  it("should handle single-digit months and days correctly", () => {
    const date = new Date("2024-01-05T00:00:00.000Z");
    const formattedDate = formatDateToYmd(date);
    expect(formattedDate).toBe("2024-01-05");
  });

  it("should handle leap years correctly", () => {
    const date = new Date("2024-02-29T00:00:00.000Z");
    const formattedDate = formatDateToYmd(date);
    expect(formattedDate).toBe("2024-02-29");
  });

  it("should handle end of the year correctly", () => {
    const date = new Date("2024-12-31T00:00:00.000Z");
    const formattedDate = formatDateToYmd(date);
    expect(formattedDate).toBe("2024-12-31");
  });

  it("should handle beginning of the year correctly", () => {
    const date = new Date("2024-01-01T00:00:00.000Z");
    const formattedDate = formatDateToYmd(date);
    expect(formattedDate).toBe("2024-01-01");
  });
});
