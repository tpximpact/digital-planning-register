export function capitaliseWord(value: string) {
  const lowercaseValue = value?.toLowerCase();
  const words = lowercaseValue?.split(" ");
  const capitalisedWords = words?.map((word) => {
    const firstLetter = word.charAt(0);
    const remainingLetters = word.slice(1);
    return firstLetter.toUpperCase() + remainingLetters;
  });
  return capitalisedWords?.join(" ");
}
