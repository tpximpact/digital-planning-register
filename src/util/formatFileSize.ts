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
 * Converts a file size in bytes to a human-readable string with appropriate units.
 *
 * @param {number} size - The file size in bytes.
 * @returns {string} - The formatted file size.
 *
 * @example
 * // Returns "0 KB"
 * formatFileSize(0);
 *
 * @example
 * // Returns "1.00 KB"
 * formatFileSize(1024);
 *
 * @example
 * // Returns "1.00 MB"
 * formatFileSize(1048576);
 */
export function formatFileSize(size: number): string {
  if (size === 0) return "0 KB";
  const i = Math.min(Math.floor(Math.log(size) / Math.log(1024)), 4); // Cap at the highest unit
  const units = ["B", "KB", "MB", "GB", "TB"];
  return (size / Math.pow(1024, i)).toFixed(2) + " " + units[i];
}
