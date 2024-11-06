"use server";
import { ApiResponse } from "@/types";
import { Application } from "@/types/odp-types/schemas/application";
import { PlanningApplication } from "@/types/odp-types/schemas/prototypeApplication/data/ApplicationData";
import path from "path";
import fs from "fs";

const responseQuery = (
  type: "application" | "prototypeApplication",
  filePath: string,
): ApiResponse<PlanningApplication | Application | null> => {
  const jsonFilePath = path.join(
    process.cwd(),
    "src",
    "handlers",
    "local",
    "odp",
    "examples",
    type,
    filePath,
  );
  const application = JSON.parse(
    fs.readFileSync(path.resolve(`${jsonFilePath}.json`), "utf8"),
  );
  return {
    data: application,
    status: {
      code: 200,
      message: "",
    },
  };
};

export const examples = (
  type: "application" | "prototypeApplication",
  filePath: string,
): Promise<ApiResponse<PlanningApplication | Application | null>> => {
  return Promise.resolve(responseQuery(type, filePath));
};
