/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import { search } from "./search";
import { applicationSubmission } from "./applicationSubmission";
import { documents } from "./documents";
import { postComment } from "./postComment";
import { show } from "./show";
import { publicComments } from "./publicComments";
import { specialistComments } from "./specialistComments";

import { documentation as searchDocumentation } from "./search.documentation";
import { documentation as applicationSubmissionDocumentation } from "./applicationSubmission.documentation";
import { documentation as documentsDocumentation } from "./documents.documentation";
import { documentation as postCommentDocumentation } from "./postComment.documentation";
import { documentation as showDocumentation } from "./show.documentation";
import { documentation as publicCommentsDocumentation } from "./publicComments.documentation";
import { documentation as specialistCommentsDocumentation } from "./specialistComments.documentation";

import { Documentation } from "@/types";

// only allowing any here because we don't (yet!) export the types for each handler and it would be too big a change rn
// @TODO update each handler to export its types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFunction = (...args: any[]) => Promise<any>;

const handlers: Record<string, HandlerFunction> = {
  search,
  applicationSubmission,
  documents,
  postComment,
  show,
  publicComments,
  specialistComments,
};

const documentations: Record<string, Documentation> = {
  search: searchDocumentation,
  applicationSubmission: applicationSubmissionDocumentation,
  documents: documentsDocumentation,
  postComment: postCommentDocumentation,
  show: showDocumentation,
  publicComments: publicCommentsDocumentation,
  specialistComments: specialistCommentsDocumentation,
};

export const LocalV1 = handlers;

export const LocalV1Documentation = documentations;
