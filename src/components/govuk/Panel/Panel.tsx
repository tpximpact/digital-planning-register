import "./Panel.scss";

export interface PanelProps {
  titleText: string;
  text?: JSX.Element;
}

export const Panel = ({ titleText, text }: PanelProps) => {
  return (
    <div className="govuk-panel govuk-panel--confirmation">
      <h1 className="govuk-panel__title">{titleText}</h1>
      {text && <div className="govuk-panel__body">{text}</div>}
    </div>
  );
};
