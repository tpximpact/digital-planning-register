import { StringLiteral } from "typescript";
import "./ApplicationProgressInfoToggleButton.scss";

export interface ApplicationProgressInfoToggleButtonProps {
  showText: string;
  hideText: string;
  textContinued: string;
  title?: string;
  toggleAll?: () => void;
  openAll: boolean;
  isStatic?: boolean;
}

export const ApplicationProgressInfoToggleButton = ({
  showText = "Show",
  hideText = "Hide",
  textContinued = "all sections",
  title = "Click to expand all sections",
  toggleAll,
  openAll,
  isStatic,
}: ApplicationProgressInfoToggleButtonProps) => {
  const content = (
    <>
      <span
        className={`dpr-progress-info__chevron ${openAll ? "dpr-progress-info__chevron--down" : ""}`}
      ></span>
      <span className="dpr-progress-info__toggle-button-text">
        {openAll ? showText : hideText} {textContinued}
      </span>
    </>
  );

  if (isStatic) {
    return (
      <span
        className="dpr-progress-info__toggle-button dpr-progress-info__toggle-button--static"
        role="button"
        aria-expanded={!openAll}
      >
        {content}
      </span>
    );
  } else {
    return (
      <button
        className="dpr-progress-info__toggle-button"
        onClick={toggleAll ? toggleAll : undefined}
        type="button"
        title={title}
        aria-expanded={!openAll}
      >
        {content}
      </button>
    );
  }
};
