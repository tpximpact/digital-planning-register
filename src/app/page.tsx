"use client"
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import {getApplicationsByCouncil, getApplicationById} from "../server";
import Link from "next/link";
import {NextIcon, PreviewIcon} from '../../public/icons';
import {Data} from "../../util/type"
import Form from "@/components/form";

const resultsPerPage = 10
const tableHead = [{name: 'Reference Number', icon: true}, {name: 'Address', icon: false}, {name:'Description', icon: false}, {name: 'Application Type', icon: true}, {name:'Date Submited', icon: true}, {name:'Status', icon: true}]
export default function Home() {
  const [data, setData] = useState<Data[]>([])
  const [metaData, setMetaData] = useState<any>(undefined)
  const [idReference, setIdReference] = useState<number>(0)

  useEffect(() => {
    (async() => {
      const response = await getApplicationsByCouncil(1, resultsPerPage);
      setData(response.data);
      setMetaData(response.metadata)
      console.log({response})
    })
    ()
  }, [])

async function handlePageClick(event: any) {
  const response = await getApplicationsByCouncil(event.selected + 1, resultsPerPage);
      setData(response.data);
}

// in the future it should change to byReferenceNumber
async function searchById(event: any) {
  event.preventDefault()
  const data = await getApplicationById(idReference)
  setData([data] as Data[])
  setMetaData(undefined)
}
  return (
    <main style={{overflowX: 'auto'}}>
      {
        data.length > 0 &&
      
      <>
      <Form searchById={(event: any) => searchById(event)} setIdReference={setIdReference}/>
          <table className="landing-table-content govuk-table">
              <tbody>
                <tr>
                  {tableHead.map((thead, index) => (
                    <th key={index} className="govuk-table__head"><p>{thead.name} 
                    {/* {thead.icon && <span><SortIcon /></span>} */}
                    </p></th>
                  ))}


                </tr>
                {data?.map((application: any, index: any) => (
                  <tr key={index} className="govuk-table__row">
                    <td className="govuk-table__cell"><Link href="/">{application?.reference}</Link></td>
                    <td className="govuk-table__cell">{application?.site?.address_1}, {application?.site?.postcode}</td>
                    <td className="govuk-table__cell" style={{ maxWidth: "40rem" }}>{application?.description}</td>
                    <td className="govuk-table__cell">{application?.application_type.replace(/_/g, " ")}</td>
                    <td className="govuk-table__cell">{`${format(new Date(application?.received_date), 'dd-MM-yyyy')}`}</td>
                    <td className="govuk-table__cell">{application?.status.replace(/_/g, " ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section className="pagination-section">
              {
                metaData?.total_pages > 1 && (
              <>
              <ReactPaginate
                breakLabel="..."
                nextLabel={<NextIcon />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                pageCount={metaData?.total_pages}
                previousLabel={<PreviewIcon />}
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
                </>
                )
                }
            </section></>
            
      }
    </main>
  );
}
