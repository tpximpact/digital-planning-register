/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

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
