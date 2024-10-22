/**
 * Regular expression for validating UK phone numbers.
 */
export const phoneRegex =
  /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;

/**
 * Regular expression for validating UK postcodes.
 */
export const postCodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;

/**
 * Validates a UK postcode.
 *
 * @param {string} postcode - The postcode to be validated.
 * @returns {boolean} - True if the postcode is valid, false otherwise.
 *
 * @example
 * // Returns true
 * postcodeValidation("SW1A 1AA");
 *
 * @example
 * // Returns false
 * postcodeValidation("INVALID");
 */
export const postcodeValidation = (postcode: string) => {
  return postcode !== "" && postCodeRegex.test(postcode);
};

/**
 * Validates a UK phone number.
 *
 * @param {string} phoneForm - The phone number to be validated.
 * @returns {boolean} - True if the phone number is valid, false otherwise.
 *
 * @example
 * // Returns true
 * phoneValidation("+44 1234 567890");
 *
 * @example
 * // Returns false
 * phoneValidation("INVALID");
 */
export const phoneValidation = (phoneForm: string) => {
  if (!phoneForm) return true;
  return (
    (phoneForm !== "" && phoneRegex.test(phoneForm)) ||
    phoneForm == undefined ||
    phoneForm == ""
  );
};

/**
 * Validates a UK phone number.
 *
 * @param {string} phoneForm - The phone number to be validated.
 * @returns {boolean} - True if the phone number is valid, false otherwise.
 *
 * @example
 * // Returns true
 * phoneValidation("+44 1234 567890");
 *
 * @example
 * // Returns false
 * phoneValidation("INVALID");
 */
export const emailValidation = (emailForm: string) => {
  return (
    (emailForm !== "" && emailForm?.includes("@")) ||
    emailForm == undefined ||
    emailForm == ""
  );
};
