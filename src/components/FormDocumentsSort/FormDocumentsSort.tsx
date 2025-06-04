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
  DprDocumentOrderBy,
  DprDocumentSortBy,
  SearchParamsDocuments,
} from "@/types";
import { Button } from "@/components/button";
import {
  DOCUMENT_ORDERBY_DEFAULT,
  DOCUMENT_ORDERBY_OPTIONS,
  DOCUMENT_SORTBY_DEFAULT,
  DOCUMENT_SORTBY_OPTIONS,
} from "@/lib/documents";
import { useState } from "react";
import "./FormDocumentsSort.scss";

export interface FormDocumentsSortProps {
  searchParams: SearchParamsDocuments;
  action?: string;
}

export const FormDocumentsSort = ({
  searchParams,
  action,
}: FormDocumentsSortProps) => {
  const [sortBy, setSortBy] = useState(
    searchParams?.sortBy ?? DOCUMENT_SORTBY_DEFAULT,
  );
  const [orderBy, setOrderBy] = useState(
    searchParams?.orderBy ?? DOCUMENT_ORDERBY_DEFAULT,
  );
  const [sortByOrderBy, setSortByOrderBy] = useState(`${sortBy}_${orderBy}`);

  const documentSortByOrderByOptions = [
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
    {
      label: "A-Z",
      sortBy: "name",
      orderBy: "asc",
    },
    {
      label: "Z-A",
      sortBy: "name",
      orderBy: "desc",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newOrderBy] = e.target.value.split("_");

    if (
      DOCUMENT_SORTBY_OPTIONS.includes(newSortBy as DprDocumentSortBy) &&
      DOCUMENT_ORDERBY_OPTIONS.includes(newOrderBy as DprDocumentOrderBy)
    ) {
      setSortBy(newSortBy as DprDocumentSortBy);
      setOrderBy(newOrderBy as DprDocumentOrderBy);
    } else {
      setSortBy(DOCUMENT_SORTBY_DEFAULT);
      setOrderBy(DOCUMENT_ORDERBY_DEFAULT);
    }

    setSortByOrderBy(`${newSortBy}_${newOrderBy}`);
  };

  const renderFormContent = () => (
    <div className="dpr-form-documents-sort">
      <div className="dpr-form-documents-sort__row">
        <div className="dpr-form-documents-sort__column-one-third">
          <div className="govuk-form-group">
            <label htmlFor="documentSortByorderBy" className="govuk-label">
              Sort by
            </label>
            <select
              id="documentSortByorderBy"
              value={sortByOrderBy}
              onChange={handleChange}
              className="govuk-select govuk-!-width-full"
            >
              {documentSortByOrderByOptions.map((option) => (
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
        <div className="dpr-form-documents-sort__column-two-thirds govuk-!-padding-top-6">
          <input type="hidden" name="sortBy" defaultValue={sortBy} />
          <input type="hidden" name="orderBy" defaultValue={orderBy} />
          <Button variant="secondary" type="submit">
            Apply sorting
          </Button>
        </div>
      </div>
    </div>
  );

  return action ? (
    <form
      className="govuk-form"
      method="get"
      action={action}
      aria-label="Sort documents"
    >
      {renderFormContent()}
    </form>
  ) : (
    renderFormContent()
  );
};
