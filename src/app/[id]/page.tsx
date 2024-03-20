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
import ApplicationLocation from "@/components/application_location";
import ApplicationPeople from "@/components/application_people";
import ApplicationConstraints from "@/components/application_constraints";

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
{
    data && <>
    <ApplicationInformation {...data}/>
{/* <ApplicationLocation /> */}
<ApplicationDetails {...data}/>

{/* <ApplicationPeople {...data}/> */}
<ApplicationFile {...data}/>
{/* <ApplicationConstraints /> */}
    </>
}

        </div>
    )
}

export default Application