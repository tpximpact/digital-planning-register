import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { setConsentCookie } from "./../../src/actions/set-cookies";
import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("setConsentCookie", () => {
  let cookieStore: { set: jest.Mock };

  beforeEach(() => {
    cookieStore = {
      set: jest.fn(),
    };
    (cookies as jest.Mock).mockReturnValue(cookieStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set the consent cookie to true", async () => {
    await setConsentCookie(true);

    expect(cookieStore.set).toHaveBeenCalledWith("consentCookie", "true", {
      path: "/",
      maxAge: 31536000, // 1 year
      sameSite: "strict",
    });
  });

  it("should set the consent cookie to false", async () => {
    await setConsentCookie(false);

    expect(cookieStore.set).toHaveBeenCalledWith("consentCookie", "false", {
      path: "/",
      maxAge: 31536000, // 1 year
      sameSite: "strict",
    });
  });
});
