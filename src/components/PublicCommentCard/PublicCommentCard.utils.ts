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

import type { TopicAndComments } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/PublicComment.ts";
import type { PublicCommentTopic } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/PublicCommentTopic.ts";

/**
 * Goes through each topic and adds its comment text until
 * the total reaches max chars. If the next comment pushes
 * it over the max chars, that comment is cut off to fit exactly, marked
 * `truncated: true`, and nothing else is added.
 */

export function collapseTopicsByCharLimit(topics: TopicAndComments[]): Array<{
  originalIndex: number;
  topic: PublicCommentTopic;
  question: string;
  comment: string;
  truncated: boolean;
}> {
  const maxChars = 500;
  let used = 0;
  const out = [];

  for (let i = 0; i < topics.length; i++) {
    if (used >= maxChars) break;

    const { topic, question, comment: full } = topics[i];
    const available = maxChars - used;

    if (full.length <= available) {
      out.push({
        originalIndex: i,
        topic,
        question,
        comment: full,
        truncated: false,
      });
      used += full.length;
    } else {
      out.push({
        originalIndex: i,
        topic,
        question,
        comment: full.slice(0, available),
        truncated: true,
      });
      break;
    }
  }

  return out;
}
