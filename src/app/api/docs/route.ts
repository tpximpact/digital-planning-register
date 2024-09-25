import {
  getApplicationSubmission,
  getPublicApplicationDetails,
  getPublicApplicationDocuments,
  getPublicApplications,
} from "@/actions";
import { getDSNApplication } from "@/actions/public-application-dsn";
import { apiV1, apiP01 } from "@/api";
import { SearchParams } from "@/api/types";
import { NextResponse, NextRequest } from "next/server";

/**
 * @swagger
 * /api/docs:
 *   get:
 *     description: Shows the data returned from the server actions for development only!!
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET(request: NextRequest, params: Record<string, any>) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 403 },
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const serverAction = searchParams.get("serverAction");
  const source = searchParams.get("source") ?? "bops";
  const council = searchParams.get("council") ?? "camden";
  const reference = searchParams.get("reference") ?? "24-00136-HAPP";
  const qId = searchParams.get("id");

  let id;
  if (qId) {
    id = parseInt(qId);
  }

  // search params

  const query = searchParams.get("query") ?? undefined;
  const type =
    searchParams.get("type") && searchParams.get("type") === "dsn"
      ? "dsn"
      : undefined;
  const page = searchParams.get("page") ?? "1";
  const resultsPerPage = searchParams.get("resultsPerPage") ?? "10";

  console.log(searchParams);

  const search: SearchParams = {
    query,
    type,
    page: parseInt(page),
    resultsPerPage: parseInt(resultsPerPage),
  };

  let response;
  switch (serverAction) {
    case "getPublicApplications":
      response = await getPublicApplications(1, 10, council);
      break;
    case "getPublicApplicationDetails":
      response = await getPublicApplicationDetails(council, reference);
      break;
    case "getPublicApplicationDocuments":
      response = await getPublicApplicationDocuments(council, reference);
      break;
    case "getDSNApplication":
      response = await getDSNApplication(1, 10, council);
      break;
    case "getApplicationSubmission":
      response = await getApplicationSubmission(council, reference);
      break;
    case "show":
      response = await apiV1.show(source, council, reference);
      break;
    case "search":
      response = await apiV1.search(source, council, search);
      break;
    case "documents":
      response = await apiV1.documents(source, council, reference);
      break;
    case "applicationSubmission":
      response = await apiV1.applicationSubmission(source, council, reference);
      break;
    case "submitComment":
      response = await apiP01.submitComment(source, council, id, {});
      break;
    default:
      response = {
        bopsV2: {
          getApplicationSubmission:
            "http://localhost:3000/api/docs?serverAction=getApplicationSubmission",
          getPublicApplicationDetails:
            "http://localhost:3000/api/docs?serverAction=getPublicApplicationDetails",
          getPublicApplicationDocuments:
            "http://localhost:3000/api/docs?serverAction=getPublicApplicationDocuments",
          getDSNApplication:
            "http://localhost:3000/api/docs?serverAction=getDSNApplication",
          getPublicApplications:
            "http://localhost:3000/api/docs?serverAction=getPublicApplications",
        },
        apiV1: {
          show: "http://localhost:3000/api/docs?serverAction=show",
          search: {
            listing: "http://localhost:3000/api/docs?serverAction=search",
            searchDsn:
              "http://localhost:3000/api/docs?serverAction=search&type=dsn",
          },
          documents: "http://localhost:3000/api/docs?serverAction=documents",
          applicationSubmission:
            "http://localhost:3000/api/docs?serverAction=applicationSubmission",
          submitComment:
            "http://localhost:3000/api/docs?serverAction=submitComment",
        },
      };
  }

  return NextResponse.json(response);
}
