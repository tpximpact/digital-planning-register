import { SearchParams } from "@/types";
import "./FormSearch.scss";
import { Button } from "@/components/button";

export interface FormSearchProps {
  action: string;
  searchParams?: SearchParams;
}

export const FormSearch = ({ action, searchParams }: FormSearchProps) => {
  return (
    <form action={action} method="get" className="govuk-grid-row">
      <div className="govuk-grid-column-one-half">
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="query">
            Search by application reference, address or description
          </label>
          <input
            className="govuk-input"
            id="query"
            name="query"
            type="text"
            defaultValue={searchParams?.query || ""}
            autoComplete="on"
          />
        </div>
      </div>
      <div className="govuk-grid-column-one-quarter search-bar-buttons">
        <Button type="submit" element="button" variant="default">
          Search
        </Button>
      </div>
    </form>
  );
};
