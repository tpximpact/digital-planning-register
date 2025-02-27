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
