const ButtonDetails = ({ actionHandler }: { actionHandler: any }) => {
  return (
    <form action={actionHandler}>
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
