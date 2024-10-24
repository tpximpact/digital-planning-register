import { postcodeValidation, phoneValidation, emailValidation } from "@/util";

describe("postcodeValidation", () => {
  it("should return true for a valid postcode", () => {
    const result = postcodeValidation("SW1A 1AA");
    expect(result).toBe(true);
  });

  it("should return false for an invalid postcode", () => {
    const result = postcodeValidation("INVALID");
    expect(result).toBe(false);
  });

  it("should return false for an empty postcode", () => {
    const result = postcodeValidation("");
    expect(result).toBe(false);
  });
});

describe("phoneValidation", () => {
  it("should return true for a valid phone number", () => {
    const result = phoneValidation("+44 1234 567890");
    expect(result).toBe(true);
  });

  it("should return false for an invalid phone number", () => {
    const result = phoneValidation("INVALID");
    expect(result).toBe(false);
  });

  it("should return true for an undefined phone number", () => {
    const result = phoneValidation(undefined as unknown as string);
    expect(result).toBe(true);
  });

  it("should return true for an empty phone number", () => {
    const result = phoneValidation("");
    expect(result).toBe(true);
  });
});

describe("emailValidation", () => {
  it("should return true for a valid email address", () => {
    const result = emailValidation("test@example.com");
    expect(result).toBe(true);
  });

  it("should return false for an invalid email address", () => {
    const result = emailValidation("INVALID");
    expect(result).toBe(false);
  });

  it("should return true for an undefined email address", () => {
    const result = emailValidation(undefined as unknown as string);
    expect(result).toBe(true);
  });

  it("should return true for an empty email address", () => {
    const result = emailValidation("");
    expect(result).toBe(true);
  });
});
