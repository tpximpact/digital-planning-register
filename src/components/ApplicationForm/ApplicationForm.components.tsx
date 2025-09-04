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

import { capitalizeFirstLetter, pascalToSentenceCase } from "@/util";
import React from "react";
import {
  isFlatArrayOfPrimitives,
  isObjectOfPrimitives,
} from "./ApplicationForm.utils";

/**
 * Renders a section with a title and content.
 * @param param0 - The props for the section.
 * @returns The rendered section.
 */
export const Section = ({
  title,
  content,
  level = 0,
}: {
  title?: string;
  content: React.ReactNode;
  level: number;
}): JSX.Element => (
  <div
    className={`govuk-grid-row${level < 1 ? " grid-row-extra-bottom-margin" : ""}`}
  >
    <div className="govuk-grid-column-full">
      {title &&
        (() => {
          const headingLevel = level + 4;
          if (headingLevel === 3) {
            return React.createElement(
              "h3",
              { className: "govuk-heading-m" },
              capitalizeFirstLetter(pascalToSentenceCase(title)),
            );
          } else if (headingLevel > 3 && headingLevel <= 6) {
            return React.createElement(
              `h${headingLevel}`,
              { className: "govuk-heading-s" },
              capitalizeFirstLetter(pascalToSentenceCase(title)),
            );
          } else {
            return React.createElement(
              "p",
              {
                className: "govuk-heading-s",
                role: "heading",
                "aria-level": headingLevel,
              },
              capitalizeFirstLetter(pascalToSentenceCase(title)),
            );
          }
        })()}

      {content}
    </div>
  </div>
);

/**
 * Renders a row in a summary list.
 * @param param0 - The props for the row.
 * @returns The rendered row.
 */
export const Row = ({
  title,
  content,
}: {
  title: string;
  content: unknown;
}): JSX.Element => (
  <dl className="govuk-summary-list__row">
    <dt className="govuk-summary-list__key">{title}</dt>
    <dd className="govuk-summary-list__value">
      <RenderString data={content} />
    </dd>
  </dl>
);

export const List = ({ data }: { data: unknown[] }) => {
  return (
    <ul className="govuk-list govuk-list--bullet">
      {data.map((item, idx) => (
        <li key={idx}>
          <RenderString data={item} />
        </li>
      ))}
    </ul>
  );
};

type RenderProps = {
  data: unknown;
  level?: number;
};

export const RenderString = ({ data }: RenderProps): JSX.Element => {
  const isLink = typeof data === "string" && data.startsWith("http");
  if (isLink) {
    return (
      <div className="govuk-body dpr-application-form__content">
        <a
          href={data}
          className="govuk-link dpr-application-form__content"
          rel="nofollow"
        >
          {data}
        </a>
      </div>
    );
  }

  if (typeof data === "boolean") {
    return (
      <div className="govuk-body dpr-application-form__content">
        <code>{String(data)}</code>
      </div>
    );
  }

  return (
    <div className="govuk-body dpr-application-form__content">
      {typeof data === "string" && data === "" ? "empty-string" : String(data)}
    </div>
  );
};

/**
 * Renders a recursive object structure.
 * @param param0 - The props for the renderer.
 * @returns The rendered object structure.
 */
export const RecursiveObjectRenderer: React.FC<RenderProps> = ({
  data,
  level = -1,
}) => {
  if (data === null || data === undefined) return null;

  const type =
    typeof data === "object"
      ? Array.isArray(data)
        ? "array"
        : "object"
      : typeof data;

  if (type === "array") {
    if (isFlatArrayOfPrimitives(data)) {
      if ((data as unknown[]).length > 1) {
        return <List data={data as unknown[]} />;
      }
    }
    return (data as unknown[]).map((item, idx) => (
      <RecursiveObjectRenderer key={idx} data={item} level={level} />
    ));
  }

  // all the good stuff is in objects!
  if (type === "object") {
    if (isObjectOfPrimitives(data)) {
      return (
        <Section
          level={Math.min(level, 6)}
          content={
            <div className="govuk-summary-list">
              {Object.entries(data as Record<string, unknown>).map(
                ([key, value]) => (
                  <Row
                    key={key}
                    title={capitalizeFirstLetter(pascalToSentenceCase(key))}
                    content={value}
                  />
                ),
              )}
            </div>
          }
        />
      );
    }
    return Object.entries(data as Record<string, unknown>).map(
      ([key, value]) => (
        <Section
          key={key}
          title={capitalizeFirstLetter(pascalToSentenceCase(key))}
          level={Math.min(level, 6)}
          content={
            <RecursiveObjectRenderer
              data={value}
              level={Math.min(level + 1, 6)}
            />
          }
        />
      ),
    );
  }

  return <RenderString data={data} />;
};
