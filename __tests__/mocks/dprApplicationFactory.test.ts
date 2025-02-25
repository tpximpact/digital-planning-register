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

import {
  generateReference,
  generateComment,
  generateDocument,
  generatePagination,
  generateNResults,
  generateDprApplication,
  generateBoundaryGeoJson,
} from "@mocks/dprApplicationFactory";
import { faker } from "@faker-js/faker";

// YYYY-MM-DD
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// YYYY-MM-DDTHH:MM:SS.SSSZ
const utcDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

describe("generateReference", () => {
  it("should generate a reference string in the correct format", () => {
    const reference = generateReference();
    const regex = /^\d{2}-\d{5}-[A-Z]{4}$/;
    expect(reference).toMatch(regex);
  });

  it("should generate different reference strings on subsequent calls", () => {
    const reference1 = generateReference();
    const reference2 = generateReference();
    expect(reference1).not.toBe(reference2);
  });

  it("should generate a reference string with the correct parts", () => {
    const reference = generateReference();
    const parts = reference.split("-");
    expect(parts.length).toBe(3);
    expect(parts[0]).toHaveLength(2);
    expect(parts[1]).toHaveLength(5);
    expect(parts[2]).toHaveLength(4);
  });
});

describe("generateComment", () => {
  it("should generate a comment object with the correct structure", () => {
    const comment = generateComment();
    expect(comment).toHaveProperty("comment");
    expect(comment).toHaveProperty("receivedDate");
    expect(comment.receivedDate).toMatch(utcDateRegex);
    expect(comment).toHaveProperty("sentiment");
  });

  it("should generate a comment with a valid sentiment", () => {
    const comment = generateComment();
    const validSentiments = ["supportive", "neutral", "objection"];
    expect(validSentiments).toContain(comment.sentiment);
  });

  it("should generate different comments on subsequent calls", () => {
    const comment1 = generateComment();
    const comment2 = generateComment();
    expect(comment1).not.toEqual(comment2);
  });
});

describe("generateDocument", () => {
  it("should generate a document object with the correct structure", () => {
    const document = generateDocument();
    expect(document).toHaveProperty("title");
    expect(document).toHaveProperty("url");
    expect(document).toHaveProperty("createdDate");
    expect(document.createdDate).toMatch(utcDateRegex);
  });

  it("should generate different documents on subsequent calls", () => {
    const document1 = generateDocument();
    const document2 = generateDocument();
    expect(document1).not.toEqual(document2);
  });
});

describe("generatePagination", () => {
  it("should generate pagination data with the correct structure", () => {
    const pagination = generatePagination();
    // expect(pagination).toHaveProperty("currentPage");
    // expect(pagination).toHaveProperty("totalPages");
    // expect(pagination).toHaveProperty("itemsPerPage");
    // expect(pagination).toHaveProperty("totalItems");
    expect(pagination).toHaveProperty("page");
    expect(pagination).toHaveProperty("results");
    expect(pagination).toHaveProperty("from");
    expect(pagination).toHaveProperty("to");
    expect(pagination).toHaveProperty("total_pages");
    expect(pagination).toHaveProperty("total_results");
  });

  it("should generate pagination data with the correct values when current page provided", () => {
    const pagination = generatePagination(5);
    // expect(pagination.currentPage).toBe(5);
    expect(pagination.page).toBe(5);
  });

  it("should generate different pagination data on subsequent calls", () => {
    const pagination1 = generatePagination();
    const pagination2 = generatePagination();
    expect(pagination1).not.toEqual(pagination2);
  });
});

describe("generateNResults", () => {
  it("should generate an array of results with the correct length", () => {
    const results = generateNResults(5, () => faker.lorem.word());
    expect(results.length).toBeLessThanOrEqual(5);
  });

  it("should generate different results on subsequent calls", () => {
    const results1 = generateNResults(5, () => faker.lorem.word());
    const results2 = generateNResults(5, () => faker.lorem.word());
    expect(results1).not.toEqual(results2);
  });
});

describe("generateDprApplication", () => {
  it("should generate a DPR application object with the correct structure", () => {
    const application = generateDprApplication();
    expect(application).toHaveProperty("application");
    expect(application.application).toHaveProperty("reference");
    expect(application).toHaveProperty("applicationType");
    expect(application.application).toHaveProperty("status");
    expect(application.application).toHaveProperty("consultation");
  });

  it("should generate different DPR application objects on subsequent calls", () => {
    const application1 = generateDprApplication();
    const application2 = generateDprApplication();
    expect(application1).not.toEqual(application2);
  });

  it("should create the application type we request", () => {
    const application = generateDprApplication({ applicationType: "pp.full" });
    expect(application.applicationType).toEqual("pp.full");
  });

  it("should temporarily disable comments for ldc applications until we get the field from BOPs", () => {
    const application = generateDprApplication({ applicationType: "ldc" });
    expect(application.applicationType).toEqual("ldc");
    expect(application.application.consultation.allowComments).toBe(false);
  });

  it("should generate dates in the formats we expect", () => {
    const application = generateDprApplication({ decision: "granted" });
    expect(application.application.consultation.endDate).toMatch(dateRegex);
    expect(application.application.receivedDate).toMatch(dateRegex);
    expect(application.application.validDate).toMatch(dateRegex);
    expect(application.application.publishedDate).toMatch(dateRegex);
    expect(application.application.determinedAt).toMatch(utcDateRegex);
  });
});

describe("generateBoundaryGeoJson", () => {
  it("should generate a GeoJSON object with the correct structure", () => {
    const geoJson = generateBoundaryGeoJson();
    expect(geoJson).toHaveProperty("type", "Feature");
    expect(geoJson).toHaveProperty("geometry");
    expect(geoJson.geometry).toHaveProperty("coordinates");
  });
});
