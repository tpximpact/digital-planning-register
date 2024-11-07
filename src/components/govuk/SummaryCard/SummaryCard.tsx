import { ActionLink, SummaryListProps } from "../SummaryList";
import "./SummaryCard.scss";

export interface SummaryCardProps {
  title: NonNullable<SummaryListProps["cardTitle"]>;
  actions?: SummaryListProps["rows"][number]["actions"];
  children: React.ReactNode;
}

export const SummaryCard = ({ title, actions, children }: SummaryCardProps) => {
  const headingLevel = title.headingLevel ?? "2";
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  return (
    <>
      <div className="govuk-summary-card">
        <div className="govuk-summary-card__title-wrapper">
          {title && (
            <HeadingTag className="govuk-summary-card__title">
              {title.text}
            </HeadingTag>
          )}
          {actions && (
            <>
              {actions.items.length === 1 ? (
                <div className="govuk-summary-card__actions">
                  <ActionLink action={actions.items[0]} cardTitle={title} />
                </div>
              ) : (
                <ul className="govuk-summary-card__actions">
                  {actions.items.map((action, index) => (
                    <li
                      key={`items-${index}`}
                      className="govuk-summary-card__action"
                    >
                      <ActionLink action={action} cardTitle={title} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
        <div className="govuk-summary-card__content">{children}</div>
      </div>
    </>
  );
};
