import { PageHelpPlanningProcess } from "@/components/PageHelpPlanningProcess/PageHelpPlanningProcess";

export const metadata = {
  title: "Help using the Digital Planning Register",
};

const PlanningProcess = ({ params }: { params: { council: string } }) => {
  return <PageHelpPlanningProcess params={params} />;
};

export default PlanningProcess;
