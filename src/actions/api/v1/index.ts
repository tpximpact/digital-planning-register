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

export const ApiV1 = handlers;

export const ApiV1Documentation = documentations;
