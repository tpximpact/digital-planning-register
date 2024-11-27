import { BackLink } from "@/components/BackButton";
import { ContentNotFound } from "@/components/ContentNotFound";
import { AppConfig } from "@/config/types";

export default function NotFound({
  councilConfig,
}: {
  councilConfig: AppConfig["council"];
}) {
  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <ContentNotFound councilConfig={councilConfig} />
      </div>
    </>
  );
}
