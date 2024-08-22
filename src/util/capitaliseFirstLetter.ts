/**
 * Capitalize the first letter of a string
 * @param string
 * @returns
 */
export const capitalizeFirstLetter = (string: string) => {
  return (
    string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1)
  );
};
