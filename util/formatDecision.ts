import { capitaliseWord } from "./capitaliseWord";
export function definedDecision(decision: string, application_type: string) {
  const prior_approval_decision: { [key: string]: string } = {
    granted: "Prior approval required and approved",
    not_required: "Prior approval not required",
    refused: "Prior approval required and refused",
  };
  if (application_type == "prior_approval") {
    return prior_approval_decision[decision];
  } else {
    return capitaliseWord(decision);
  }
}
