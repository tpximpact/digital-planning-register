import { getApplicationById } from "../../../actions/index";
import { BackLink } from "@/components/button";
import ApplicationInformation from "@/components/application_information";
import ApplicationFile from "@/components/application_files";
import ApplicationDetails from "@/components/application_details";
import ApplicationLocation from "@/components/application_location";
import ApplicationPeople from "@/components/application_people";
import ApplicationConstraints from "@/components/application_constraints";
import ApplicationComments from "@/components/application_comments";
import { ApplicationComment } from "../../../../util/type";
import NotFound from "../../not-found";

type Props = { id: number; council: string };
type Params = { params: Props };

async function fetchData(params: Props) {
  const { id, council } = params;
  const data = await getApplicationById(id, council);

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string; council: string };
}) {
  const { id, council } = params;
  const data = await fetchData({ id: Number(id), council });

  if (data.error) {
    return {
      title: "Error",
      description: data.errorMessage || "An error occurred",
    };
  }

  return {
    title: "Application Data",
    description: "Fetched application data",
  };
}

export default async function Application({ params }: Params) {
  const data = await fetchData(params);
  const { id, council } = params;

  if (data.error || data.data === null) {
    return <NotFound />;
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
    <>
      <BackLink href={`/${council}`} />
      <div className="govuk-main-wrapper">
        <ApplicationInformation {...data} />
        {/* <ApplicationLocation /> */}
        {/* <ApplicationDetails {...data} /> */}
        <ApplicationFile
          {...data}
          id={id}
          maxDisplayDocuments={6}
          council={council}
        />
        <ApplicationPeople {...data} />
        <ApplicationComments
          {...data}
          council={council}
          id={id}
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
          id={id}
          maxDisplayComments={3}
          showViewAllButton={true}
          type="published"
          comments={publishedComments}
          currentPage={0}
          totalComments={publishedComments.length}
        />
        {/* <ApplicationConstraints /> */}
      </div>
    </>
  );
}
