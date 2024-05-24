import { notFound } from "next/navigation";
import { getApplicationByReferenceNumber } from "../../../actions/index";
import { BackLink } from "@/components/button";
import ApplicationInformation from "@/components/application_information";
import ApplicationFile from "@/components/application_files";
import ApplicationDetails from "@/components/application_details";
import ApplicationLocation from "@/components/application_location";
import ApplicationPeople from "@/components/application_people";
import ApplicationConstraints from "@/components/application_constraints";
import ApplicationComments from "@/components/application_comments";
import { ApplicationComment } from "../../../../util/type";

type Props = { applicationNumber: string; council: string };
type Params = { params: Props };

export default async function Application({ params }: Params) {
  const { applicationNumber, council } = params;

  const data = await getApplicationByReferenceNumber(
    applicationNumber,
    council,
  );

  if (data.error || data.data === null) {
    notFound();
  }

  const sortComments = (comments: ApplicationComment[] = []) => {
    return comments.sort((a, b) => {
      const dateA = a.received_at ? new Date(a.received_at).getTime() : 0;
      const dateB = b.received_at ? new Date(b.received_at).getTime() : 0;
      return dateB - dateA;
    });
  };

  const consulteeComments = sortComments(data?.consultee_comments);
  const publishedComments = sortComments(data?.published_comments);

  return (
    <div>
      <BackLink />
      {data && (
        <div className="govuk-main-wrapper">
          <ApplicationInformation {...data} />
          {/* <ApplicationLocation /> */}
          {/* <ApplicationDetails {...data} /> */}
          <ApplicationFile
            {...data}
            applicationNumber={applicationNumber}
            maxDisplayDocuments={6}
            council={council}
          />
          <ApplicationPeople {...data} />
          <ApplicationComments
            {...data}
            council={council}
            applicationNumber={applicationNumber}
            maxDisplayComments={3}
            showViewAllButton={true}
            type="consultee"
            comments={consulteeComments}
            currentPage={0}
            totalComments={consulteeComments.length}
          />
          <ApplicationComments
            {...data}
            council={council}
            applicationNumber={applicationNumber}
            maxDisplayComments={3}
            showViewAllButton={true}
            type="published"
            comments={publishedComments}
            currentPage={0}
            totalComments={publishedComments.length}
          />
          {/* <ApplicationConstraints /> */}
        </div>
      )}
    </div>
  );
}
