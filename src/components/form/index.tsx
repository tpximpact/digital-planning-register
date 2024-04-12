import Link from "next/link";
const Form = ({
  searchById,
  setIdReference,
}: {
  searchById: (event: any) => Promise<void>;
  setIdReference: (value: any) => void;
}) => {
  return (
    <section className="search-application-content">
      <div className="form-content">
        <form>
          <div className="govuk-grid-column-one-half">
            <label htmlFor="search" className="govuk-label">
              Search by application reference, address or description
            </label>
            <input
              id="search"
              className="search"
              onChange={(e: any) => setIdReference(e.target.value)}
            />
          </div>
          <div className="govuk-grid-column-one-quarter search-bar-buttons">
            <button
              onClick={(event) => searchById(event)}
              className="govuk-button govuk-button--secondary"
            >
              Search
            </button>
          </div>
        </form>
        {/* <Link href="">Advanced search</Link> */}
      </div>
      <div>
        {/* <button className="govuk-button govuk-button--secondary">
          Filters
        </button> */}
      </div>
    </section>
  );
};

export default Form;
