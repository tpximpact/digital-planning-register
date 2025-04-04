export function splitCommentText(commentText: string): string[] {
  const maxChars = 500;

  const sentences = commentText.match(/[^.!?]+[.!?]+/g) || [commentText];
  let currentText = "";
  const result = [];

  for (const sentence of sentences) {
    const chars = currentText.length + sentence.length;

    if (chars > maxChars) {
      result.push(currentText.trim());
      currentText = sentence;
    } else {
      currentText += sentence;
    }
  }

  if (currentText) {
    result.push(currentText.trim());
  }

  return result;
}
