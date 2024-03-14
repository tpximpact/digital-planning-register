"use client";

import { useParams } from "next/navigation"
import {getApplicationsByCouncil} from "../../server/index"
import { useEffect, useState } from "react";


// Our types for the site data
export interface Props {
  name: String
  description: String
  subdomain: String
}

export default function Home() {
  const [data, setData] = useState([])
  const params = useParams();

  useEffect(() => {
    async function callData(){
      const council = params.subdomain;
      const response = await getApplicationsByCouncil(council)
      setData(response.data)
    }
    callData()
  }, [params.subdomain])


  return (
    <>
{data?.map((application: any) => (
  <>
    <p style={{padding: "5px", fontWeight: 'bold'}}>description: <span style={{fontWeight: 'normal'}}>{application?.description}</span></p>
  </>
))}
    </>
  )
}

