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

/**
 * Splits a string into a summary and continued text based on a maximum character limit.
 * Ensures that no words are split and always splits at the end of the previous word.
 *
 * @param {string} text - The text to be split.
 * @param {number} maxChars - The maximum number of characters allowed in the summary.
 * @returns {{ summary: string; continued: string }} An object containing the summary and continued text.
 */
export function splitStringOnOrBeforeMaxChars(
  text: string,
  maxChars: number,
): { summary: string; continued: string } {
  if (text.length <= maxChars) {
    return { summary: text, continued: "" };
  }

  const words = text.split(" ");
  let summary = "";
  let continued = "";
  let currentLength = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (currentLength + word.length + (summary ? 1 : 0) > maxChars) {
      continued = words.slice(i).join(" ");
      break;
    }
    summary += (summary ? " " : "") + word;
    currentLength += word.length + (summary ? 1 : 0);
  }

  return { summary, continued };
}
