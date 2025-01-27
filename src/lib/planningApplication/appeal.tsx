/**
 *  Returns positive, neutral or negative based on the decision provided.
 *
 * @param {string} status - The status formatted
 * @returns {string} - Class that define the status color
 */
export const appealDecisionSentiment: Record<string, string> = {
  Allowed: "positive",
  "Split decision": "neutral",
  Dismissed: "negative",
  Withdrawn: "negative",
};
