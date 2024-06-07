import { notFound } from "next/navigation";
import { getApplicationByReference } from "../../../actions/index";
import { BackLink } from "@/components/button";
import ApplicationInformation from "@/components/application_information";
import ApplicationFile from "@/components/application_files";
import ApplicationDetails from "@/components/application_details";
import ApplicationLocation from "@/components/application_location";
import ApplicationPeople from "@/components/application_people";
import ApplicationConstraints from "@/components/application_constraints";
import ApplicationComments from "@/components/application_comments";
import { ApplicationComment } from "../../../../util/type";
import { capitaliseWord } from "../../../../util/capitaliseWord";
import NotFound from "@/app/not-found";

type Props = { reference: string; council: string };
type Params = { params: Props };

async function fetchData(params: Props) {
  const { reference, council } = params;
  const data = await getApplicationByReference(reference, council);

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { reference: string; council: string };
}) {
  const { reference, council } = params;
  const data = await fetchData({ reference: reference, council });

  if (data.error) {
    return {
      title: "Error",
      description: data.errorMessage || "An error occurred",
    };
  }

  return {
    title: `Application ${data.reference}`,
    description: `${capitaliseWord(params.council)} planning application`,
  };
}

export default async function Application({ params }: Params) {
  const data = await fetchData(params);
  const { reference, council } = params;

  if (data.error || data.data === null) {
    return <NotFound params={params} />;
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
        <ApplicationInformation {...data} council={council} />
        {/* <ApplicationLocation /> */}
        {/* <ApplicationDetails {...data} /> */}
        <ApplicationFile
          {...data}
          reference={reference}
          maxDisplayDocuments={6}
          council={council}
        />
        <ApplicationPeople {...data} />
        <ApplicationComments
          {...data}
          council={council}
          reference={reference}
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
          reference={reference}
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
