import { ReactNode } from "react";
import { getAppConfig } from "@/config";
import { PageTemplate } from "@/components/PageTemplate";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const appConfig = getAppConfig();

  return <PageTemplate appConfig={appConfig}>{children}</PageTemplate>;
}
