import { getApplicationById } from "../../actions/index";
import { BackLink } from "@/components/button";
import ApplicationInformation from "@/components/application_information";
import ApplicationFile from "@/components/application_files";
import ApplicationDetails from "@/components/application_details";
import ApplicationLocation from "@/components/application_location";
import ApplicationPeople from "@/components/application_people";
import ApplicationConstraints from "@/components/application_constraints";
import ApplicationConsulteeComments from "@/components/application_consultee_comments";
import ApplicationPublishedComments from "@/components/application_published_comments";

type Id = {
  id: string;
};
type Params = {
  params: Id;
};

async function Application({ params }: Params) {
  const { id } = params;
  const data = await getApplicationById(parseFloat(id as string));

  return (
    <div>
      <BackLink href="/" />
      {data && (
        <>
          <ApplicationInformation {...data} />
          {/* <ApplicationLocation /> */}
          <ApplicationDetails {...data} />

          {/* <ApplicationPeople {...data}/> */}
          <ApplicationFile {...data} id={id} maxDisplayDocuments={6} />
          <ApplicationConsulteeComments
            {...data}
            id={id}
            maxDisplayComments={3}
            showViewAllButton={true}
          />
          <ApplicationPublishedComments
            {...data}
            id={id}
            maxDisplayComments={3}
            showViewAllButton={true}
          />

          {/* <ApplicationConstraints /> */}
        </>
      )}
    </div>
  );
}

export default Application;
