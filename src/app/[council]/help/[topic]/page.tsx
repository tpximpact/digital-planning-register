/* eslint-disable react/no-unescaped-entities */
import { ContentError } from "@/components/ContentError";
import { ContentNotFound } from "@/components/ContentNotFound";
import { PageHelpTopic } from "@/components/PageHelpTopic";
import { PageMain } from "@/components/PageMain";
import { getAppConfig } from "@/config";
import { contentHelp } from "@/lib/help";
import { Metadata } from "next";

interface PageProps {
  params: {
    topic: string;
    council: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { council } = params;
  const appConfig = getAppConfig(council);

  if (appConfig.council === undefined) {
    return {
      title: " Sorry, there is a problem with the service",
    };
  }

  const content = contentHelp(appConfig.council);
  const pageContent = content.find((page) => page.key === params.topic);

  return {
    title: pageContent?.title
      ? `${pageContent?.title} | Help using the Digital Planning Register`
      : "Help using the Digital Planning Register",
  };
}
export default function HelpTopicPage({ params }: PageProps) {
  const { council } = params;
  const appConfig = getAppConfig(council);

  if (appConfig.council === undefined) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  const content = contentHelp(appConfig.council);
  const pageContent = content.find((page) => page.key === params.topic);

  if (!pageContent) {
    return (
      <PageMain>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageMain>
    );
  }

  return (
    <PageHelpTopic
      title={pageContent.title}
      summary={pageContent.summary}
      content={pageContent.children}
    />
  );
}
