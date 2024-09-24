export function configValitation(council: string) {
  const councilApiKey = council + "_BOPS_API_KEY";
  const councilApiURL = council + "_BOPS_API_URL";

  const validation =
    process.env[councilApiKey] && process.env[councilApiURL] ? true : false;

  return validation;
}
