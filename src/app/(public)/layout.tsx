import { ReactNode } from "react";
import { getAppConfig } from "@/config";
import { PageTemplate } from "@/components/PageTemplate";
import { PageMain } from "@/components/PageMain";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const appConfig = getAppConfig();

  return (
    <PageTemplate appConfig={appConfig}>
      <PageMain>{children}</PageMain>
    </PageTemplate>
  );
}
