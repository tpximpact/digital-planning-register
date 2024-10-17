/**
 * Capitalises the first letter of each word in a given string.
 *
 * @param {string} value - The string to be capitalised.
 * @returns {string} - The capitalised string.
 *
 * @example
 * // Returns "Hello World"
 * capitaliseWord("hello world");
 *
 * @example
 * // Returns "Hello"
 * capitaliseWord("hello");
 *
 * @example
 * // Returns ""
 * capitaliseWord("");
 */
export function capitaliseWord(value: string) {
  const lowercaseValue = value?.toLowerCase();
  const words = lowercaseValue?.split(" ");
  const capitalisedWords = words?.map((word) => {
    const firstLetter = word.charAt(0);
    const remainingLetters = word.slice(1);
    return firstLetter.toUpperCase() + remainingLetters;
  });
  return capitalisedWords?.join(" ");
}
