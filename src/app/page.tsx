"use client"
import { Suspense, useEffect, useState } from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import {getApplicationsByCouncil} from "../app/server";
import Link from "next/link";
import {SortIcon} from '../../public/icons';

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
const resultsPerPage = 10
export const tableHead = [{name: 'Reference Number', icon: true}, {name: 'Address', icon: false}, {name:'Description', icon: false}, {name: 'Application Type', icon: true}, {name:'Date Submited', icon: true}, {name:'Status', icon: true}]
export default function Home() {
  const [data, setData] = useState([])
  const [metaData, setMetaData] = useState<any>({})

  useEffect(() => {
    (async() => {
      const response = await getApplicationsByCouncil(1, resultsPerPage);
      console.log(response)
      setData(response.data);
      setMetaData(response.metadata)
    })
    ()
  }, [])

async function handlePageClick(event: any) {
  console.log('click', event.selected)
  const response = await getApplicationsByCouncil(event.selected + 1, resultsPerPage);
      console.log(response)
      setData(response.data);
}
  return (
    <Suspense fallback={<Loading />}>
    <main style={{overflowX: 'auto'}}>
      {
        data.length > 0 &&
      
      <><section className="search-application-content">
            <div>
              <input placeholder="Search by application reference number" />
              <button>Search</button>
              <Link href="">Advanced search</Link>
            </div>
            <div>
              <button>Filters</button>
            </div>
          </section>
          <table className="landing-table-content">
              <tbody>
                <tr>
                  {tableHead.map((thead, index) => (
                    <th key={index}><p>{thead.name} {thead.icon && <span><SortIcon /></span>}</p></th>
                  ))}


                </tr>
                {data?.map((application: any, index: any) => (
                  <tr key={index}>
                    <td><Link href="/">{application.reference}</Link></td>
                    <td>{application.site.address_1}</td>
                    <td style={{ maxWidth: "40rem" }}>{application.description}</td>
                    <td>{application.application_type}</td>
                    <td>{`${moment(application.received_date).format("MM-DD-YYYY")}`}</td>
                    <td>{application.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section className="pagination-section">
              Page 
              <ReactPaginate
                breakLabel="..."
                // nextLabel={<NextIcon />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                pageCount={metaData?.total_pages}
                // previousLabel={<PreviewIcon />}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active-page"
                renderOnZeroPageCount={null} />
            </section></>
      }
    </main>
    </Suspense>
  );
}
