import { getCookie, setCookie, deleteCookie } from "@/actions/cookies";
import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("Cookie management", () => {
  let mockCookieStore: {
    get: jest.Mock;
    set: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(() => {
    mockCookieStore = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);
  });

  describe("getCookie", () => {
    it("returns the correct value when cookie exists", async () => {
      mockCookieStore.get.mockReturnValue({ value: "testValue" });
      const value = await getCookie("testCookie", "reference");
      expect(value).toBe("testValue");
      expect(mockCookieStore.get).toHaveBeenCalledWith("reference_testCookie");
    });

    it("returns undefined when cookie does not exist", async () => {
      mockCookieStore.get.mockReturnValue(undefined);
      const value = await getCookie("nonExistentCookie", "reference");
      expect(value).toBeUndefined();
    });
  });

  describe("setCookie", () => {
    it("sets the cookie with correct parameters", async () => {
      await setCookie("testCookie", "testValue", "reference");
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        "reference_testCookie",
        "testValue",
        expect.objectContaining({
          expires: expect.any(Date),
          httpOnly: true,
          sameSite: "strict",
        }),
      );
    });
  });

  describe("deleteCookie", () => {
    it("deletes the cookie with the correct name", async () => {
      await deleteCookie("testCookie", "reference");
      expect(mockCookieStore.delete).toHaveBeenCalledWith(
        "reference_testCookie",
      );
    });
  });
});
