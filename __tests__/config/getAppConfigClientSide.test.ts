import { getAppConfigClientSide } from "@/config/getAppConfigClientSide";
import { createAppConfig } from "@mocks/appConfigFactory";
import { getAppConfig } from "@/config";

jest.mock("@/config", () => ({
  getAppConfig: jest.fn(),
}));

describe("getAppConfigClientSide", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.todo("Should respect env var rules");

  it("should call getAppConfig with the provided public council", async () => {
    const appConfig = createAppConfig();
    (getAppConfig as jest.Mock).mockResolvedValue(appConfig);

    const result = await getAppConfigClientSide("public-council-1");

    expect(getAppConfig).toHaveBeenCalledWith("public-council-1");
    expect(result).toEqual(appConfig);
    expect(result.council).toEqual(
      appConfig.councils.find((council) => council.slug === "public-council-1"),
    );
    expect(result.council?.visibility).toEqual("private");
  });

  it("should call getAppConfig with the provided public council and include overwritten values", async () => {
    process.env.PUBLIC_COUNCIL_1_BOPS_API_KEY = "test-api-key";
    process.env.PUBLIC_COUNCIL_1_BOPS_API_URL = "test-api-url";
    process.env.PUBLIC_COUNCIL_1_VISIBILITY = "private";
    const appConfig = createAppConfig();
    (getAppConfig as jest.Mock).mockResolvedValue(appConfig);

    const result = await getAppConfigClientSide("public-council-1");

    expect(getAppConfig).toHaveBeenCalledWith("public-council-1");
    expect(result).toEqual(appConfig);
    expect(result.council).toEqual(
      appConfig.councils.find((council) => council.slug === "public-council-1"),
    );
    expect(result.council?.visibility).toEqual("private");
  });

  it("should call getAppConfig without a council", async () => {
    const appConfig = createAppConfig();
    (getAppConfig as jest.Mock).mockResolvedValue(appConfig);

    const result = await getAppConfigClientSide();

    expect(getAppConfig).toHaveBeenCalledWith(undefined);
    expect(result).toEqual(appConfig);
    expect(result.council).toEqual(undefined);
  });
});
