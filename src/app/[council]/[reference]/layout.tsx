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
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const councilName = appConfig.council?.name;

  return {
    title: `Application ${reference} | ${councilName} Digital Planning Register`,
    description: `${councilName} planning application ${reference}`,
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
