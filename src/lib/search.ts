const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

export function normalizeText(text: string): string {
  return text.normalize("NFD").replace(DIACRITICS_REGEX, "").toLowerCase();
}

export function matchesQuery(haystack: string, query: string): boolean {
  return normalizeText(haystack).includes(normalizeText(query));
}
