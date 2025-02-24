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
