/**
 * Converts byte size
 *
 * @param size The file size in bytes.
 * @return The formatted size.
 */
export default function formatFileSize(size: number): string {
  if (size === 0) return "0 KB";
  const i = Math.floor(Math.log(size) / Math.log(1024));
  const units = ["B", "KB", "MB", "GB", "TB"];

  return (size / Math.pow(1024, i)).toFixed(2) + " " + units[i];
}
