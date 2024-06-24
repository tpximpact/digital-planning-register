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
    <form
      action={`/${council}/${reference}/submit-comment?page=0`}
      method="POST"
    >
      <input type="hidden" name="council" value={council} />
      <input type="hidden" name="reference" value={reference} />
      <input type="hidden" name="applicationId" value={applicationId} />
      <button
        type="submit"
        role="button"
        className="govuk-button govuk-button--primary"
        data-module="govuk-button"
      >
        Comment on this application
      </button>
    </form>
  );
};

export default ButtonDetails;
