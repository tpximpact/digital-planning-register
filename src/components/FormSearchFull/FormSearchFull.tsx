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

import { Button } from "@/components/button";
import "./FormSearchFull.scss";
import { SearchParamsApplication } from "@/types";
import { InfoIcon } from "../InfoIcon";
import { applicationSearchFields } from "@/util/featureFlag";
import { DetailsCheckboxAccordion } from "@/components/DetailsCheckboxAccordion";
import {
  validApplicationTypes,
  validDprDecisionSummaries,
  validPublicApplicationStatusSummaries,
} from "@/lib/planningApplication";
import { capitalizeFirstLetter } from "@/util";
import { FormFieldApplicationDateRange } from "@/components/FormFieldApplicationDateRange";

export interface FormSearchFullProps {
  councilSlug: string;
  action?: string;
  searchParams: SearchParamsApplication;
}

export const FormSearchFull = ({
  councilSlug,
  action,
  searchParams,
}: FormSearchFullProps) => {
  const flatApplicationTypes = Object.values(validApplicationTypes).flat();

  const renderFormContent = () => (
    <div className="dpr-form-search-full">
      <input type="hidden" name="type" value="full" />
      <InfoIcon
        href={`/${councilSlug}/help`}
        title="Get help understanding what everything here means"
        ariaLabel="Get help understanding what everything here means"
        className="dpr-form-search-full__info-icon"
      />
      <div className="govuk-button-group">
        <Button variant="secondary" href={`/${councilSlug}`} element="link">
          Back to simple search
        </Button>
        {/* <Button variant="secondary" href={`/${councilSlug}/map`} element="link">
          Search an area on a map
        </Button> */}
      </div>

      <h1 className="govuk-visually-hidden">Full application search</h1>

      {["reference", "description"].some((field) =>
        applicationSearchFields.includes(field),
      ) && (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            <div className="govuk-grid-column-one-half">
              <fieldset className="govuk-fieldset">
                <legend className="govuk-fieldset__legend govuk-visually-hidden">
                  Simple application search
                </legend>

                {/* application reference */}
                {applicationSearchFields.includes("reference") && (
                  <div className="govuk-form-group">
                    <label className="govuk-label" htmlFor="reference">
                      Application reference
                    </label>
                    <input
                      className="govuk-input govuk-!-width-full"
                      id="reference"
                      name="reference"
                      type="text"
                      defaultValue={searchParams?.reference ?? ""}
                    />
                  </div>
                )}

                {/* description */}
                {applicationSearchFields.includes("description") && (
                  <div className="govuk-form-group">
                    <label className="govuk-label" htmlFor="description">
                      Description
                    </label>
                    <input
                      className="govuk-input govuk-!-width-full"
                      id="description"
                      name="description"
                      type="text"
                      defaultValue={searchParams?.description ?? ""}
                    />
                  </div>
                )}
              </fieldset>
            </div>
          </div>
        </>
      )}

      {applicationSearchFields.includes("applicationType") && (
        <DetailsCheckboxAccordion
          title="Application type"
          name="applicationType"
          options={flatApplicationTypes}
          checkedOptions={searchParams?.applicationType?.split(",") ?? []}
          content={
            <InfoIcon
              href={`/${councilSlug}/help/application-types`}
              title="Get help understanding what application types mean"
              ariaLabel="Get help understanding what application types mean"
            />
          }
        />
      )}

      {applicationSearchFields.includes("applicationStatus") && (
        <DetailsCheckboxAccordion
          title="Application status"
          name="applicationStatus"
          options={validPublicApplicationStatusSummaries}
          checkedOptions={searchParams?.applicationStatus?.split(",") ?? []}
          content={
            <InfoIcon
              href={`/${councilSlug}/help/application-statuses`}
              title="Get help understanding what application statuses mean"
              ariaLabel="Get help understanding what application statuses mean"
            />
          }
        />
      )}

      {applicationSearchFields.includes("councilDecision") && (
        <DetailsCheckboxAccordion
          title="Council decision"
          name="councilDecision"
          options={validDprDecisionSummaries.map((option) =>
            capitalizeFirstLetter(option),
          )}
          checkedOptions={searchParams?.councilDecision?.split(",") ?? []}
          content={
            <InfoIcon
              href={`/${councilSlug}/help/decisions#council-decisions`}
              title="Get help understanding what council decisions mean"
              ariaLabel="Get help understanding what council decisions mean"
            />
          }
        />
      )}

      {applicationSearchFields.includes("dateRange") && (
        <>
          <hr className="govuk-section-break govuk-section-break--visible grid-row-extra-bottom-margin" />

          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            <div className="govuk-grid-column-one-half">
              <FormFieldApplicationDateRange searchParams={searchParams} />
            </div>
          </div>
        </>
      )}
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

      <div className="govuk-button-group">
        <Button type="submit" variant="primary" name="action" value="submit">
          Search
        </Button>
        {!action && (
          <Button type="submit" variant="secondary" name="action" value="clear">
            Clear search
          </Button>
        )}
      </div>
    </div>
  );

  return action ? (
    <form
      className="govuk-form"
      method="get"
      action={action}
      aria-label="Sort comments"
    >
      <input type="hidden" name="council" value={councilSlug} />
      {renderFormContent()}
    </form>
  ) : (
    renderFormContent()
  );
};
