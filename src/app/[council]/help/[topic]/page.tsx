/* eslint-disable react/no-unescaped-entities */
import { PageHelpTopic } from "@/components/PageHelpTopic";
import { getHelpPageContent } from "@/lib/helpContent";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    topic: string;
    council: string;
  };
}

export default function HelpTopicPage({ params }: PageProps) {
  const pageContent = getHelpPageContent(params.topic, params.council);

  if (!pageContent) {
    notFound();
  }

  return (
    <PageHelpTopic
      title={pageContent.title}
      description={pageContent.description}
      content={pageContent.content}
    />
  );
}
