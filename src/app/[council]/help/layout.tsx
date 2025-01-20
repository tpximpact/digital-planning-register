import { getAppConfig } from "@/config";
import { ReactNode } from "react";

/**
 * generates default title for every page undeer this
 * @param param
 * @returns
 */
export async function generateMetadata({
  params,
}: {
  params: { council: string };
}) {
  const { council } = params;
  const appConfig = getAppConfig(council);

  return {
    title: `Help`,
    description: `${appConfig.council?.name} help`,
  };
}

export default function HelpLayout({
  params,
  children,
}: {
  params: { council: string };
  children: ReactNode;
}) {
  return <>{children}</>;
}
