import { useState } from "react";
import { Button } from "../button";
import "./CommentFilter.scss";

import { Dropdown } from "../Dropdown";
type CommentFilterProps = {
  setOrderBy: (orderBy: string) => void;
};

export const CommentFilter = ({ setOrderBy }: CommentFilterProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="govuk-grid-row comment-filter">
      <Dropdown
        label="Sort by"
        id="sortOrder"
        options={[
          { title: "Most recent to oldest", value: "desc" },
          { title: "Oldest to most recent", value: "asc" },
        ]}
        setSelectedOption={setSelectedOption}
      />
      <div className="govuk-grid-column-two-thirds govuk-!-padding-top-6">
        <Button
          className="comment-filter__button"
          variant="secondary"
          onClick={() => {
            setOrderBy(selectedOption);
          }}
        >
          Apply sorting
        </Button>
      </div>
    </div>
  );
};
