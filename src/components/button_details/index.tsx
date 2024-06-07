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
    router.push(`/${council}/${reference}`);
  };
  return (
    <button
      onClick={() => setLocalStorage()}
      className="govuk-button govuk-button--secondary blue-button"
    >
      View details
    </button>
  );
};

export default ButtonDetails;
