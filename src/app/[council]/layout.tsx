import { ReactNode } from "react";
import { getAppConfig } from "@/config";
import { ContentNotFound } from "@/components/ContentNotFound";
import { BackLink } from "@/components/govuk/Button";
import { PageTemplate } from "@/components/PageTemplate";

export async function generateMetadata({
  params,
}: {
  params: { council: string };
}) {
  const council = decodeURIComponent(params.council);
  const appConfig = getAppConfig(council);

  return {
    title: {
      template: `%s | ${appConfig.council?.name ?? "Not Found"} Digital Planning Register`,
      default: `${appConfig.council?.name ?? "Not Found"}`,
    },
  };
}

export default function SiteLayout({
  params,
  children,
}: {
  params: { council: string };
  children: ReactNode;
}) {
  const council = decodeURIComponent(params.council);

  /**
   * Because of non-js requirements and a bug in nextjs - this code handles the case where the council is not found or visibility is set to private
   * This applies to all sub pages of the [council] too
   */
  const appConfig = getAppConfig(council);
  if (
    !appConfig.council ||
    ["private"].includes(appConfig.council.visibility)
  ) {
    // cant use this because of bug in nextjs
    // return notFound();
    return (
      <PageTemplate appConfig={appConfig}>
        <BackLink />
        <div className="govuk-main-wrapper">
          <ContentNotFound />
        </div>
      </PageTemplate>
    );
  }

  return <PageTemplate appConfig={appConfig}>{children}</PageTemplate>;
}
