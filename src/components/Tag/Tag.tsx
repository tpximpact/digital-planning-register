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
