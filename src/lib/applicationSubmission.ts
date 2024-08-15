import { convertApplicationFormBops } from "./applicationForm";

import { Responses, ApplicationFormProps, SubtopicValue } from "@/types";

export const convertApplicationSubmissionBops = (
  submission: ApplicationFormProps,
) => {
  const arr: SubtopicValue[] = [];

  Object.entries(submission).map(([key, val], i) => {
    switch (key) {
      case "data":
        Object.entries(val as any).map(([key, value], i) => {
          const data = convertApplicationFormBops(key, value);
          return data.subtopic !== undefined && arr.push(data);
        });
        return arr;
      case "files":
        const data = convertApplicationFormBops("files", val);
        arr.push(data);
        return arr;
      case "responses":
        let cleanData: SubtopicValue[] = [];
        Object.entries(val as Responses).map(([key, value], i) => {
          const data = convertApplicationFormBops(
            value?.metadata?.sectionName,
            value,
          );
          if (cleanData[cleanData.length - 1]?.subtopic == data.subtopic) {
            cleanData[cleanData.length - 1]?.value?.push(data.value[0]);
          } else {
            cleanData.push(data);
          }
          return cleanData;
        });
        arr.push(...cleanData);
        return arr;
      default:
        return;
    }
  });
  return arr;
};
