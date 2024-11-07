import "./ApplicationDecisionLabel.scss";

export interface ApplicationDecisionLabelProps {
  label: string;
  /**
   * not defining these on purpose as they may need to be revisited in the future
   *  "positive" | "negative" | "neutral"
   */
  decision?: string;
  id?: string;
  isInline?: boolean;
}

export const ApplicationDecisionLabel = ({
  label,
  decision,
  id,
  isInline,
}: ApplicationDecisionLabelProps) => {
  const decisionClass =
    decision && ["positive", "negative", "neutral"].includes(decision)
      ? ` dpr-application-decision-label--${decision}`
      : " dpr-application-decision-label--none";
  return (
    <p
      className={`dpr-application-decision-label${decisionClass} ${isInline && "dpr-application-decision-label--inline"}`}
      id={id}
    >
      {label}
    </p>
  );
};
