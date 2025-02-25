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

import Link from "next/link";
import "./SummaryList.scss";

export interface SummaryListProps {
  rows: {
    key: {
      text: JSX.Element | string;
    };
    value: {
      text: JSX.Element | string;
    };
    actions?: {
      items: {
        href: string;
        text: string;
        visuallyHiddenText: string;
      }[];
    };
  }[];
  cardTitle?: {
    text: string;
    headingLevel?: string;
  };
  noBorder?: boolean;
}

export const ActionLink = ({
  action,
  cardTitle,
}: {
  action: NonNullable<
    SummaryListProps["rows"][number]["actions"]
  >["items"][number];
  cardTitle: SummaryListProps["cardTitle"];
}) => {
  return (
    <Link className="govuk-link" href={action.href}>
      {action.text}
      {(action.visuallyHiddenText || cardTitle) && (
        <span className="govuk-visually-hidden">
          {action.visuallyHiddenText && <>{action.visuallyHiddenText}</>}{" "}
          {cardTitle && <>{cardTitle.text}</>}
        </span>
      )}
    </Link>
  );
};

export const SummaryList = ({
  rows,
  cardTitle,
  noBorder,
}: SummaryListProps) => {
  if (!rows) {
    return null;
  }
  return (
    <>
      <dl
        className={`govuk-summary-list ${noBorder ? "govuk-summary-list--no-border" : ""}`}
      >
        {rows.map((row, index) => (
          <div
            key={index}
            className={`govuk-summary-list__row ${row.actions ? "govuk-summary-list__row--no-actions" : ""}`}
          >
            <dt className="govuk-summary-list__key">{row.key.text}</dt>
            <dd className="govuk-summary-list__value">{row.value.text}</dd>
            {row.actions && (
              <dd className="govuk-summary-list__actions">
                {row.actions.items.length === 1 ? (
                  <>
                    <ActionLink
                      action={row.actions.items[0]}
                      cardTitle={cardTitle}
                    />
                  </>
                ) : (
                  <ul className="govuk-summary-list__actions-list">
                    {row.actions.items.map((action, index) => (
                      <li
                        key={`items-${index}`}
                        className="govuk-summary-list__actions-list-item"
                      >
                        <ActionLink action={action} cardTitle={cardTitle} />
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </>
  );
};
