import { PageHelp } from "@/components/PageHelp";
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

  return <PageHelp council={council} />;
};

export default Help;
