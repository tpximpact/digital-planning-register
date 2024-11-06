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

// Define LocalV1 with specific types for better type safety
export const LocalV1: Record<string, any> = {
  search: search.search,
  applicationSubmission: applicationSubmission.applicationSubmission,
  documents: documents.documents,
  postComment: postComment.postComment,
  show: show.show,
};

// Define LocalV1Documentation with specific types for better type safety
export const LocalV1Documentation: {
  [key: string]: Documentation;
} = {
  search: searchDocumentation.documentation,
  applicationSubmission: applicationSubmissionDocumentation.documentation,
  documents: documentsDocumentation.documentation,
  postComment: postCommentDocumentation.documentation,
  show: showDocumentation.documentation,
};
