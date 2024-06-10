"use client";
import { useRouter } from "next/navigation";

const ButtonDetails = ({
  council,
  reference,
}: {
  council: { council: string };
  reference: string;
}) => {
  const router = useRouter();
  const setLocalStorage = () => {
    localStorage.setItem("council", JSON.stringify(council));
    localStorage.setItem("reference", reference);
    router.push(`/${council}/comment`);
  };

  return (
    <button
      onClick={() => setLocalStorage()}
      role="button"
      className="govuk-button govuk-button--primary"
      data-module="govuk-button"
    >
      Comment on this application
    </button>
  );
};

export default ButtonDetails;
