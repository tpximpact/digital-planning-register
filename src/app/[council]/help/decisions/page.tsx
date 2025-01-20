import { PageHelpDecisions } from "@/components/PageHelpDecisions";

export const metadata = {
  title: "Help page - Decisions - Digital Planning Register",
};

const Decisions = ({ params }: { params: { council: string } }) => {
  return <PageHelpDecisions params={params} />;
};

export default Decisions;
