import { getApplicationById } from "../../actions/index";
import { BackLink } from "@/components/button";
import ApplicationInformation from "@/components/application_information";
import ApplicationFile from "@/components/application_files";
import ApplicationDetails from "@/components/application_details";
import ApplicationLocation from "@/components/application_location";
import ApplicationPeople from "@/components/application_people";
import ApplicationConstraints from "@/components/application_constraints";
import ApplicationComments from "@/components/application_comments";

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
    <div className="govuk-width-container">
      <BackLink href="/" />
      {data && (
        <div className="govuk-main-wrapper">
          <ApplicationInformation {...data} />
          {/* <ApplicationLocation /> */}
          {/* <ApplicationDetails {...data} /> */}

          <ApplicationFile {...data} id={id} maxDisplayDocuments={6} />
          <ApplicationComments
            {...data}
            id={id}
            maxDisplayComments={3}
            showViewAllButton={true}
            type="consultee"
            comments={data.consultee_comments}
          />

          <ApplicationComments
            {...data}
            id={id}
            maxDisplayComments={3}
            showViewAllButton={true}
            type="published"
            comments={data.published_comments}
          />
          {/* <ApplicationConstraints /> */}
        </div>
      )}
    </div>
  );
}

export default Application;
