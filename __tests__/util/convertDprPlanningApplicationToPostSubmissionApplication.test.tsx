import { DprApplication } from "@/types";
import { convertDprPlanningApplication } from "@/util/convertToDprApplication";
import { generateDprApplication as generateNewDprApplication } from "@mocks/dprNewApplicationFactory";
import { generateDprApplication as generateOldDprApplication } from "@mocks/dprApplicationFactory";
import { pl } from "@faker-js/faker";

describe("convertDprPlanningApplication", () => {
  it("should return the same DprApplication if already in the correct structure", () => {
    const generatedApp: DprApplication = generateNewDprApplication();
    console.log("test 1 pre-function", generatedApp);
    const result = convertDprPlanningApplication(generatedApp);
    console.log("test 1 result:", result);
    expect(result).toBe(generatedApp);
  });

  it("should convert a DprPlanningApplication (old structure) to a DprApplication", () => {
    const planningApp = generateOldDprApplication();
    console.log("test 2, prefunction", planningApp);
    const result = convertDprPlanningApplication(planningApp);
    console.log("test 2 result:", result);

    expect(result.data.submission).toBeDefined();
    expect(result.data.validation).toBeDefined();
    expect(result.data.assessment).toBeDefined();
    if (planningApp.application.consultation) {
      expect(result.data.consultation).toBeDefined();
    }
    if (planningApp.application.appeal) {
      expect(result.data.appeal).toBeDefined();
    }
    expect(result.data.application.reference).toBe(
      planningApp.application.reference,
    );
    expect(result.data.application.status).toBe(planningApp.application.status);
    expect(result.metadata.publishedAt).toBe(
      planningApp.application.publishedDate,
    );
  });
});
