import { AppConfig } from "@/types";

export interface CouncilSelectorProps {
  councils: AppConfig["councils"];
  selectedCouncil?: AppConfig["council"];
}

export const CouncilSelector = ({
  councils,
  selectedCouncil,
}: CouncilSelectorProps) => {
  const availableCouncils = councils.filter(
    (council) => council.visibility === "public",
  );
  return (
    <>
      {availableCouncils && availableCouncils.length > 1 && (
        <form action="/" method="">
          <div>
            <select
              className="govuk-select noscript-only council-selection"
              id="council-select-noscript"
              name="council"
              defaultValue={selectedCouncil?.slug ?? "select"}
              aria-label="Select your council"
              autoComplete="on"
            >
              <option value="select">Select your council</option>
              {availableCouncils?.map((council) => (
                <option key={council.slug} value={council.slug}>
                  {council.name}
                </option>
              ))}
            </select>
            <noscript>
              <button
                type="submit"
                className="govuk-button custom-button council-selection"
              >
                Select
              </button>
            </noscript>
          </div>
        </form>
      )}
    </>
  );
};

export default CouncilSelector;
