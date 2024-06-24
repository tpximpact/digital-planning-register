import PreSubmission from "@/components/comment_pre_submission";
import CommentSentiment from "@/components/comment_sentiment";
import CommentTopicSelection from "@/components/comment_topic_selection";
import CommentHeader from "@/components/comment-header";
import CommentTextEntry from "@/components/comment_text_entry";
import CommentPersonalDetails from "@/components/comment_personal_details";
import CommentCheckAnswer from "@/components/comment_check_answer";
import CommentConfirmation from "@/components/comment_confirmation";
import { BackLink } from "@/components/button";
import { getApplicationByReference } from "@/actions";
import { notFound, redirect } from "next/navigation";
import { capitaliseWord } from "../../../../../util/capitaliseWord";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

type Props = {
  params: { reference: string; council: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type ComponentProps = {
  council: string;
  reference: string;
  applicationId?: number;
  site?: string;
  boundary_geojson?: any;
};

const componentMap: { [key: number]: React.ComponentType<ComponentProps> } = {
  0: PreSubmission as React.ComponentType<ComponentProps>,
  1: CommentSentiment as React.ComponentType<ComponentProps>,
  2: CommentTopicSelection as React.ComponentType<ComponentProps>,
  3: CommentTextEntry as React.ComponentType<ComponentProps>,
  4: CommentPersonalDetails as React.ComponentType<ComponentProps>,
  5: CommentCheckAnswer as React.ComponentType<ComponentProps>,
  6: CommentConfirmation as React.ComponentType<ComponentProps>,
};

function renderComponent(page: number, props: ComponentProps) {
  const Component = componentMap[page];
  if (!Component) {
    return null;
  }
  return <Component {...props} />;
}
async function fetchData({
  reference,
  council,
}: {
  reference: string;
  council: string;
}) {
  const data = await getApplicationByReference(reference, council);
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { reference: string; council: string };
}) {
  const { reference, council } = params;
  const data = await fetchData({ reference, council });

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

const Comment = async ({ params, searchParams }: Props) => {
  let { reference, council } = params;

  if (!reference) reference = cookies().get("reference")?.value || "";
  if (!council) council = cookies().get("council")?.value || "";
  if (!reference || !council) {
    redirect("/");
  }

  const page = parseInt((searchParams.page as string) || "0");

  const data = await fetchData({ reference, council });

  const componentProps: ComponentProps = {
    council,
    reference,
    applicationId: data.id,
    site: data?.site,
    boundary_geojson: data?.boundary_geojson,
  };

  const getBackLinkHref = () => {
    if (page === 0) {
      return "/";
    } else if (page === 6) {
      return `/${council}/${reference}/submit-comment?page=5`;
    } else {
      return `/${council}/${reference}/submit-comment?page=${page - 1}`;
    }
  };

  return (
    <>
      <BackLink href={getBackLinkHref()} />
      <div className="govuk-main-wrapper">
        {page > 0 && page < 6 && (
          <CommentHeader
            reference={reference}
            boundary_geojson={data?.boundary_geojson}
            site={data?.site}
            council={council}
          />
        )}
        {renderComponent(page, componentProps)}
      </div>
    </>
  );
};

export default Comment;
