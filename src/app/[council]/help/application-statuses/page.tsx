import { PageHelpApplicationStatuses } from "@/components/PageHelpApplicationStatuses";

export const metadata = {
  title: "Help page - Application Statuses - Digital Planning Register",
};

const ApplicationStatuses = ({ params }: { params: { council: string } }) => {
  return <PageHelpApplicationStatuses params={params} />;
};

export default ApplicationStatuses;
