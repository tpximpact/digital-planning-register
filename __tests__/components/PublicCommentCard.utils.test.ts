import { collapseTopicsByCharLimit } from "@/components/PublicCommentCard/PublicCommentCard.utils";
import type { TopicAndComments } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/PublicComment.ts";

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
describe("collapseTopicsByCharLimit (500-char limit)", () => {
  it("returns an empty array when given no topics", () => {
    expect(collapseTopicsByCharLimit([])).toEqual([]);
  });

  it("returns all topics unmodified when total length is under 500 chars", () => {
    const topics: TopicAndComments[] = [
      { topic: "noise", question: "", comment: "short1" },
      { topic: "traffic", question: "", comment: "short2" },
    ];
    const result = collapseTopicsByCharLimit(topics);
    expect(result).toHaveLength(2);
    expect(result[0].comment).toBe("short1");
    expect(result[0].truncated).toBe(false);
    expect(result[1].comment).toBe("short2");
    expect(result[1].truncated).toBe(false);
  });

  it("truncates a single-topic comment that exceeds 500 chars", () => {
    const topics: TopicAndComments[] = [
      { topic: "other", question: "", comment: "X".repeat(600) },
    ];
    const result = collapseTopicsByCharLimit(topics);
    expect(result).toHaveLength(1);
    expect(result[0].comment).toBe("X".repeat(500));
    expect(result[0].truncated).toBe(true);
  });

  it("accumulates across multiple topics and truncates only the last one to fit 500 chars", () => {
    const t1: TopicAndComments = {
      topic: "light",
      question: "",
      comment: "A".repeat(300),
    };
    const t2: TopicAndComments = {
      topic: "access",
      question: "",
      comment: "B".repeat(300),
    };
    const t3: TopicAndComments = {
      topic: "privacy",
      question: "",
      comment: "C".repeat(50),
    };

    const result = collapseTopicsByCharLimit([t1, t2, t3]);

    // First topic fits entirely (300 chars)
    expect(result[0].comment).toBe("A".repeat(300));
    expect(result[0].truncated).toBe(false);

    // Second topic truncated to remaining 200 chars
    expect(result[1].comment).toBe("B".repeat(200));
    expect(result[1].truncated).toBe(true);

    // Only two segments returned
    expect(result).toHaveLength(2);
  });
});
