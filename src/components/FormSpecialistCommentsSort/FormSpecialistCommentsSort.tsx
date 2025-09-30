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
  DprSpecialistCommentsOrderBy,
  DprSpecialistCommentsSortBy,
  SearchParamsSpecialistComments,
} from "@/types";
import { Button } from "../button";
import {
  SPECIALIST_COMMENTS_ORDERBY_DEFAULT,
  SPECIALIST_COMMENTS_ORDERBY_OPTIONS,
  SPECIALIST_COMMENTS_SORTBY_DEFAULT,
  SPECIALIST_COMMENTS_SORTBY_OPTIONS,
} from "@/lib/specialistComments";
import { useState } from "react";
import "./FormSpecialistCommentsSort.scss";
import { specialistSearchFields } from "@/config/featureFlag";

export interface FormSpecialistCommentsSortProps {
  searchParams: SearchParamsSpecialistComments;
  action?: string;
}

export const FormSpecialistCommentsSort = ({
  searchParams,
  action,
}: FormSpecialistCommentsSortProps) => {
  const [sortBy, setSortBy] = useState(
    searchParams?.sortBy ?? SPECIALIST_COMMENTS_SORTBY_DEFAULT,
  );
  const [orderBy, setOrderBy] = useState(
    searchParams?.orderBy ?? SPECIALIST_COMMENTS_ORDERBY_DEFAULT,
  );
  const [sortByOrderBy, setSortByOrderBy] = useState(`${sortBy}_${orderBy}`);

  if (!specialistSearchFields.includes("sortBy")) {
    return null;
  }

  const specialistCommentSortByOrderByOptions = [
    {
      label: "Most recent to oldest",
      sortBy: "publishedAt",
      orderBy: "desc",
    },
    {
      label: "Oldest to most recent",
      sortBy: "publishedAt",
      orderBy: "asc",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newOrderBy] = e.target.value.split("_");

    if (
      SPECIALIST_COMMENTS_SORTBY_OPTIONS.includes(
        newSortBy as DprSpecialistCommentsSortBy,
      ) &&
      SPECIALIST_COMMENTS_ORDERBY_OPTIONS.includes(
        newOrderBy as DprSpecialistCommentsOrderBy,
      )
    ) {
      setSortBy(newSortBy as DprSpecialistCommentsSortBy);
      setOrderBy(newOrderBy as DprSpecialistCommentsOrderBy);
    } else {
      setSortBy(SPECIALIST_COMMENTS_SORTBY_DEFAULT);
      setOrderBy(SPECIALIST_COMMENTS_ORDERBY_DEFAULT);
    }

    setSortByOrderBy(`${newSortBy}_${newOrderBy}`);
  };

  const renderFormContent = () => (
    <>
      <div className="dpr-form-specialist-comments-sort">
        <div className="dpr-form-specialist-comments-sort__row">
          <div className="dpr-form-specialist-comments-sort__column-one-third">
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
                {specialistCommentSortByOrderByOptions.map((option) => (
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
          <div className="dpr-form-specialist-comments-sort__column-two-thirds govuk-!-padding-top-6">
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
      aria-label="Sort specialist comments"
    >
      {renderFormContent()}
    </form>
  ) : (
    renderFormContent()
  );
};
