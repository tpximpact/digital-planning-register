"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import {getApplicationsByCouncil} from "../app/server"


const tableHead = ['Reference Number', 'Address', 'Description', 'Application Type', 'Date Submited', 'Status']
export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async() => {
      const response = await getApplicationsByCouncil();
      console.log(response.data)
      setData(response.data);
    })
    ()
  }, [])

  return (
    <main >
      <table>
        <tr>
      {
        tableHead.map((thead, index) => (
          <th key={index}>{thead} <button>Up</button> <button>Down</button></th>
        ))
      }
      </tr>
      {
        data?.map((application: any, index : any) => (
          <tr key={index} >
          <td>{application.reference}</td>
          <td>{application.site.address_1}</td>
          <td style={{maxWidth: "40rem"}}>{application.description}</td>
          <td>{application.application_type}</td>
          <td>{application.received_date
}</td>
          <td>{application.status}</td>
          </tr>
        ))
      
      }
      </table>
    </main>
  );
}
