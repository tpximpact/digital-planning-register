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
