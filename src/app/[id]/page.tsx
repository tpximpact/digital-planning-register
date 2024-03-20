import {getApplicationById} from "../../actions/index";
import { BackLink } from "@/components/button";
import ApplicationInformation from "@/components/application_information";
import ApplicationFile from "@/components/application_files";
import ApplicationDetails from "@/components/application_details";
import ApplicationLocation from "@/components/application_location";
import ApplicationPeople from "@/components/application_people";
import ApplicationConstraints from "@/components/application_constraints";

type Id = {
    id: string
}
type Params = {
    params: Id
}

async function Application({params}: Params) {
    const { id } = params
    const data = await getApplicationById(parseFloat(id as string))

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