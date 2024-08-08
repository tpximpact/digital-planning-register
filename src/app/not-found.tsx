import { BackLink } from "@/components/button";
import NotFoundLink from "@/components/not_found_link";

interface NotFoundProps {
  params: {
    council: string;
  };
}

export default function NotFound({ params }: NotFoundProps) {
  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <h1 className="govuk-heading-l">Page not found</h1>
        <p className="govuk-body">
          The link you have used may be incorrect, or you are trying to reach a
          planning application that doesn&apos;t exist.
        </p>
        <p className="govuk-body">
          If you are having problems finding what you need, you can:
        </p>
        <NotFoundLink params={params} />
      </div>
    </>
  );
}
