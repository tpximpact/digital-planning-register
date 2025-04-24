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
  it("renders sortBy", async () => {
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
        searchParams={{
          page: 1,
          resultsPerPage: 10,
          orderBy: "asc",
          publishedAtFrom: "2023-01-01",
          publishedAtTo: "2023-12-31",
        }}
      />,
    );

    // Comment is rendered
    expect(
      screen.getByText(`Comment #${comments[0].id.toString()}`),
    ).toBeInTheDocument();

    // Date filter inputs
    expect(screen.getByDisplayValue("2023-01-01")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2023-12-31")).toBeInTheDocument();

    // orderBy (Sort order)
    expect(screen.getByLabelText("Sort by")).toHaveValue("asc");

    // sortBy dropdown (you'll need to ensure this input exists in your form)
    const sortBy = screen.getByRole("combobox", {
      name: /sort by/i,
    });
    expect(sortBy).toHaveValue("asc");
  });

  it("renders comments and shows selected sentiment in filter", async () => {
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
        searchParams={{
          page: 1,
          resultsPerPage: 10,
          sentiment: "neutral",
        }}
      />,
    );

    // Check a comment renders
    expect(
      screen.getByText(`Comment #${comments[0].id.toString()}`),
    ).toBeInTheDocument();

    // Check sentiment filter is set correctly
    const sentimentSelect = screen.getByLabelText("Sentiment");
    expect(sentimentSelect).toHaveValue("neutral");
  });
});
