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
import { useState } from "react";
import { Button } from "../button";
import "./CommentFilter.scss";
import { Dropdown } from "../Dropdown";
import { useRouter, useSearchParams } from "next/navigation";

export const CommentFilter = ({
  defaultOrderBy = "desc",
}: {
  defaultOrderBy?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderBy, setOrderBy] = useState(
    searchParams.get("orderBy") ?? defaultOrderBy,
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
  };

  return (
    <div className="govuk-grid-row comment-filter">
      <h2 className="govuk-heading-m govuk-!-margin-left-3">Search comments</h2>
      <Dropdown
        label="Sort by"
        id="sortOrder"
        options={[
          { title: "Most recent to oldest", value: "desc" },
          { title: "Oldest to most recent", value: "asc" },
        ]}
        onChange={handleChange}
        value={searchParams.get("orderBy") ?? defaultOrderBy}
      />
      <div className="govuk-grid-column-two-thirds govuk-!-padding-top-6">
        <Button
          className="comment-filter__button"
          variant="secondary"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("orderBy", orderBy);
            router.push(`?${params.toString()}`);
          }}
        >
          Apply sorting
        </Button>
      </div>
    </div>
  );
};
