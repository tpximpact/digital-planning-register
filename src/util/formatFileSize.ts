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
