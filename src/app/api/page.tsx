import "swagger-ui-react/swagger-ui.css";

import { getApiDocs } from "@/api/lib";
import ReactSwagger from "./react-swagger";
import { notFound } from "next/navigation";

export default async function IndexPage() {
  if (process.env.NODE_ENV !== "development") {
    return notFound();
  }

  const spec = await getApiDocs();
  return <ReactSwagger spec={spec} />;
}
