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
"use client";
import {
  DprCommentOrderBy,
  DprCommentSortBy,
  SearchParamsComments,
} from "@/types";
import { Button } from "../button";
import {
  COMMENT_ORDERBY_DEFAULT,
  COMMENT_ORDERBY_OPTIONS,
  COMMENT_SORTBY_DEFAULT,
  COMMENT_SORTBY_OPTIONS,
} from "@/lib/comments";
import { useState } from "react";
import "./FormCommentsSort.scss";

export interface FormCommentsSortProps {
  searchParams: SearchParamsComments;
  action?: string;
}

export const FormCommentsSort = ({
  searchParams,
  action,
}: FormCommentsSortProps) => {
  const [sortBy, setSortBy] = useState(
    searchParams?.sortBy ?? COMMENT_SORTBY_DEFAULT,
  );
  const [orderBy, setOrderBy] = useState(
    searchParams?.orderBy ?? COMMENT_ORDERBY_DEFAULT,
  );
  const [sortByOrderBy, setSortByOrderBy] = useState(`${sortBy}_${orderBy}`);

  const commentSortByOrderByOptions = [
    {
      label: "Most recent to oldest",
      sortBy: "receivedAt",
      orderBy: "desc",
    },
    {
      label: "Oldest to most recent",
      sortBy: "receivedAt",
      orderBy: "asc",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newOrderBy] = e.target.value.split("_");

    if (
      COMMENT_SORTBY_OPTIONS.includes(newSortBy as DprCommentSortBy) &&
      COMMENT_ORDERBY_OPTIONS.includes(newOrderBy as DprCommentOrderBy)
    ) {
      setSortBy(newSortBy as DprCommentSortBy);
      setOrderBy(newOrderBy as DprCommentOrderBy);
    } else {
      setSortBy(COMMENT_SORTBY_DEFAULT);
      setOrderBy(COMMENT_ORDERBY_DEFAULT);
    }

    setSortByOrderBy(`${newSortBy}_${newOrderBy}`);
  };

  const renderFormContent = () => (
    <>
      <div className="dpr-form-comments-sort">
        <div className="dpr-form-comments-sort__row">
          <div className="dpr-form-comments-sort__column-one-third">
            <div className="govuk-form-group">
              <label htmlFor="commentSortByorderBy" className="govuk-label">
                Sort by
              </label>
              <select
                id="commentSortByorderBy"
                value={sortByOrderBy}
                onChange={handleChange}
                className="govuk-select govuk-!-width-full"
              >
                {commentSortByOrderByOptions.map((option) => (
                  <option
                    key={option.label}
                    value={`${option.sortBy}_${option.orderBy}`}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="dpr-form-comments-sort__column-two-thirds govuk-!-padding-top-6">
            <input type="hidden" name="sortBy" defaultValue={sortBy} />
            <input type="hidden" name="orderBy" defaultValue={orderBy} />
            <Button variant="secondary" type="submit">
              Apply sorting
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  return action ? (
    <form
      className="govuk-form"
      method="get"
      action={action}
      aria-label="Sort comments"
    >
      {renderFormContent()}
    </form>
  ) : (
    renderFormContent()
  );
};
