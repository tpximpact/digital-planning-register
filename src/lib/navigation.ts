/**
 * Takes params and creates a url from it for pagination etc
 * @param params
 * @param url
 * @returns
 */
export const createPathFromParams = (
  params?: {
    council?: string;
    reference?: string;
  },
  url?: string,
): string => {
  //If reference is set, council must also be set.
  if (params?.reference && !params.council) {
    return "";
  }

  let path = "";

  if (params?.council) {
    path += `/${params.council}`;
  }

  if (params?.reference) {
    path += `/${params.reference}`;
  }

  if (url) {
    path += `/${url}`;
  }

  return path;
};
