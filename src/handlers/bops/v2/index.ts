import * as search from "./search";
import * as applicationSubmission from "./applicationSubmission";
import * as documents from "./documents";
import * as postComment from "./postComment";
import * as show from "./show";

import * as searchDocumentation from "./search.documentation";
import * as applicationSubmissionDocumentation from "./applicationSubmission.documentation";
import * as documentsDocumentation from "./documents.documentation";
import * as postCommentDocumentation from "./postComment.documentation";
import * as showDocumentation from "./show.documentation";

import { Documentation } from "@/types";

// Define BopsV2 with specific types for better type safety
export const BopsV2: Record<string, any> = {
  search: search.search,
  applicationSubmission: applicationSubmission.applicationSubmission,
  documents: documents.documents,
  postComment: postComment.postComment,
  show: show.show,
};

// Define BopsV2Documentation with specific types for better type safety
export const BopsV2Documentation: {
  [key: string]: Documentation;
} = {
  search: searchDocumentation.documentation,
  applicationSubmission: applicationSubmissionDocumentation.documentation,
  documents: documentsDocumentation.documentation,
  postComment: postCommentDocumentation.documentation,
  show: showDocumentation.documentation,
};
