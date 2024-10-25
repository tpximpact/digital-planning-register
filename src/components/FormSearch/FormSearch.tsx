import { SearchParams } from "@/types";
import "./FormSearch.scss";
import { Button } from "../button";

export interface FormSearchProps {
  action: string;
  searchParams?: SearchParams;
  validationError?: boolean;
}

export const FormSearch = ({
  action,
  searchParams,
  validationError,
}: FormSearchProps) => {
  return (
    <form action={action} method="get" className="govuk-grid-row">
      <div className="govuk-grid-column-one-half">
        <div className="govuk-form-group">
          <h1 className="govuk-label-wrapper">
            <label className="govuk-label" htmlFor="query">
              Search by application reference, address or description
            </label>
          </h1>
          <input
            className="govuk-input"
            id="query"
            name="query"
            type="text"
            defaultValue={searchParams?.query || ""}
            autoComplete="on"
          />
          {validationError && (
            <p
              id="search-error"
              className="govuk-error-message"
              data-testid="validation-error"
            >
              <span className="govuk-visually-hidden">Error:</span> Enter at
              least 3 characters to search
            </p>
          )}
        </div>
      </div>
      <div className="govuk-grid-column-one-quarter search-bar-buttons">
        <Button type="submit" content="Search" />
      </div>
    </form>
  );
};
