import { DprDocument } from "@/types";

/**
 * This generates a fake decision notice document
 * @param url
 * @returns
 */
export const DecisionNoticeObject = (url: string): DprDocument => {
  return {
    url: url,
    title: "Decision notice",
    metadata: {
      contentType: "PDF",
    },
  };
};

export default DecisionNoticeObject;
