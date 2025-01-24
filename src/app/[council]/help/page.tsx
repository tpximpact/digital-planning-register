import { ContentError } from "@/components/ContentError";
import { PageHelp } from "@/components/PageHelp";
import { PageMain } from "@/components/PageMain";
import { getAppConfig } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help using the Digital Planning Register",
};

interface HelpProps {
  params: {
    council: string;
  };
}

const Help = ({ params }: HelpProps) => {
  const { council } = params;
  const appConfig = getAppConfig(council);

  if (appConfig.council === undefined) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  return <PageHelp councilConfig={appConfig?.council} />;
};

export default Help;
