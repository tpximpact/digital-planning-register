import Link from "next/link";

const ButtonDetails = ({
  council,
  reference,
  applicationId,
}: {
  council: string;
  reference: string;
  applicationId: number;
}) => {
  return (
    <Link
      href={`/${council}/${reference}/submit-comment`}
      className="govuk-button govuk-button--primary"
      data-module="govuk-button"
    >
      Comment on this application
    </Link>
  );
};

export default ButtonDetails;
