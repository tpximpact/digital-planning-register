import { PagePlanningProcess } from "@/components/PagePlanningProcess";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help using the Digital Planning Register",
};

interface PlanningProcessProps {
  params: {
    council: string;
  };
}

const PlanningProcess = ({ params }: PlanningProcessProps) => {
  const { council } = params;

  return <PagePlanningProcess council={council} />;
};

export default PlanningProcess;
