/* eslint-disable react/no-unescaped-entities */
"use client"

import { useParams } from "next/navigation";
import {getApplicationById} from "../../server/index";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/button";
import { Data } from "../../../util/type";
import ApplicationInformation from "@/components/application_information";
import ApplicationFile from "@/components/application_files";
import ApplicationDetails from "@/components/application_details";

const Application = () => {
    const [data, setData] = useState<Data>()
    const { id } = useParams()

    useEffect(() => {
        (async() => {
            const response = await getApplicationById(parseFloat(id as string))
            setData(response)
        })
        ()
    }, [id])
    return(
        <div>
<BackLink href="/"/>
<ApplicationInformation {...data}/>
{/* Add real data when available */}
{/* <h2 className="govuk-heading-l">Location</h2>
<div className="govuk-grid-row  grid-row-extra-bottom-margin">   
    <div className="govuk-grid-column">
        <div className="govuk-grid-column-one-quarter">
          <h3 className="govuk-heading-s">Property type</h3>
          <p className="govuk-body">Smallholding</p>
        </div>
    </div>

    <div className="govuk-grid-column">
      <div className="govuk-grid-column-one-quarter">
        <h3 className="govuk-heading-s">Region</h3>
        <p className="govuk-body">London</p>
      </div>
    </div>

    <div className="govuk-grid-column">
      <div className="govuk-grid-column-one-quarter">
        <h3 className="govuk-heading-s">Local authority district</h3>
        <p className="govuk-body">Camden</p>
      </div>
    </div>

    <div className="govuk-grid-column">
      <div className="govuk-grid-column-one-quarter">
        <h3 className="govuk-heading-s">Energy Performance Certificate</h3>
        <p className="govuk-body">(string)</p>
      </div>
    </div>
</div> */}

<ApplicationDetails {...data}/>
{/* Not clear if we are having on MVP */}
{/* <h2 className="govuk-heading-l">Related Applications</h2>
  
<ul className="govuk-list govuk-list--bullet grid-row-extra-bottom-margin">
  <li><a href="#" className="govuk-link govuk-link--no-visited-state">Pre-application - 2024/0452/C</a></li>
  <li><a href="#" className="govuk-link govuk-link--no-visited-state">Conditions of construction - 2024/0685/A</a></li>
</ul> */}

{/* <h2 className="govuk-heading-l">People</h2> */}

{/* <div className="govuk-grid-row">
  <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
    <h3 className="govuk-heading-m">Applicant</h3> 

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Name</h4>
        <p className="govuk-body">{data?.applicant_first_name} {data?.applicant_last_name}</p>
      </div>
    </div>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Type</h4>
        <p className="govuk-body">Company</p>
      </div>
    </div>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Relationship to property</h4>
        <p className="govuk-body">Occupier</p>
      </div>
    </div>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Company</h4>
        <p className="govuk-body">JoSmith Ltd</p>
      </div>
    </div>
    
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Address</h4>
        <p className="govuk-body">19 Road Street, Placeton, Cityville, PO5 7CO</p>
      </div>
    </div>
  </div>
  
  <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
    <h3 className="govuk-heading-m">Applicants Agent</h3>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Name</h4>
        <p className="govuk-body">{data?.agent_first_name} {data?.agent_last_name}</p>
      </div>
    </div>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Company</h4>
        <p className="govuk-body">JoanDoe Ltd</p>
      </div>
    </div>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Address</h4>
        <p className="govuk-body">19 Road Street, Placeton, Cityville, PO5 7CO</p>
      </div>
    </div>
  </div>
  
  <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
    <h3 className="govuk-heading-m">Owner</h3>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Name</h4>
        <p className="govuk-body">Joanne Doe</p>
      </div>
    </div>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Address</h4>
        <p className="govuk-body">91 Road Street, Placeton, Cityville, PO5 7CO</p>
      </div>
    </div>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h4 className="govuk-heading-s">Notice given</h4>
        <p className="govuk-body">01/02/2024</p>
      </div>
    </div>
  </div>
</div> */}
<ApplicationFile {...data}/>

{/* <h2 className="govuk-heading-l">Constraints</h2>
<p className="govuk-body"><em>Planning constraints, guidance and designations that intersect with the proposed site</em></p>

<div className="govuk-grid-row">    
    <div className="govuk-grid-column-one-third">
      <h3 className="govuk-heading-s">General policy</h3>
      <p className="govuk-body">Article 4 direction areas</p>
      <p className="govuk-body"><a href="#" className="govuk-link govuk-link--no-visited-state">Source</a></p>
    </div>

    <div className="govuk-grid-column-one-third">
      <h3 className="govuk-heading-s">Heritage conservation area</h3>
      <p className="govuk-body"><a href="#" className="govuk-link govuk-link--no-visited-state">Source</a></p>
    </div>
    
    <div className="govuk-grid-column-one-third">
      <h3 className="govuk-heading-s">General policy</h3>
      <p className="govuk-body">Classified roads</p>
      <p className="govuk-body"><a href="#" className="govuk-link govuk-link--no-visited-state">Source</a></p>
    </div>
</div>

<div className="govuk-grid-row grid-row-extra-bottom-margin">
    <div className="govuk-grid-column-two-thirds">
      <h3 className="govuk-heading-m">Sources</h3>
      <p className="govuk-body"><em>A list of open data requests or websites that explain how these constraints were sourced</em></p>
      <p className="govuk-body"><a href="#" className="govuk-link govuk-link--no-visited-state">DE-9IM spatial relationship definition of intersects</a></p>
    </div>
</div> */}
        </div>
    )
}

export default Application