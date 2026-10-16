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

"use server";

// This is the only "use server" file. Every export here is a server action, so
// client components can call them, and everything they import stays on the server.
// A "use server" file can only export async functions, which is why the `ApiV1`
// object lives in ./v1.ts and not here.

import { resolveHandler, type ApiHandler } from "@/handlers";
import { apiReturnError } from "@/handlers/lib";
import type {
  ApiResponse,
  DprCommentSubmission,
  SearchParamsApplication,
  SearchParamsComments,
  SearchParamsDocuments,
  SearchParamsSpecialistComments,
} from "@/types";

type Result<T> = Promise<ApiResponse<T | null>>;

/**
 * Checks the required args, finds the council's handler and runs the call.
 * `args` are only validated, the call itself passes its own arguments.
 */
async function call<T>(
  args: { council: string } & Record<string, unknown>,
  run: (handler: ApiHandler) => Result<T>,
): Promise<ApiResponse<T | null>> {
  const missing = Object.keys(args).filter((key) => !args[key]);
  if (missing.length > 0) {
    return apiReturnError(`Missing required field(s): ${missing.join(", ")}`);
  }

  const handler = resolveHandler(args.council);
  if (!handler) {
    return apiReturnError(`No data source configured for '${args.council}'`);
  }

  return run(handler);
}

export async function search(
  council: string,
  searchParams?: SearchParamsApplication,
) {
  return call({ council }, (api) => api.search(council, searchParams));
}

export async function show(council: string, reference: string) {
  return call({ council, reference }, (api) => api.show(council, reference));
}

export async function applicationSubmission(
  council: string,
  reference: string,
) {
  return call({ council, reference }, (api) =>
    api.applicationSubmission(council, reference),
  );
}

export async function documents(
  council: string,
  reference: string,
  searchParams?: SearchParamsDocuments,
) {
  return call({ council, reference }, (api) =>
    api.documents(council, reference, searchParams),
  );
}

export async function publicComments(
  council: string,
  reference: string,
  searchParams?: SearchParamsComments,
) {
  return call({ council, reference }, (api) =>
    api.publicComments(council, reference, searchParams),
  );
}

export async function specialistComments(
  council: string,
  reference: string,
  searchParams?: SearchParamsComments,
) {
  return call({ council, reference }, (api) =>
    api.specialistComments(council, reference, searchParams),
  );
}

export async function specialist(
  council: string,
  reference: string,
  specialistId: string | number,
  searchParams?: SearchParamsSpecialistComments,
) {
  const id = String(specialistId ?? "");
  return call({ council, reference, specialistId: id }, (api) =>
    api.specialist(council, reference, id, searchParams),
  );
}

export async function postComment(
  council: string,
  reference: string,
  apiData: DprCommentSubmission,
) {
  return call({ council, reference, apiData }, (api) =>
    api.postComment(council, reference, apiData),
  );
}
