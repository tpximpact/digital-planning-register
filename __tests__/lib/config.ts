import { updateCouncilConfig } from "@/lib/config";
import { Council } from "@/types";

// Mock the process.env object
const originalEnv = process.env;

describe("updateCouncilConfig", () => {
  beforeEach(() => {
    // Reset the environment variables before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore the original environment variables after each test
    process.env = originalEnv;
  });

  it("should return council config with default visibility when environment variables are set", () => {
    process.env["TEST_BOPS_API_URL"] = "http://dummy-url.com";
    process.env["TEST_BOPS_API_KEY"] = "dummytest";
    const council = "test";
    const councilConfig: Council = {
      visibility: "public",
      name: "Test",
      publicComments: false,
      specialistComments: false,
    };

    const updatedConfig = updateCouncilConfig(council, councilConfig);

    expect(updatedConfig.visibility).toBe("public");
  });
  it("should return council config with private visibility when no environment variables are set", () => {
    const council = "test";
    const councilConfig: Council = {
      visibility: "public",
      name: "Test",
      publicComments: false,
      specialistComments: false,
    };

    const updatedConfig = updateCouncilConfig(council, councilConfig);

    expect(updatedConfig.visibility).toBe("private");
  });

  it("should override visibility with environment variable if set", () => {
    process.env["TEST_BOPS_API_URL"] = "http://dummy-url.com";
    process.env["TEST_BOPS_API_KEY"] = "dummytest";
    process.env["TEST_VISIBILITY"] = "unlisted";

    const council = "test";
    const councilConfig: Council = {
      visibility: "public",
      name: "Test",
      publicComments: false,
      specialistComments: false,
    };

    const updatedConfig = updateCouncilConfig(council, councilConfig);

    expect(updatedConfig.visibility).toBe("unlisted");
  });

  it("should keep visibility 'private' even if API keys are missing", () => {
    process.env["TEST_VISIBILITY"] = "public"; // visibility override is set, but no API keys are provided

    const council = "test";
    const councilConfig: Council = {
      visibility: "public",
      name: "Test",
      publicComments: false,
      specialistComments: false,
    };

    const updatedConfig = updateCouncilConfig(council, councilConfig);

    expect(updatedConfig.visibility).toBe("private");
  });
});
