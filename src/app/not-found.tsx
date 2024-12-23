import { ContentNotFound } from "@/components/ContentNotFound";
import { PageMain } from "@/components/PageMain";
import { PageTemplate } from "@/components/PageTemplate";
import { getAppConfig } from "@/config";
import { AppConfig } from "@/config/types";

export default function NotFound({
  councilConfig,
}: {
  councilConfig: AppConfig["council"];
}) {
  const appConfig = getAppConfig();
  return (
    <PageTemplate appConfig={appConfig}>
      <PageMain>
        <ContentNotFound councilConfig={councilConfig} />
      </PageMain>
    </PageTemplate>
  );
}
