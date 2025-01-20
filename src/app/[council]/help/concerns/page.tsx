import { PageHelpConcerns } from "@/components/PageHelpConcerns";

export const metadata = {
  title:
    "Help page - What to do if your concerns can't be addressed by planning - Digital Planning Register",
};

const Concerns = ({ params }: { params: { council: string } }) => {
  return <PageHelpConcerns params={params} />;
};

export default Concerns;
