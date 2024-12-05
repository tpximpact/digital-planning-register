import { Button } from "@/components/button";

export interface FormCookiePreferencesProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setAnalyticsConsent: (value: boolean) => void;
  analyticsConsent: boolean | null;
}

export const FormCookiePreferences = ({
  handleSubmit,
  setAnalyticsConsent,
  analyticsConsent,
}: FormCookiePreferencesProps) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h2 className="govuk-heading-l">Change your cookie settings</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="govuk-form-group">
            <fieldset className="govuk-fieldset">
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
                Do you want to accept analytics cookies?
              </legend>
              <div className="govuk-radios" data-module="govuk-radios">
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="cookies-analytics"
                    name="cookies[analytics]"
                    type="radio"
                    value="yes"
                    checked={analyticsConsent === true}
                    onChange={() => setAnalyticsConsent(true)}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="cookies-analytics"
                  >
                    Yes
                  </label>
                </div>
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="cookies-analytics-2"
                    name="cookies[analytics]"
                    type="radio"
                    value="no"
                    checked={analyticsConsent === false}
                    onChange={() => setAnalyticsConsent(false)}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="cookies-analytics-2"
                  >
                    No
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <Button type="submit" element="button" variant="default">
            Save cookie settings
          </Button>
        </form>
      </div>
    </div>
  );
};
