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

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageApplicationComments } from "@/components/PageApplicationComments";
import { createAppConfig } from "@mocks/appConfigFactory";
import {
  generatePagination,
  generateComment,
  generateNResults,
} from "@mocks/dprApplicationFactory";
import { generateApplicationSubmission } from "@mocks/odpApplicationSubmission";
import { DprComment } from "@/types";

// jest.mock("next/navigation", () => ({
//   useRouter: () => ({
//     push: jest.fn(),
//     replace: jest.fn(),
//     refresh: jest.fn(),
//   }),
//   useSearchParams: () => {
//     const params = new URLSearchParams();
//     return {
//       get: (key: string) => params.get(key),
//       set: (key: string, value: string) => params.set(key, value),
//       toString: () => params.toString(),
//     };
//   },
// }));

describe("PageApplicationComments", () => {
  it("renders comments when API returns data", async () => {
    const appConfig = createAppConfig("public-council-1");
    const comments = generateNResults<DprComment>(10, () => generateComment());
    const pagination = generatePagination(1, 10);
    const application = generateApplicationSubmission;

    render(
      <PageApplicationComments
        reference="123"
        comments={comments}
        application={application}
        appConfig={appConfig}
        params={{ council: "public-council-1", reference: "123" }}
        type="public"
        pagination={pagination}
        searchParams={{ page: 1, resultsPerPage: 10 }}
      />,
    );
    const comment = screen.getByText(`Comment #${comments[0].id.toString()}`);
    expect(comment).toBeInTheDocument();
  });
});
