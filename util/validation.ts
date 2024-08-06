export const phoneRegex =
  /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
export const postCodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;

export const postcodeValidation = (postcode: string) => {
  return postcode !== "" && postCodeRegex.test(postcode);
};

export const phoneValidation = (phoneForm: string) => {
  return (
    (phoneForm !== "" && phoneRegex.test(phoneForm)) ||
    phoneForm == undefined ||
    phoneForm == ""
  );
};

export const emailValidation = (emailForm: string) => {
  return (
    (emailForm !== "" && emailForm?.includes("@")) ||
    emailForm == undefined ||
    emailForm == ""
  );
};
