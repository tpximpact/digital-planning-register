/**
 * Converts a PascalCase string to a normal sentence case (all lowercase).
 * Example: "PascalCaseString" -> "pascal case string"
 */
export function pascalToSentenceCase(input: string): string {
  return input
    .replace(/\.(?=[a-zA-Z])/g, " ") // replace a . between two letters with a space
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space between lowercase and uppercase letters
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Handle consecutive uppercase letters followed by lowercase
    .toLowerCase(); // Convert the entire string to lowercase
}
