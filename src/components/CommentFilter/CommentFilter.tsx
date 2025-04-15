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
