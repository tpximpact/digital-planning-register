import { BackLink } from "@/components/BackLink/BackLink";
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
