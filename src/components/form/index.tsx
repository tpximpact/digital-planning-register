interface FormProps {
  searchById: (event: any) => Promise<void>;
  setIdReference: (value: any) => void;
}

const Form = ({ searchById, setIdReference }: FormProps) => {
  return (
    <div className="govuk-grid-row ">
      <form>
        <div className="govuk-grid-column-three-quarters">
          <label htmlFor="search" className="govuk-label">
            Search by application reference, address or description
          </label>
          <input
            id="search"
            className="govuk-input search"
            onChange={(e: any) => setIdReference(e.target.value)}
            autoComplete="on"
          />
        </div>
        <div className="govuk-grid-column-one-quarter search-bar-buttons">
          <button
            onClick={(event) => searchById(event)}
            className="govuk-button govuk-button"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
