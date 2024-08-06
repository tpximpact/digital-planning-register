/**
 * @todo searchparams is used in a lot of places we should standardise on the structure and extend where needed
 */
export interface SearchParams {
  search: string;
  page: string;
}

export interface CommentSearchParams extends SearchParams {
  type?: "consultee" | "published";
}
