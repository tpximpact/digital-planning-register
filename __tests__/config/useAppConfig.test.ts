import { renderHook, act } from "@testing-library/react-hooks";
import useAppConfig from "@/config/useAppConfig";
import { getAppConfigClientSide } from "@/config/getAppConfigClientSide";
import { AppConfig } from "@/config/types";

jest.mock("@/config/getAppConfigClientSide", () => ({
  getAppConfigClientSide: jest.fn(),
}));

describe("useAppConfig", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.todo("Should respect env var rules");

  it("should fetch and return appConfig for a given council", async () => {
    const mockConfig: AppConfig = {
      councils: [
        {
          slug: "council1",
          name: "Council 1",
          dataSource: "",
          publicComments: false,
          specialistComments: false,
          visibility: "public",
        },
      ],
    };
    (getAppConfigClientSide as jest.Mock).mockResolvedValue(mockConfig);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAppConfig("council1"),
    );

    await waitForNextUpdate();

    expect(getAppConfigClientSide).toHaveBeenCalledWith("council1");
    expect(result.current).toEqual(mockConfig);
  });

  it("should return undefined initially", () => {
    const { result } = renderHook(() => useAppConfig("council1"));

    expect(result.current).toBeUndefined();
  });

  it("should fetch and return appConfig without a council", async () => {
    const mockConfig: AppConfig = {
      councils: [
        {
          slug: "council1",
          name: "Council 1",
          dataSource: "",
          publicComments: false,
          specialistComments: false,
          visibility: "public",
        },
      ],
    };
    (getAppConfigClientSide as jest.Mock).mockResolvedValue(mockConfig);

    const { result, waitForNextUpdate } = renderHook(() => useAppConfig());

    await waitForNextUpdate();

    expect(getAppConfigClientSide).toHaveBeenCalledWith(undefined);
    expect(result.current).toEqual(mockConfig);
  });
});
