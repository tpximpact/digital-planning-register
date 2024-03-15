"use client"
import { Suspense, useEffect, useState } from "react";
import moment from "moment";
import {getApplicationsByCouncil} from "../app/server"
import Link from "next/link";
import {SortIcon} from '../../public/icons'

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export const tableHead = [{name: 'Reference Number', icon: true}, {name: 'Address', icon: false}, {name:'Description', icon: false}, {name: 'Application Type', icon: true}, {name:'Date Submited', icon: true}, {name:'Status', icon: true}]
export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async() => {
      const response = await getApplicationsByCouncil();
      setData(response.data);
    })
    ()
  }, [])

  return (
    <Suspense fallback={<Loading />}>
    <main style={{overflowX: 'auto'}}>
      <div>
        <input />
        <button>Search</button>
        <Link href="">Advanced search</Link>
        <div>
          <button>Filters</button>
        </div>
      </div>
      <table className="landing-table-content">
        <tbody>
        <tr>
      {
        tableHead.map((thead, index) => (
          <th key={index}><p>{thead.name} {thead.icon && <span><SortIcon/></span>}</p></th>
        ))
      }
     

      </tr>
      {
        data?.map((application: any, index : any) => (
          <tr key={index} >
          <td><Link href="/">{application.reference}</Link></td>
          <td>{application.site.address_1}</td>
          <td style={{maxWidth: "40rem"}}>{application.description}</td>
          <td>{application.application_type}</td>
          <td>{`${moment(application.received_date).format("MM-DD-YYYY")}`}</td>
          <td>{application.status}</td>
          </tr>
        ))
      
      }
      </tbody>
      </table>
    </main>
    </Suspense>
  );
}
