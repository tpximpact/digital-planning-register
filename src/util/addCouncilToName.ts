/**
 * Adds the word "Council" to the end of a string if it is not already present.
 * @param name
 * @returns
 */
export const addCouncilToName = (name: string): string => {
  if (name === "" || name === " ") {
    return name;
  }
  const lowerCaseName = name.toLowerCase();
  if (!lowerCaseName.includes("council")) {
    return `${name} Council`;
  }
  return name;
};
