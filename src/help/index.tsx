export function firstLetterUppercase(value: string) {
  const firstLetter = value.charAt(0);
  const remainingLetters = value.slice(1);

  return firstLetter.toUpperCase() + remainingLetters;
}
