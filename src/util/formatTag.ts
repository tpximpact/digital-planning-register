/**
 * Formats a tag string by capitalizing each word and handling dot-separated parts.
 * If the tag contains dots, it splits the tag into parts, capitalizes each part,
 * and joins them with spaces. Otherwise, it capitalizes each word in the tag.
 *
 * @param {string} tag - The tag string to be formatted.
 * @returns {string} - The formatted tag string.
 *
 * @example
 * // Returns "Last Part First Part"
 * formatTag("firstPart.lastPart");
 *
 * @example
 * // Returns "First Part"
 * formatTag("firstPart");
 */
export const formatTag = (tag: string) => {
  if (tag.includes(".")) {
    const parts = tag.split(".");
    const lastPart = parts.pop();
    return [lastPart, parts.join(" ")]
      .map((part) =>
        part
          ?.split(/(?=[A-Z])/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      )
      .join(" ");
  } else {
    return tag
      .split(/(?=[A-Z])/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }
};
