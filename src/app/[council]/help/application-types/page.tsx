import { PageHelpApplicationTypes } from "@/components/PageHelpApplicationTypes";

export const metadata = {
  title: "Help page - Application Types - Digital Planning Register",
};

const ApplicationTypes = ({ params }: { params: { council: string } }) => {
  return <PageHelpApplicationTypes params={params} />;
};

export default ApplicationTypes;
