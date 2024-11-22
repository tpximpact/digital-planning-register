import { search } from "./search";
import { applicationSubmission } from "./applicationSubmission";
import { documents } from "./documents";
import { postComment } from "./postComment";
import { show } from "./show";

import { documentation as searchDocumentation } from "./search.documentation";
import { documentation as applicationSubmissionDocumentation } from "./applicationSubmission.documentation";
import { documentation as documentsDocumentation } from "./documents.documentation";
import { documentation as postCommentDocumentation } from "./postComment.documentation";
import { documentation as showDocumentation } from "./show.documentation";

import { Documentation } from "@/types";
type HandlerFunction = (...args: any[]) => Promise<any>;

const handlers: Record<string, HandlerFunction> = {
  search,
  applicationSubmission,
  documents,
  postComment,
  show,
};

const documentations: Record<string, Documentation> = {
  search: searchDocumentation,
  applicationSubmission: applicationSubmissionDocumentation,
  documents: documentsDocumentation,
  postComment: postCommentDocumentation,
  show: showDocumentation,
};

export const BopsV2 = handlers;

export const BopsV2Documentation = documentations;
