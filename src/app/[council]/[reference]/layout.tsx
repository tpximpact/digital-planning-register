import { getAppConfig } from "@/config";
import { ReactNode } from "react";

/**
 * genertes default title for every page undeer this
 * @param param0
 * @returns
 */
export async function generateMetadata({
  params,
}: {
  params: { council: string; reference: string };
}) {
  const { council, reference } = params;
  const appConfig = getAppConfig(council);

  return {
    title: `Application ${reference}`,
    description: `${appConfig.council?.name} planning application ${reference}`,
  };
}

export default function ReferenceLayout({
  params,
  children,
}: {
  params: { council: string };
  children: ReactNode;
}) {
  return <>{children}</>;
}
