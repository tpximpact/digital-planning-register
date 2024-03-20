import Link from "next/link"
const Form = ({searchById, setIdReference}: {searchById: (event: any) => Promise<void>, setIdReference: (value: any) => void}) => {
    return(
              <section className="search-application-content">
            <div className="form-content">
              <form>
                <input className="search" placeholder="Search by application reference number" onChange={(e: any) => setIdReference(e.target.value)}/>
                <button onClick={(event) => searchById(event)} className="govuk-button govuk-button--secondary">Search</button>
              </form>
              <Link href="">Advanced search</Link>
            </div>
            <div>
              <button className="govuk-button govuk-button--secondary">Filters</button>
            </div>
          </section>
    )
}

export default Form