"use client";

import { useParams } from "next/navigation"
import data from "../../../subdomains.json"


// Our types for the site data
export interface Props {
  name: String
  description: String
  subdomain: String
}

export default function Home() {
    const params = useParams();
    const tenant = params.subdomain;
    const tenantData = data.filter(el => el.subdomain === tenant)[0]
  return (
    <>
      <h1>
        {tenantData.name}
      </h1>
      <p>description: {tenantData.description}</p>
      <p>subdomain: {tenantData.subdomain}</p>
    </>
  )
}

