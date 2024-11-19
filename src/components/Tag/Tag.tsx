import "./Tag.scss";

export interface TagProps {
  label: string;
  /**
   * not defining these on purpose as they may need to be revisited in the future
   *  "positive" | "negative" | "neutral"
   */
  sentiment?: string;
  id?: string;
  isInline?: boolean;
}

export const Tag = ({ label, sentiment, id, isInline }: TagProps) => {
  const sentimentClass =
    sentiment && ["positive", "negative", "neutral"].includes(sentiment)
      ? ` dpr-tag--${sentiment}`
      : " dpr-tag--none";
  return (
    <p
      className={`dpr-tag${sentimentClass} ${isInline && "dpr-tag--inline"}`}
      id={id}
    >
      {label}
    </p>
  );
};
