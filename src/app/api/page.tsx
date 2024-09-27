import "swagger-ui-react/swagger-ui.css";

import ReactSwagger from "./react-swagger";
import { notFound } from "next/navigation";
import { getApiDocs } from "@/api/lib";

export default async function IndexPage() {
  if (process.env.NODE_ENV !== "development") {
    return notFound();
  }

  const spec = await getApiDocs();
  return <ReactSwagger spec={spec} />;
}
